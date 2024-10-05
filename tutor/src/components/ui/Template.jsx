import React from "react";

const Template = ({ handleDownload }) => {

  
  return (
    <div className="text-center">
      <button
        className=" border-slate-900 border-2 font-normal text-base px-4 py-2 rounded text-slate-900 hover:text-white hover:bg-slate-900 "
        onClick={() => handleDownload()}
      >
        Bulk Upload Template
      </button>
    </div>
  );
};

export default Template;