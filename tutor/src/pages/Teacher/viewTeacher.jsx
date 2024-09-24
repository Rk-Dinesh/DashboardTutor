import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import { API } from "../../host";
import { toast } from "react-toastify";


const Teachers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tutor_ids = params.get("tutor_id");

  const [tutor, setTutor] = useState([]);
  const [documents, setDocument] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API}/teacherGetData?tutor_id=${tutor_ids}`
        );
        const verfication = await axios.get(
          `${API}/getdocument?tutor_id=${tutor_ids}`
        );
        const responseData = response.data;
        const verficationData = verfication.data;
        // console.log(verficationData);

        setTutor(responseData);
        setDocument(verficationData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [tutor_ids, refresh]);

  // const handleDownload = (fileUrl) => {
  //   window.open(fileUrl, "_blank");
  // };

  //   const downloadFile = async (url, filename) => {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const alink = document.createElement("a");
  //     alink.href = window.URL.createObjectURL(blob);
  //     alink.download = filename;
  //     alink.click();
  //   };

  const downloadFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/pdf")) {
      // For PDF files
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else {
      // For image files
      const imageURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = filename;
      const img = document.createElement("img");
      img.src = imageURL;

      img.onload = () => {
        link.click();
        window.URL.revokeObjectURL(imageURL);
      };
    }
  };

  const handleVerify = async (tutor_id) => {
    try {
      const verify = await axios.put(
        `${API}/verifyUpdate?tutor_id=${tutor_id}`,
        {
          verification: "verified",
        }
      );

      toast.success("Tutor Verified");
      setRefresh(!refresh);
      setShowCommentBox(true);
      // console.log("Verification successful:", verify.data);
    } catch (error) {
      console.log("Error occurred while verifying:", error);
    }
  };

  const handleReject = async (tutor_id) => {
    try {
      const verify = await axios.put(
        `${API}/verifyUpdate?tutor_id=${tutor_id}`,
        {
          verification: "pending",
        }
      );
      toast.error("Rejected Successfully");
      setRefresh(!refresh);
      setShowCommentBox(true);
    } catch (error) {
      console.log("Error occurred while verifying:", error);
    }
  };

  const handleTextareaChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async (tutor_id) => {
    const notifyPromise = new Promise(async (resolve, reject) => {
      try {
        const verify = await axios.put(`${API}/email?tutor_id=${tutor_id}`, {
          comment: comment,
        });
       
        setShowCommentBox(false);
        setComment("");
        resolve();
      } catch (error) {
        console.log("Error occurred while verifying:", error);
        reject();
      }
    });
  
    toast.promise(
      notifyPromise,
      {
        pending: 'Sending notification...',
        success: 'Notification Sent',
        error: 'Error occurred while sending notification'
      }
    );
  
    notifyPromise.then(() => {
      navigate('/teacher');
    });
  };
  



  return (
    <div>
      <div>
        {tutor.map((tutor, index) => (
          <div className="space-y-3 profile-page" key={index}>
            <div className="profiel-wrap px-[35px] pb-10 md:pt-[30px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
              <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg">
                {tutor?.verification === "verified" ? (
                  <button
                    className="py-1.5 px-4 bg-primary-600 absolute top-20 right-14 rounded-full text-white"
                    disabled
                  >
                    <div className="flex gap-3 items-center">
                      Verified <i className="bi bi-patch-check fs-5"></i>
                    </div>
                  </button>
                ) : (
                  <button
                    className="py-1.5 px-4 bg-lime-600 absolute top-20 right-14 rounded-full hover:bg-lime-700 text-white"
                    onClick={() => handleVerify(tutor?.tutor_id)}
                  >
                    <div className="flex gap-4 items-center">
                      {" "}
                      Verify <i className="bi bi-check-circle fs-5"></i>
                    </div>
                  </button>
                )}

                <button
                  className="py-1.5 px-4 bg-red-600 absolute top-6 right-14 rounded-full hover:bg-red-700 text-white"
                  onClick={() => handleReject(tutor?.tutor_id)}
                >
                  <div className="flex gap-4 items-center">
                    Reject <i className="bi bi-x-circle fs-5"></i>
                  </div>
                </button>
              </div>
              <div className="profile-box flex-none md:text-start text-center">
                <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                  <div className="flex-none">
                    <div className="md:h-[176px] md:w-[176px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                      <img
                        src={`${API}/${tutor.teacherimage}`}
                        alt="Image"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                      {`${tutor?.fname} ${tutor?.lname}` || "N/A"}
                    </div>
                    <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                      {tutor?.tutor_id || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                <div className="flex-1">
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                    Gender
                  </div>
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                    {tutor?.email || "N/A"}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                    Subject
                  </div>
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                    {tutor?.subject || "N/A"}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                    Qualification
                  </div>
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                    {tutor?.qualification || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!showCommentBox &&
          tutor.map((tutor, index) => (
            <div className="space-y-3 profile-page" key={index}>
              <div className="grid grid-cols-12 gap-6 pt-3">
                <div className="lg:col-span-12 col-span-12">
                  <Card title="Contact Info">
                    <div className="  flex justify-around">
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:envelope" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            EMAIL
                          </div>
                          <a
                            href="mailto:someone@example.com"
                            className="text-base text-slate-600 dark:text-slate-50"
                          >
                            {tutor?.email || "N/A"}
                          </a>
                        </div>
                      </div>

                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:phone-arrow-up-right" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            PHONE
                          </div>
                          <a
                            href="tel:0189749676767"
                            className="text-base text-slate-600 dark:text-slate-50"
                          >
                            {tutor?.phone || "N/A"}
                          </a>
                        </div>
                      </div>

                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:map" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            LOCATION
                          </div>
                          <div className="text-base text-slate-600 dark:text-slate-50">
                            {`${tutor?.address} , ${tutor?.state} - ${tutor?.postcode}` ||
                              "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="lg:col-span-12 col-span-12">
                  <Card title="Bio">
                    <div className="  flex justify-around">
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:academic-cap" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Qualification
                          </div>
                          <div className="text-base text-slate-600 dark:text-slate-50">
                            {tutor?.qualification || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="fluent-mdl2:work" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Experience
                          </div>
                          <div className="text-base text-slate-600 dark:text-slate-50">
                            {tutor?.experience || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="uiw:verification" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Verification
                          </div>
                          <div className="text-base text-slate-600 dark:text-slate-50">
                            {tutor?.verification || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!showCommentBox &&
        documents.map((documents, index) => (
          <div className="grid grid-cols-2 gap-4 pt-3" key={index}>
            <Card>
              <div className="flex gap-9 items-center justify-around ">
                <p>
                  <b className="text-lg">Curriculum Vitae</b> <br />
                  {documents.cv ? documents.cv : "No document found"}
                </p>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={() =>
                    downloadFile(`${API}/${documents.cv}`, "Cover_Letter")
                  }
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6 items-center justify-around">
                <p>
                  <b className="text-lg">Certificate</b> <br />
                  {documents.certificate
                    ? documents.certificate
                    : "No document found"}
                </p>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={() =>
                    downloadFile(
                      `${API}/${documents.certificate}`,
                      "Certificate"
                    )
                  }
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6 items-center justify-around">
                <p>
                  <b className="text-lg">Id_Proof</b> <br />
                  {documents.id_proof
                    ? documents.id_proof
                    : "No document found"}
                </p>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={() =>
                    downloadFile(`${API}/${documents.id_proof}`, "Id_Proof")
                  }
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </Card>

            <Card>
              <div className="flex gap-6 items-center justify-around">
                <p>
                  <b className="text-lg">Address_Proof</b> <br />
                  {documents.address_proof
                    ? documents.address_proof
                    : "No document found"}
                </p>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={() =>
                    downloadFile(
                      `${API}/${documents.address_proof}`,
                      "Address_Proof"
                    )
                  }
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </Card>
          </div>
        ))}
      {showCommentBox &&
        documents.map((documents, index) => (
          <div className="relative w-[32rem] pt-10" key={index}>
            <div className="relative w-full min-w-[200px]">
              <textarea
                rows="6"
                value={comment}
                onChange={handleTextareaChange}
                className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-gray-700 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-md font-normal text-#020617 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[24px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-200 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Comment
              </label>
            </div>
            <div className="pt-2 absolute right-0">
              <button
                className="select-none rounded-full bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => handleSubmitComment(documents?.tutor_id)}
              >
                Submit
              </button>
            </div>
          </div>
        ))}

    </div>
  );
};

export default Teachers;
