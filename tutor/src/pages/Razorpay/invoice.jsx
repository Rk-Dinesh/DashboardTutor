import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Protutor_Logo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./invoice.css";

function Invoice() {
  const location = useLocation();
  const componentRef = useRef();
  const Id = new URLSearchParams(location.search).get("sub_id");
  console.log(Id, "ide req");
  const [userData, setUserData] = useState([]);

  function convertNumberToWords(number) {
    const ones = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
    ];
    const teens = [
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    ];
    const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
    ];

    if (number === 0) return "zero";

    if (number < 0 || number >= 1000) return "number too large";

    if (number < 10) return ones[number];
    if (number < 20) return teens[number - 10];
    if (number < 100)
        return (
            tens[Math.floor(number / 10)] +
            (number % 10 !== 0 ? " " + ones[number % 10] : "")
        );
    if (number < 1000)
        return (
            ones[Math.floor(number / 100)] +
            " hundred" +
            (number % 100 !== 0 ? " " + convertNumberToWords(number % 100) : "")
        );
    // Handling numbers with decimal values
    if (number % 1 !== 0) {
        const wholeNumber = Math.floor(number);
        const decimalNumber = number - wholeNumber;
        const decimalWords = convertNumberToWords(Math.round(decimalNumber * 100));
        return (
            convertNumberToWords(wholeNumber) +
            (decimalWords === 'zero' ? ' and zero' : ' and ' + decimalWords)
        );
    }
    
    return "number too large";
}

console.log(convertNumberToWords(116.82)); 


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

  const price = parseInt(userData.plancost);
  const totalPrice = price + (price * 18) / 100;

  return (
    <>
      <div className="invoice-container" ref={componentRef}>
        {/* Head */}
        <div className="invoice-box" />
        <div className="invoice">
          {/* content */}
          <div className="content">
            {/* left */}
            <div className="content-left">
              <img src={logo} alt="Pro-tutor logo" className="logo" />
              <h3 className="title">SST Invoice</h3>
            </div>
            {/* right */}
            <div className="content-right">
              <p style={{ textAlign: "right" }}>
                <b> PRO TUTOR EDUCATIONPRO TUTOR EDUCATION </b>
                <br />
                D-3-15, Jalan Tokoh 25/28, Seksyen 25,
                <br />
                40400 Shah Alam, Selangor <br />
                protutoreducation@gmail.com
              </p>
            </div>
          </div>
          <hr />
          {/* Address */}
          <div className="address">
            <div>
              <p className="ad-data">
                <b>Bill</b> <br />
                {userData.fname}
                <br />
                Wilayah Persekutuan,Malasiya -55100 <br />
                {userData.email}
              </p>
            </div>
            <div>
              <p className="ad-data">
                <b>Invoice #</b>
                <br />
                {userData.sub_id} <br />
                <b>Date</b> <br />
                {userData.date}
              </p>
            </div>
          </div>
          <hr />
          {/* table */}
          <table className="body-values">
            <tbody className="table-values">
              <tr className="values">
                <th>S.NO</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>AMOUNT</th>
              </tr>
              <tr className="values">
                <td>1</td>
                <td>{userData.plan_name} Plan</td>
                <td>RM{userData.plancost}</td>
                <td>1</td>
                <td>RM{userData.plancost}</td>
              </tr>
              <div className="space">
                <tr className="values">
                  <td></td>
                  <td></td>
                  <td>Sub Total</td>
                  <td></td>
                  <td>RM{userData.plancost}</td>
                </tr>
                <tr className="values">
                  <td></td>
                  <td></td>
                  <td>SST( 8% )</td>
                  <td></td>
                  <td>RM{(userData.plancost / 100) * 18}</td>
                </tr>
              </div>
            </tbody>
          </table>
          <hr />
          {/* values */}
          <div className="amounts">
            <div className="amount">
              <p>
                <b>Total Amount in Words:</b>
              </p>
              <p>{convertNumberToWords(116.82)} ringgits only /-</p>
            </div>
            <div className="total-amount">RM{totalPrice}</div>
          </div>
          {/* Account details */}
          <div className="ac-data">
            <p>
              <b>Acc Details:</b>
              <br />
              Acc no. : 000000000000 <br />
              Acc Name: Protutor Education <br />
              IFSC Code : ABC0000123
              <br />
              Branch: Malasiya
            </p>
          </div>
        </div>
        {/* footer */}
        <div className="footer">
          <h2 className="foot-title"> protutoreducation@gmail.com</h2>
        </div>
      </div>

      <br />
      <div className="ltr:text-right rtl:text-left">
        <button className="btn btn-dark text-center" onClick={handlePrint}>
          Print Invoice
        </button>
      </div>
    </>
  );
}

export default Invoice;
