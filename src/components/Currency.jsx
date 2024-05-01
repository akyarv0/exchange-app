import React, { useState } from "react";
import "../CSS/currency.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_jxh4XKBp6f1tksuMBwlJ6aWow4pMv6foGz8lhywV";

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState("TRY");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [result, setResult] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const exchange = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      setCurrencyOptions(Object.keys(response.data.data));
      const rate = response.data.data[toCurrency];
      const result = (rate * amount).toFixed(3);
      setResult(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Butona tıklanmadan önce döviz seçeneklerini yüklemek için kullanılır
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}`);
        setCurrencyOptions(Object.keys(response.data.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCurrencies();
  }, []);

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
      onChange={(e) => {
        if (e.target.value >= 1) {
          setAmount(e.target.value);
        }
      }}
      min="0" // Negatif sayıların girilmesini engeller
      // pattern="[0-9]*" // Opsiyonel: Sadece rakam girilmesini sağlar
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
        <FaArrowAltCircleRight style={{ fontSize: "40px", color: "green" }} />
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
         
          readOnly
        />
      </div>
      <button className="convert-button " onClick={exchange}>
        CONVERT
      </button>
    </div>
  );
};

export default Currency;
