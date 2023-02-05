import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Button } from "@mui/material";


const Home = () => {

    const [accesskey, setaccesskey] = useState()
    const [refreshkey, setrefreshkey] = useState()
    const [modal, setmodal] = useState(false)
    const [modaltext, setmodaltext] = useState("")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const apidata = useRef([""])




    // useEffect(() => {
    //   const fetchPosts = async () => {
    //     setLoading(true);
    //     const res = await axios.get('https://frontend-test-api.aircall.io');
    //     setPosts(res);
    //     setLoading(false);

    //     console.log(posts);
    //   };

    //   fetchPosts();
    // }, []);


    const config = {
        headers: {
            'Authorization': 'Bearer ' + accesskey
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { username: "John", password: "johndoe" };

        try {
            const response = await axios.post("https://frontend-test-api.aircall.io/auth/login", data);
            setaccesskey(response.data.access_token)
            setrefreshkey(response.data.refresh_token)

        } catch (error) {
            console.error(error);
        }
    };

    const getdata = async (event) => {
        event.preventDefault();



        try {

            await axios.get("https://frontend-test-api.aircall.io/calls?offset=10&limit=76", config)
                .then(response => {
                    console.log(response.data);
                    setPosts(response.data)
                    apidata.current = response.data.nodes
                    console.log(apidata.current);
                })
                .catch(error => {
                    // handle the error
                });


        } catch (error) {
            console.log(error);
        }

    }

    const handlemodal = (modaldata) => {

        setmodal(true)
        setmodaltext(modaldata)

    }





    return (
        
        <div className="container my-5">
            <div className="row">
                <div className="col-md-12">

                    <input type="button" value="Authenticate" onClick={handleSubmit} />
                    <input type="button" value="Get Data" onClick={getdata} />

                    <div className='container' style={{  width: '100%' }}>
                        <h4 className='py-4'>Turing Technology Frontend test</h4>


                    </div>



                    {modal && (
                        <div className="modal">
                            <div className="modalbox">

                                <button className="ml-auto" onClick={setmodal(false)} >x</button>
                                <p>
                                    {modaltext.map((text) => {
                                        return (
                                            <p>{text.content}</p>
                                        )

                                    })}
                                </p>

                            </div>
                        </div>
                    )

                    }





                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Call Type</th>
                                <th scope="col">Direction</th>
                                <th scope="col">Duration</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Via</th>
                                <th scope="col">Created at</th>
                                <th scope="col">Status</th>
                                <th scope="col">Add Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        apidata.current.map((data) => {
                            // console.log(data.notes)
                            return (
                                <tr >
                                    {/* {data.id} */}

                                    <td>{data.call_type}</td>
                                    <td>{data.direction}</td>
                                    <td>{data.duration}</td>
                                    <td>{data.from}</td>-
                                    <td>{data.to}</td>
                                    <td>{data.via}</td>
                                    <td>{data.created_at}</td>
                                    <td>{data.is_archived ? <a>archive</a> : <a>not archive</a>}</td>
                                    <td><Button>Add Notes</Button></td>


                                </tr>
                            )
                        })
                    }
                        </tbody>
                    </table>

                



                </div>
            </div>
        </div>
    );
};

export default Home;