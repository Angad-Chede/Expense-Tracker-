import { useState } from "react";
import { convertCurrency } from "../utils/currencyAPI";

function CurrencyExchanger() {

  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);

  const handleConvert = async () => {

  if(!amount){
    alert("Enter amount");
    return;
  }

  const converted = await convertCurrency(from, to, Number(amount));

  console.log("Converted:", converted); // debug

  setResult(converted);

  };
return (
<div className="currency-page">

  <div className="converter-wrapper">

    <div className="converter-card">

      <h2 className="converter-title">Currency Converter</h2>

      <div className="converter-row">

        <input
          className="converter-input"
          type="number"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <select
          className="converter-select"
          value={from}
          onChange={(e)=>setFrom(e.target.value)}
        >
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>

        →

        <select
          className="converter-select"
          value={to}
          onChange={(e)=>setTo(e.target.value)}
        >
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>

        <button className="converter-btn" onClick={handleConvert}>
          Convert
        </button>

      </div>

      {result !== null && (
        <div className="converter-result">
          Result: ₹ {result.toFixed(2)}
        </div>
      )}

    </div>

  </div>

  <div className="currency-info-section">

    <div className="currency-info-card">
      <img src="/img1.png" alt="currency exchange"/>
      <h3>Choose Your Base Currency</h3>
      <p>Select the currency you want to convert from. Easily pick from multiple international currencies before performing the conversion.</p>
    </div>

    <div className="currency-info-card">
      <img src="/img2.png" alt="money transfer"/>
      <h3>Select Target Currency</h3>
      <p>Pick the currency you want to convert into. The converter allows quick switching between global currencies for accurate calculations.</p>
    </div>

    <div className="currency-info-card">
      <img src="/img3.png" alt="global finance"/>
      <h3>Instant Conversion Result</h3>
      <p>Enter the amount and instantly view the converted value using real-time exchange rates.</p>
    </div>

  </div>

</div>
);
}

export default CurrencyExchanger;