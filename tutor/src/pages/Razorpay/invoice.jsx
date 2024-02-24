import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Protutor_Logo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function Invoice() {
  const location = useLocation();
  const componentRef = useRef();
  const Id = new URLSearchParams(location.search).get("sub_id");
  console.log(Id, "ide req");
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response;
      const sub_id = Id;

      if (sub_id.startsWith("SPP")) {
        response = await axios.get(
          `http://localhost:3000/getparentplanId?sub_id=${sub_id}`
        );
      } else if (sub_id.startsWith("SPT")) {
        response = await axios.get(
          `http://localhost:3000/gettutorplanId?sub_id=${sub_id}`
        );
      } else if (sub_id.startsWith("SPS")) {
        response = await axios.get(
          `http://localhost:3000/getstudentplanid?sub_id=${sub_id}`
        );
      } else {
        console.error("Invalid sub_id format");
        return;
      }
      //console.log(response);
      const responseData = response.data;
      setUserData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });

  return (
    <section id="invoice">
      <div className="container mx-auto sm:px-4 my-1 py-2" ref={componentRef}>
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="block mx-auto"
            style={{
              width: "240px",
              marginBottom: "-30px",
            }}
          />
        </div>
        <div className="text-center border-t border-b my-1 py-1">
          <h4 className="display-7 fw-bold">Invoice V1 </h4>
          <p className="m-0">Invoice No: 12345</p>
          <p className="m-0">Invoice Date: {userData.date}</p>
        </div>
        <div className="md:flex justify-between py-2">
          <div>
            <p className="text-primary-500 py-1">Invoice To</p>
            <h4>Roger Y. Will</h4>
            <ul className="list-unstyled">
              <li>XYZ Company</li>
              <li>info@xyzcompany.com</li>
              <li>123 Main Street</li>
            </ul>
          </div>
          <div>
            <p className="text-primary-500 py-1">Invoice From</p>
            <h4>{userData.fname}</h4>
            <ul className="list-unstyled">
              <li>ABC Company</li>
              <li>email</li>
              <li>456 Main Street</li>
            </ul>
          </div>
        </div>
        <table className="w-full max-w-full mb-4 bg-transparent border my-5">
          <thead>
            <tr className="bg-primary-subtle">
              <th scope="col">No.</th>
              <th scope="col">Subscription Plan</th>
              <th scope="col">Tnx Id</th>
              <th scope="col">Credits</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{userData.plan_name} Plan</td>
              <td>{userData.tnx_id}</td>
              <td>{userData.count}</td>
              <td> ${userData.plancost}</td>
            </tr>
            <tr>
              <th />
              <td />
              <td />
              <td className="">TAX 20%</td>
              <td>$3.00</td>
            </tr>
            <tr>
              <th />
              <td />
              <td />
              <td className="text-dark-700 fw-bold">Grand-Total</td>
              <td className="text-dark-700 fw-bold">${userData.plancost}</td>
            </tr>
          </tbody>
        </table>
        {/* <div className="md:flex justify-between my-2">
          <div>
            <h5 className="fw-bold my-1">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="flex justify-between ">
                <Icon
                  className="social-icon text-gray-900 fs-5 me-2"
                  icon="mdi:location"
                  style={{ verticalAlign: "text-bottom" }}
                />{" "}
                30 E Lake St, Chicago, USA
              </li>
              <li className="flex justify-between">
                <Icon
                  className="social-icon text-gray-900 fs-5 me-2"
                  icon="solar:phone-bold"
                  style={{ verticalAlign: "text-bottom" }}
                />
                <p >(510) 710-3464</p>
              </li>
              <li className="flex justify-between">
                <Icon
                  className="social-icon text-gray-900 fs-5 me-2"
                  icon="ic:baseline-email"
                  style={{ verticalAlign: "text-bottom" }}
                />
                <p>info@worldcourse.com</p>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="fw-bold my-2">Payment Info</h5>
            <ul className="list-unstyled">
              <li>
                <span className="fw-semibold">Account No: </span> 102 3345 56938
              </li>
              <li>
                <span className="fw-semibold">Account Name: </span> William
                Peter
              </li>
              <li>
                <span className="fw-semibold">Branch Name: </span> XYZ{" "}
              </li>
            </ul>
          </div>
        </div> */}
        {/* <div className="text-center my-5">
          <p className="text-gray-700">
            <span className="fw-semibold">NOTICE: </span> A finance charge of
            1.5% will be made on unpaid balances after 30 days.
          </p>
        </div> */}
        <div id="footer-bottom">
          <div className="container mx-auto sm:px-4 border-t">
            <div className="flex flex-wrap  mt-3">
              <div className="md:w-full pr-4 pl-4 copyright">
                <p>
                  © 2024 Invoice.{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="text-decoration-none text-black-50"
                  >
                    Terms &amp; Conditions
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint}>Print Invoice</button>
    </section>
  );
}

export default Invoice;
