import React from "react";
import "../CSS/currency.css";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Currency = () => {
  return (
    <div className="currency-div">
      <div className="title">
        <h3>CURRENCY CONVERTER</h3>
      </div>
      <div className="input-div">

        <input type="number" className="amount" />
        <select name="" id="" className="from-currency-option">
          <option value="">USD</option>
          <option value="">EUR</option>
          <option value="">TL</option>
        </select>
        <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
        <select name="" id="" className="to-currency-option">
          <option value="">TL</option>
          <option value="">USD</option>
          <option value="">EUR</option>
        </select>
        <input type="number" name="" id="" className="result" />
      </div>
     <button className="convert-button ">CONVERT</button>
    </div>
  );
};

export default Currency;
