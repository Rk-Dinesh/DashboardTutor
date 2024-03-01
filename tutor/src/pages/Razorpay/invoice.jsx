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
    if (number < 1000000)
      return (
        convertNumberToWords(Math.floor(number / 1000)) +
        " thousand" +
        (number % 1000 !== 0 ? " " + convertNumberToWords(number % 1000) : "")
      );
    if (number < 1000000000)
      return (
        convertNumberToWords(Math.floor(number / 1000000)) +
        " million" +
        (number % 1000000 !== 0
          ? " " + convertNumberToWords(number % 1000000)
          : "")
      );
    return "number too large";
  }

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
    
    <>
      <div className="invoice-box" ref={componentRef}>
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr className="top_rw">
              <td colSpan={2}>
                <h4 style={{ marginBottom: 0 }}>
                  Purchase invoice/Bill of Supply
                </h4>
                <span>Number: 27B00032991LQ354 Date: {userData.date}</span>
              </td>
              <td style={{ width: "30%", marginRight: 10 }}>
                Order Id: {userData.tnx_id}
              </td>
            </tr>
            <tr className="top">
              <td colSpan={3}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <b>Sold By: Pro Tutor</b>
                        <br />
                        Delhivery Pvt. Ltd. Plot No. A5 Indian Corporation
                        <br />
                        Warehouse Park Village Dive-anjur, Bhiwandi, Off
                        <br />
                        Nh-3, Near Mankoli Naka, District Thane, Pin Code :
                        421302
                        <br />
                        Mumbai, Maharashtra - 421302
                        <br />
                        PAN: AALFN0535C
                        <br />
                        GSTIN: 27AALFN0535C1ZK
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="information">
              <td colSpan={3}>
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <b>Invoice From: w3learnpoint</b>
                        <br />
                        Kokar, Ranchi
                        <br />
                        +0651-908-090-009
                        <br />
                        info@w3learnpoint.com
                        <br />
                        www.w3learnpoint.com
                      </td>
                      <td>
                        <b>Invoice To: {userData.fname}</b>
                        <br />
                        Acme Corp.
                        <br />
                        John Doe
                        <br />${"{"}email{"}"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <table cellSpacing="0px" cellPadding="2px">
                  <tbody>
                    <tr className="heading">
                      <td style={{ width: "25%" }}>SUBSCRIPTION PLAN</td>
                      <td style={{ width: "10%", textAlign: "center" }}>
                        CREDITS
                      </td>
                      <td style={{ width: "10%", textAlign: "right" }}>
                        TNX ID
                      </td>
                      <td style={{ width: "15%", textAlign: "right" }}>
                        PRICE
                      </td>
                      <td style={{ width: "15%", textAlign: "right" }}>
                        TOTAL AMOUNT
                      </td>
                    </tr>
                    <tr className="item">
                      <td style={{ width: "25%" }}>
                        {userData.plan_name} plan
                      </td>
                      <td style={{ width: "10%", textAlign: "center" }}>
                        {userData.count}
                      </td>
                      <td style={{ width: "15%", textAlign: "right" }}>
                        {userData.tnx_id}
                      </td>
                      <td style={{ width: "15%", textAlign: "right" }}>
                        $ {userData.plancost}
                      </td>
                      <td style={{ width: "15%", textAlign: "right" }}>
                        $ {userData.plancost}
                      </td>
                    </tr>
                    <tr className="item">
                      <td style={{ width: "25%" }}>
                        <b>Grand Total</b>
                      </td>
                      <td style={{ width: "10%", textAlign: "center" }}>
                        {userData.count}
                      </td>
                      <td style={{ width: "10%", textAlign: "right" }} />
                      <td style={{ width: "15%", textAlign: "right" }} />
                      <td style={{ width: "15%", textAlign: "right" }}>
                        <b>$ {userData.plancost}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className="total">
              <td colSpan={3} align="right">
                Total Amount in Words:{" "}
                <b>{convertNumberToWords(userData.plancost)} dollars Only</b>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <table cellSpacing="0px" cellPadding="2px">
                  <tbody>
                    <tr>
                      <td width="50%">
                        <b>Declaration:</b>
                        <br />
                        We declare that this invoice shows the actual price of
                        the goods described above and that all particulars are
                        true and correct. The goods sold are intended for end
                        user consumption and not for resale.
                      </td>
                      <td>
                        * This is a computer generated invoice and does not
                        require a physical signature
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" />
                      <td>
                        <b>Authorized Signature</b>
                        <br />
                        <br />
                        ...................................
                        <br />
                        <br />
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
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
