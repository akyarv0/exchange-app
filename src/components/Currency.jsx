import React, { useEffect } from "react";
import "../CSS/currency.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY =
  "fca_live_jxh4XKBp6f1tksuMBwlJ6aWow4pMv6foGz8lhywV&base_currency=USD";
const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState("TRY");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [result, setResult] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const exchange = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      console.log(response.data.data);
      console.log(response.data.data[toCurrency]); // Burada veriyi işleyebilirsiniz
      

setCurrencyOptions(Object.keys(response.data.data));
      const result = (response.data.data[toCurrency] * amount).toFixed(3);
      setResult(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };

  useEffect(() => {
    exchange();
  }, [fromCurrency, amount, toCurrency]);

  

  return (
    <div className="currency-div">
      <div className="title">
        <h3>CURRENCY CONVERTER</h3>
      </div>
      <div className="input-div">
        <input
          type="number"
          className="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          name=""
          id=""
          className="from-currency-option"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
        {currencyOptions.map((currency) => (
          <option key={currency}>{currency}</option>
        ))}
        </select>
        <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
        <select
          name=""
          id=""
          className="to-currency-option"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
         {currencyOptions.map((currency) => (
          <option key={currency}>{currency}</option>
        ))}
        </select>
        <input
          type="number"
          name=""
          id=""
          className="result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      </div>
      <button className="convert-button " onClick={exchange}>
        CONVERT
      </button>
    </div>
  );
};

export default Currency;
