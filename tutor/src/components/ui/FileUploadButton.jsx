import React from 'react';

const FileUploadButton = ({
  onChange,
  buttonText,
  accept,
  onClick,
}) => {
  return (
    <div className="relative text-center hover:text-white py-1.5 rounded-full">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={onChange}
        accept={accept}
      />

      <button
        className="flex items-center gap-2 justify-center border-slate-900 border-2 font-normal text-base w-36 py-2 rounded text-slate-900 hover:text-slate-600 "
        onClick={onClick}
      >
        
        {buttonText}
      </button>
    </div>
  );
};

export default FileUploadButton;