import React, { useState } from "react";
import { CheckMarkIcon } from "./svgIcons";
import { FiPlus, FiMinus } from "react-icons/fi";

export const Input = ({ type, placeholder, name, multiline, onChange }) => {
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
        {!multiline && <div className="input-label">{placeholder}</div>}
        {multiline ? (
          <textarea rows="4" placeholder={placeholder} onChange></textarea>
        ) : (
          <input
            onChange={onChange}
            autoComplete="off"
            type={type}
            name={name}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
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
        textarea {
          font-variant: small-caps;
          font-weight: bold;
          font-family: "Catamaran", sans-serif;
          font-size: 17px;
          padding: 10px;
          color: #888;
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

const COTROL_FILL = "#FFF";
export const NumberInput = ({
  min = 0,
  max,
  value,
  onChange,
  afterChange = () => {},
}) => {
  const [startClick, setstartClick] = useState(false);

  return (
    <>
      <div className="number-input">
        <div
          className="control minus"
          onMouseOut={() => {
            if (startClick) {
              afterChange({ type: "decrement" }, value);
              setstartClick(false);
            }
          }}
          onClick={() => {
            if (value != min) {
              setstartClick(true);
              onChange(value - 1);
            }
          }}
        >
          <FiMinus color={COTROL_FILL} size={20} />
        </div>
        <div className="value">{value}</div>
        <div
          className="control plus"
          onMouseOut={() => {
            if (startClick) {
              afterChange({ type: "increment" }, value);
              setstartClick(false);
            }
          }}
          onClick={() => {
            setstartClick(true);
            if (max && value >= max) return;
            onChange(value + 1);
          }}
        >
          <FiPlus color={COTROL_FILL} size={20} />
        </div>
      </div>
      <style jsx>{`
        .number-input {
          height: 33px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .number-input div {
          user-select: none;
          display: flex;
          flex: 1;
          height: 100%;
          color: #888;
          align-items: center;
          justify-content: center;
        }
        .control {
          cursor: pointer;
          background-color: #30292f;

          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
