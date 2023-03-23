import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { capitalize } from "utils/capitalize";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { addNotes } from "modules/phone-management/_redux/callActions";
import { Fragment } from "react";
import { Formik } from "formik";
import { Button } from "components/Button/Button";

export function Modal({ isOpen, setIsOpen, modalTitle }) {
  const { selectedNode, actionLoading } = useSelector(
    (state) => state?.callInfoManagement,
    shallowEqual
  );
  const dispatch = useDispatch();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[33%] transform rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    <p className="text-black sm:text-22px text-lg font-semibold">
                      {modalTitle}
                    </p>
                  </Dialog.Title>

                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-lg font-medium">Add Notes</h1>
                        <p className="text-purple-600">
                          Call Id: {selectedNode?.id}
                        </p>
                      </div>
                      <XMarkIcon
                        className="h-6 w-6 cursor-pointer text-black"
                        onClick={() => setIsOpen(false)}
                      />
                    </div>
                    <hr className="my-3" />
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-medium">Call Type</span>
                        <span className="text-blue-500">
                          {capitalize(selectedNode?.call_type)}
                        </span>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-medium">Duration</span>
                        <span>{selectedNode?.duration}</span>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-medium">From</span>
                        <span className="ml-7">{selectedNode?.from}</span>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-medium">To</span>
                        <span className="ml-12">{selectedNode?.to}</span>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="font-medium">Via</span>
                        <span className="ml-10">{selectedNode?.via}</span>
                      </div>
                    </div>
                    <div>
                      <Formik
                        initialValues={{ note: "" }}
                        validate={(values) => {
                          const errors = {};
                          if (!values.note) {
                            errors.note = "Required!";
                          }

                          return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          const payload = {
                            id: selectedNode?.id,
                            content: values?.note,
                          };
                          dispatch(
                            addNotes(
                              payload,
                              (res) => {
                                setIsOpen(false);
                                console.log(res);
                              },
                              (error) => {
                                console.log(error);
                              }
                            )
                          );
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                        }) => {
                          return (
                            <form onSubmit={handleSubmit}>
                              <label className="block mt-3">Notes</label>
                              <textarea
                                type="textarea"
                                name="note"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.note}
                                placeholder="Add Note"
                                className="p-2 border my-1 transition pl-2 rounded-md w-full md:text-base text-sm font-normal bg-transparent mt-1 block bg-white border-slate-300 placeholder-slate-400
           focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                              />
                              <span className="text-red-500">
                                {errors.note && touched.note && errors.note}
                              </span>
                              <div>
                                <hr className="my-3" />
                                <Button
                                  disabled={actionLoading}
                                  isLoading={actionLoading}
                                  type="submit"
                                  text="SAVE"
                                  className="w-full bg-purple-500 text-white"
                                />
                              </div>
                            </form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
