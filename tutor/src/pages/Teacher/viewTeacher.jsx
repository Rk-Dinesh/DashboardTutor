import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import { API } from "../../host";

const Teachers = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tutor_ids = params.get("tutor_id");

  const [tutor, setTutor] = useState([]);
  const [documents, setDocument] = useState([]);

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
        console.log(verficationData);

        setTutor(responseData);
        setDocument(verficationData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [tutor_ids]);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

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

      // For images, create an img element to trigger the download
      const img = document.createElement("img");
      img.src = imageURL;

      // Wait for the image to load before clicking the link
      img.onload = () => {
        link.click();
        window.URL.revokeObjectURL(imageURL); // Clean up the URL afterwards
      };
    }
  };

  return (
    <div>
      <div>
        {tutor.map((tutor, index) => (
          <div className="space-y-3 profile-page" key={index}>
            <div className="profiel-wrap px-[35px] pb-10 md:pt-[30px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
              <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
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

                  <button className="btn bg-lime-600 absolute top-10 right-20 rounded-full hover:bg-lime-700 text-white">
                    verification
                  </button>
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

            <div className="grid grid-cols-12 gap-6">
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

      {documents.map((documents, index) => (
        <div className="grid grid-cols-2 gap-4 pt-3" key={index}>
          <Card>
            <div className="flex gap-9 items-center justify-around ">
              <p>
                <b className="text-lg">Curriculum Vitae</b> <br />
                {documents.cv}
              </p>
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() =>
                  downloadFile(`${API}/${documents.cv}`, "Cover_Letter")
                }
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
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
                {documents.certificate}
              </p>
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() =>
                  downloadFile(`${API}/${documents.certificate}`, "Certificate")
                }
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
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
                {documents.id_proof}
              </p>
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() =>
                  downloadFile(`${API}/${documents.id_proof}`, "Id_Proof")
                }
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
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
                {documents.address_proof}
              </p>
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
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
    </div>
  );
};

export default Teachers;
