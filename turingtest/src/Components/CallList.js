import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import getAuthToken from "../Helper";
require("dotenv").config();
const { REACT_APP_API_URL } = process.env;
function CallList() {
	const [calldata, setCalldata] = useState();
	const [currentCall, setcurrentCall] = useState();
	const [archivedCalls, setArchivedCalls] = useState();
	const [unArchiveCalls, setUnArchiveCalls] = useState();
	const [count, setCount] = useState(0);
	const [offset, setOffset] = useState(0);
	const [isloading, setloading] = useState(true);
	const [inputnotes, setNotes] = useState("");
	const [options, setOption] = useState("Status");
	const modalRef = useRef(null);
	const modalNode = modalRef.current;

	useEffect(() => {
		paginatedCalls();
	}, [offset]);

	async function paginatedCalls() {
		// let auth = await getAuthToken();
		const auth = localStorage.getItem("auth-token");
		axios
			.get(`${REACT_APP_API_URL}/calls?offset=${offset}&limit=10`, {
				headers: {
					Authorization: `Bearer ${auth}`,
				},
			})
			.then(function (response) {
				// handle success
				console.log(response);
				setCalldata(response.data.nodes);
				setCount(response.data.totalCount);
				console.log();
			})
			.catch(function (error) {
				// handle error
				console.log(error.message);
			});
	}
	function formatTime(inputSeconds) {
		const Days = Math.floor(inputSeconds / (60 * 60 * 24));
		const Hour = Math.floor((inputSeconds % (60 * 60 * 24)) / (60 * 60));
		const Minutes = Math.floor(
			((inputSeconds % (60 * 60 * 24)) % (60 * 60)) / 60
		);
		const Seconds = Math.floor(
			((inputSeconds % (60 * 60 * 24)) % (60 * 60)) % 60
		);
		let ddhhmmss = "";
		if (Days > 0) {
			ddhhmmss += Days + " Day ";
		}
		if (Hour > 0) {
			ddhhmmss += Hour + " Hour ";
		}

		if (Minutes > 0) {
			ddhhmmss += Minutes + " Minutes ";
		}

		if (Seconds > 0) {
			ddhhmmss += Seconds + " Seconds ";
		}
		return ddhhmmss;
	}
	function formatDate(date) {
		let myDate = new Date(date).toLocaleDateString("en-US");
		return myDate;
	}
	function ArchiveCall(id) {
		const auth = localStorage.getItem("auth-token");
		axios
			.put(
				`${REACT_APP_API_URL}/calls/${id}/archive`,
				{},
				{
					headers: {
						Authorization: `Bearer ${auth}`,
					},
				}
			)
			.then(function (response) {
				// handle success
				console.log(response);
			})
			.catch(function (error) {
				// handle error
				console.log(error.message);
			});
	}
	function AddNotes(id) {
		const auth = localStorage.getItem("auth-token");
		axios
			.post(
				`${REACT_APP_API_URL}/calls/${id}/note`,
				{
					content: inputnotes,
				},
				{
					headers: {
						Authorization: `Bearer ${auth}`,
					},
				}
			)
			.then(function (response) {
				// handle success
				console.log(response);
				alert("notes added");
				paginatedCalls();
				closeModal();
			})
			.catch(function (error) {
				// handle error
				console.log(error.message);
			});
	}
	function openModal(id) {
		modalNode.classList.add("show");
		modalNode.style.display = "block";
		let cc = calldata.find((cc) => (calldata.id = id));
		setcurrentCall(cc);
	}
	function closeModal() {
		// modalNode.close();
		modalNode.style.display = "none";
	}
	useEffect(() => {
		filterBy();
	}, [options, offset]);

	function filterBy(id) {
		console.log("clicked");
		if (options == 1) {
			paginatedCalls();
		} else if (options == 2) {
			let filterBA = calldata.filter((data) => data.is_archived);
			console.log(filterBA);
			setArchivedCalls(filterBA);
		} else if (options == 3) {
			let filterUA = calldata.filter((data) => !data.is_archived);
			console.log(filterUA);
			setUnArchiveCalls(filterUA);
		}
	}
	return (
		<div className="container py-5">
			<h1 className="text-start">Turing Technologies Frontend Test</h1>
			<div className="container">
				<div className="d-flex align-items-center">
					<div>Filter By</div>{" "}
					<select
						className="py-2 rounded border-0 text-primary ms-3 px-5"
						aria-label="Default select example"
						id="options"
						value={options}
						onChange={(e) => setOption(e.target.value)}
					>
						<option className="text-primary" selected>
							{" "}
							Status
						</option>
						<option value="1">All</option>
						<option value="2">Archive</option>
						<option value="3">Unarchive</option>
					</select>
				</div>
			</div>
			<div className="container mt-3 ">
				<div className="table-responsive rounded">
					<table className="table table-responsive border rounded-2">
						<thead>
							<tr className="bg-light fs-6 fw-lighter text-center ">
								<th>CALL TYPE</th>
								<th>Direction</th>
								<th>Duration</th>
								<th>From</th>
								<th>TO</th>
								<th>VIA</th>
								<th>CREATED AT</th>
								<th>STATUS</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{options == "Status" ? (
								<>
									{calldata?.map((data, index) => (
										<tr key={index}>
											<td
												className={`
											${
												data.call_type == "answered"
													? "text-success"
													: data.call_type == "missed"
													? "text-danger"
													: "text-primary"
											}
                                            text-capitalize
										`}
											>
												{data.call_type}
											</td>
											<td className="text-primary text-capitalize">
												{data.direction}
											</td>
											<td className="fs-6">
												{formatTime(data.duration)}
												<br />
												<span className="text-primary">
													({data.duration} seconds )
												</span>
											</td>
											<td>{data.from}</td>
											<td>{data.to}</td>
											<td>{data.via}</td>
											<td>{formatDate(data.created_at)}</td>
											<td>
												{data.is_archived ? (
													<>
														<button
															type="button"
															className="btn btn-light w-full text-success rounded btn-archive"
															onClick={() => {
																ArchiveCall(data.id);
															}}
														>
															Archived
														</button>
													</>
												) : (
													<button
														type="button"
														className="btn w-full btn-light text-secondary"
													>
														Unarchive
													</button>
												)}
											</td>
											<td>
												<a
													className="btn btn-primary rounded-1 "
													onClick={() => openModal(data.id)}
												>
													Add Note
												</a>
											</td>
										</tr>
									))}
								</>
							) : null}
							{options == 1 ? (
								<>
									{calldata?.map((data, index) => (
										<tr key={index}>
											<td
												className={`
											${
												data.call_type == "answered"
													? "text-success"
													: data.call_type == "missed"
													? "text-danger"
													: "text-primary"
											}
                                            text-capitalize
										`}
											>
												{data.call_type}
											</td>
											<td className="text-primary text-capitalize">
												{data.direction}
											</td>
											<td className="fs-6">
												{formatTime(data.duration)}
												<br />
												<span className="text-primary">
													({data.duration} seconds )
												</span>
											</td>
											<td>{data.from}</td>
											<td>{data.to}</td>
											<td>{data.via}</td>
											<td>{formatDate(data.created_at)}</td>
											<td>
												{data.is_archived ? (
													<>
														<button
															type="button"
															className="btn btn-light w-full text-success rounded btn-archive"
															onClick={() => {
																ArchiveCall(data.id);
															}}
														>
															Archived
														</button>
													</>
												) : (
													<button
														type="button"
														className="btn w-full btn-light text-secondary"
													>
														Unarchive
													</button>
												)}
											</td>
											<td>
												<a
													className="btn btn-primary rounded-1 "
													onClick={() => openModal(data.id)}
												>
													Add Note
												</a>
											</td>
										</tr>
									))}
								</>
							) : null}
							{options == 2 ? (
								<>
									{archivedCalls?.map((data, index) => (
										<tr key={index}>
											<td
												className={`
											${
												data.call_type == "answered"
													? "text-success"
													: data.call_type == "missed"
													? "text-danger"
													: "text-primary"
											}
                                            text-capitalize
										`}
											>
												{data.call_type}
											</td>
											<td className="text-primary text-capitalize">
												{data.direction}
											</td>
											<td className="fs-6">
												{formatTime(data.duration)}
												<br />
												<span className="text-primary">
													({data.duration} seconds )
												</span>
											</td>
											<td>{data.from}</td>
											<td>{data.to}</td>
											<td>{data.via}</td>
											<td>{formatDate(data.created_at)}</td>
											<td>
												{data.is_archived ? (
													<>
														<button
															type="button"
															className="btn btn-light w-full text-success rounded btn-archive"
															onClick={() => {
																ArchiveCall(data.id);
															}}
														>
															Archived
														</button>
													</>
												) : (
													<button
														type="button"
														className="btn w-full btn-light text-secondary"
													>
														Unarchive
													</button>
												)}
											</td>
											<td>
												<a
													className="btn btn-primary rounded-1 "
													onClick={() => openModal(data.id)}
												>
													Add Note
												</a>
											</td>
										</tr>
									))}
								</>
							) : null}
							{options == 3 ? (
								<>
									{unArchiveCalls?.map((data, index) => (
										<tr key={index}>
											<td
												className={`
											${
												data.call_type == "answered"
													? "text-success"
													: data.call_type == "missed"
													? "text-danger"
													: "text-primary"
											}
                                            text-capitalize
										`}
											>
												{data.call_type}
											</td>
											<td className="text-primary text-capitalize">
												{data.direction}
											</td>
											<td className="fs-6">
												{formatTime(data.duration)}
												<br />
												<span className="text-primary">
													({data.duration} seconds )
												</span>
											</td>
											<td>{data.from}</td>
											<td>{data.to}</td>
											<td>{data.via}</td>
											<td>{formatDate(data.created_at)}</td>
											<td>
												{data.is_archived ? (
													<>
														<button
															type="button"
															className="btn btn-light w-full text-success rounded btn-archive"
															onClick={() => {
																ArchiveCall(data.id);
															}}
														>
															Archived
														</button>
													</>
												) : (
													<button
														type="button"
														className="btn w-full btn-light text-secondary"
													>
														Unarchive
													</button>
												)}
											</td>
											<td>
												<a
													className="btn btn-primary rounded-1 "
													onClick={() => openModal(data.id)}
												>
													Add Note
												</a>
											</td>
										</tr>
									))}
								</>
							) : null}
						</tbody>
					</table>
				</div>
			</div>
			<div className="page-content page-container" id="page-content">
				<div className="padding">
					<div className="row container d-flex justify-content-center mt-5">
						<div className="col-md-6 col-sm-6">
							<nav>
								<ul className="pagination d-flex justify-content-between flex-wrap pagination-flat pagination-success">
									<li
										className="page-item"
										onClick={() => {
											if (offset > 0) {
												setOffset(offset - 1);
											}
										}}
									>
										<a className="page-link">
											<i className="fa fa-angle-left"></i>
										</a>
									</li>
									{count &&
										new Array(Math.round(count / 10))
											.fill("")
											.map((_, index) => (
												<li
													key={index}
													className={`page-item ${
														offset == index ? "active" : ""
													} `}
													onClick={() => setOffset(index)}
												>
													<a
														className={`page-link ${
															offset == index ? "bg-primary" : ""
														} rounded`}
													>
														{index + 1}
													</a>
												</li>
											))}

									<li
										className="page-item cursor-pointer	"
										onClick={() => {
											if (offset < 20) {
												setOffset(offset + 1);
											}
										}}
									>
										<a className="page-link rounded">
											<i className="fa fa-angle-right"></i>
										</a>
									</li>
								</ul>
								<p className="text-center">
									{offset * 10 + 1} - {offset * 10 + 10} of {count} results
								</p>
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div
				ref={modalRef}
				className="modal fade"
				id="exampleModalCenter"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalCenterTitle"
				aria-hidden="false"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">
								Add Notes
							</h5>
							<button
								type="button"
								className="close btn"
								data-dismiss="modal"
								aria-label="Close"
								onClick={() => {
									closeModal();
								}}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						{currentCall ? (
							<>
								<div className="container py-2">
									<h5 className="text-primary">Call Id {currentCall?.id}</h5>
								</div>
								<table className="table borderless">
									<tbody>
										<tr>
											<td>Call Type</td>
											<td>
												<div
													className={`
											${
												currentCall.call_type == "answered"
													? "text-success"
													: currentCall.call_type == "missed"
													? "text-danger"
													: "text-primary"
											}
                                            text-capitalize
										`}
												>
													{currentCall.call_type}
												</div>
											</td>
										</tr>
										<tr>
											<td>Duration</td>
											<td>
												<div>{formatTime(currentCall.duration)}</div>
											</td>
										</tr>
										<tr>
											<td>From</td>
											<td>
												<div>{currentCall.from}</div>
											</td>
										</tr>
										<tr>
											<td>To</td>
											<td>
												<div>{currentCall.to}</div>
											</td>
										</tr>
										<tr>
											<td>Via</td>
											<td>
												<div>{currentCall.via}</div>
											</td>
										</tr>
									</tbody>
								</table>
								<div className="container">
									<p className="px-1">Notes</p>
									<div className="d-flex">
										<textarea
											className="form-control w-100 my-2"
											placeholder="Add Notes"
											rows="7"
											cols="50"
											onChange={(e) => {
												setNotes(e.target.value);
											}}
										></textarea>
									</div>
									<button
										type="button"
										className="btn btn-primary w-100 rounded-1 my-2"
										onClick={() => {
											AddNotes(currentCall.id);
										}}
									>
										Save
									</button>
									<br />
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CallList;
