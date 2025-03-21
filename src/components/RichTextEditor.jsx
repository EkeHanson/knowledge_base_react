import React, { useState, forwardRef } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css"; // ✅ Correct for react-quill v2+


const RichTextEditor = forwardRef(({ value, onChange }, ref) => {
  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  );
});

export default RichTextEditor;
