import React from "react";
import { CheckMarkIcon } from "./svgIcons";

export const Input = ({ type, placeholder, name, onChange }) => {
  function handleFocus(e) {
    e.currentTarget.previousSibling.classList.add("focused");
  }
  function handleBlur(e) {
    if (e.currentTarget.value.trim() != "") return;
    e.currentTarget.previousSibling.classList.remove("focused");
  }
  return (
    <>
      <div className="input-group">
        <div className="input-label">{placeholder}</div>
        <input
          onChange={onChange}
          autocomplete="off"
          type={type}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <style jsx>{`
        .input-group {
          position: relative;
          display: flex;
          width: 100%;
          justify-content: center;
          flex-direction: column;
          margin: 5px 0;
        }
        .input-label {
          top: 50%;
          padding: 0 2px;
          transform: translateY(-50%);
          position: absolute;
          margin: 0 10px;
          font-variant: small-caps;
          font-weight: bold;
          font-family: "Catamaran", sans-serif;
          font-size: 16px;
          transition: all 0.3s ease-in-out;
          color: #888;
        }
        .input-label.focused {
          top: 0;
          background-color: #fff;
          font-size: 13px;
        }
        .input-group input {
          width: 100%;
          padding: 14px;
          border: none;
          border: 1px solid #ccc;
          background-color: transparent;
          outline: none;
        }
      `}</style>
    </>
  );
};

export const CheckBox = ({ label, onChange }) => (
  <>
    <div className="checkbox">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        onChange={onChange}
      />
      <label htmlFor="remember">
        <div className="icon">
          <CheckMarkIcon size={13} />
        </div>
      </label>
      <span className="text">{label}</span>
    </div>

    <style jsx>{`
      .checkbox label {
        cursor: pointer;
        height: 20px;
        width: 20px;
        background: transparent;
        border: 2px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .checkbox label .icon {
        opacity: 0;
      }
      .checkbox {
        display: flex;
        align-items: center;
      }
      .checkbox input {
        display: none;
      }

      .checkbox input:checked ~ label .icon {
        //background: black;
        opacity: 1;
      }
      .checkbox .text {
        margin: 5px 5px;
        font-variant: small-caps;
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
        font-family: "Catamaran";
      }
    `}</style>
  </>
);
