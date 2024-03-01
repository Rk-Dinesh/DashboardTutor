{
  /* <div className={isSemiDark ? "dark" : ""}>
<div
  className= {`sidebar-wrapper bg-white dark:bg-slate-800 w-[248px] shadow-base`}
>
  <SidebarLogo menuHover={menuHover} />
  <div
    className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none opacity-0`}
  ></div>

  <SimpleBar
    className="sidebar-menu px-4 h-[calc(100%-80px)]"
    scrollableNodeProps={{ ref: scrollableNodeRef }}
  >
    <Navmenu menus={menuItems} />
  </SimpleBar>
</div>
</div> */
}

{
  /* <div
      className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 border-none`}>
      <Link to="/dashboard">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img
                src={MobileLogo}
                alt=""
                style={{ height: "100", width: "60px" }}
              />
            ) : (
              <img src={MobileLogo} alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <p className="text-dark-600">
                <b>Pro Tutor </b>
              </p>
            </div>
          )}
        </div>
      </Link>
  
    </div> */
}

<div className="overflow-x-auto -mx-6">
  <div className="inline-block min-w-full align-middle">
    <div className="overflow-hidden ">
    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                    <tr>
                        <th className=" table-th " >#</th>
                        <th className=" table-th " > ID</th>
                        <th className=" table-th " >TUTOR ID</th>
                        <th className=" table-th " >TUTOR </th>
                        <th className=" table-th " >PLAN</th>
                        <th className=" table-th " >AMOUNT</th>
                        <th className=" table-th " >TRANSACTION ID</th>
                        <th className=" table-th " >DATE</th>
                        <th className=" table-th " >STATUS</th>
                        {/* <th className=" table-th " >EMAIL</th> */}

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.original.tutorsub_id}>
                                <td className="table-td">{row.original.rowIndex}</td>
                                <td className="table-td">{row.original.tutorsub_id}</td>
                                <td className="table-td">{row.original.tutor_id}</td>
                                <td className="table-td">{row.original.fname}</td>
                                <td className="table-td">{row.original.plan_name}</td>
                                <td className="table-td">{row.original.plancost}</td>
                                <td className="table-td">{row.original.tnx_id}</td>
                                <td className="table-td">{row.original.date}</td>
                                <td className="table-td">
                                    <div
                                        className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${row.original.status === "paid"
                                                ? "text-success-500 bg-success-500"
                                                : ""
                                            } 
            ${row.original.status === "unpaid"
                                                ? "text-danger-500 bg-danger-500"
                                                : ""
                                            }
            
             `}
                                    >
                                        {row.original.status}
                                    </div>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
    </div>
  </div>
</div>

// <section id="invoice">
    //   <div className="container mx-auto sm:px-4 my-1 py-2" ref={componentRef}>
    //     <div className="text-center">
    //       <img
    //         src={logo}
    //         alt="Logo"
    //         className="block mx-auto"
    //         style={{
    //           width: "240px",
    //           marginBottom: "-30px",
    //         }}
    //       />
    //     </div>
    //     <div className="text-center border-t border-b my-1 py-1">
    //       <h4 className="display-7 fw-bold">Invoice V1 </h4>
    //       <p className="m-0">Invoice No: 12345</p>
    //       <p className="m-0">Invoice Date: {userData.date}</p>
    //     </div>
    //     <div className="md:flex justify-between py-2">
    //       <div>
    //         <p className="text-primary-500 py-1">Invoice To</p>
    //         <h4>Roger Y. Will</h4>
    //         <ul className="list-unstyled">
    //           <li>XYZ Company</li>
    //           <li>info@xyzcompany.com</li>
    //           <li>123 Main Street</li>
    //         </ul>
    //       </div>
    //       <div>
    //         <p className="text-primary-500 py-1">Invoice From</p>
    //         <h4>{userData.fname}</h4>
    //         <ul className="list-unstyled">
    //           <li>ABC Company</li>
    //           <li>email</li>
    //           <li>456 Main Street</li>
    //         </ul>
    //       </div>
    //     </div>
    //     <table className="w-full max-w-full mb-4 bg-transparent border my-5">
    //       <thead>
    //         <tr className="bg-primary-subtle">
    //           <th scope="col">No.</th>
    //           <th scope="col">Subscription Plan</th>
    //           <th scope="col">Tnx Id</th>
    //           <th scope="col">Credits</th>
    //           <th scope="col">Amount</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <th scope="row">1</th>
    //           <td>{userData.plan_name} Plan</td>
    //           <td>{userData.tnx_id}</td>
    //           <td>{userData.count}</td>
    //           <td> ${userData.plancost}</td>
    //         </tr>
    //         <tr>
    //           <th />
    //           <td />
    //           <td />
    //           <td className="">TAX 20%</td>
    //           <td>$3.00</td>
    //         </tr>
    //         <tr>
    //           <th />
    //           <td />
    //           <td />
    //           <td className="text-dark-700 fw-bold">Grand-Total</td>
    //           <td className="text-dark-700 fw-bold">${userData.plancost}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //     {/* <div className="md:flex justify-between my-2">
    //       <div>
    //         <h5 className="fw-bold my-1">Contact Us</h5>
    //         <ul className="list-unstyled">
    //           <li className="flex justify-between ">
    //             <Icon
    //               className="social-icon text-gray-900 fs-5 me-2"
    //               icon="mdi:location"
    //               style={{ verticalAlign: "text-bottom" }}
    //             />{" "}
    //             30 E Lake St, Chicago, USA
    //           </li>
    //           <li className="flex justify-between">
    //             <Icon
    //               className="social-icon text-gray-900 fs-5 me-2"
    //               icon="solar:phone-bold"
    //               style={{ verticalAlign: "text-bottom" }}
    //             />
    //             <p >(510) 710-3464</p>
    //           </li>
    //           <li className="flex justify-between">
    //             <Icon
    //               className="social-icon text-gray-900 fs-5 me-2"
    //               icon="ic:baseline-email"
    //               style={{ verticalAlign: "text-bottom" }}
    //             />
    //             <p>info@worldcourse.com</p>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h5 className="fw-bold my-2">Payment Info</h5>
    //         <ul className="list-unstyled">
    //           <li>
    //             <span className="fw-semibold">Account No: </span> 102 3345 56938
    //           </li>
    //           <li>
    //             <span className="fw-semibold">Account Name: </span> William
    //             Peter
    //           </li>
    //           <li>
    //             <span className="fw-semibold">Branch Name: </span> XYZ{" "}
    //           </li>
    //         </ul>
    //       </div>
    //     </div> */}
    //     {/* <div className="text-center my-5">
    //       <p className="text-gray-700">
    //         <span className="fw-semibold">NOTICE: </span> A finance charge of
    //         1.5% will be made on unpaid balances after 30 days.
    //       </p>
    //     </div> */}
    //     <div id="footer-bottom">
    //       <div className="container mx-auto sm:px-4 border-t">
    //         <div className="flex flex-wrap  mt-3">
    //           <div className="md:w-full pr-4 pl-4 copyright">
    //             <p>
    //               © 2024 Invoice.{" "}
    //               <a
    //                 href="#"
    //                 target="_blank"
    //                 className="text-decoration-none text-black-50"
    //               >
    //                 Terms &amp; Conditions
    //               </a>{" "}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="ltr:text-right rtl:text-left">
    //   <button  className="btn btn-dark text-center" onClick={handlePrint}>Print Invoice</button>
    //   </div>

    // </section>
