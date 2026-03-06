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

      <button
        className="converter-btn"
        onClick={handleConvert}
      >
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


  );
}

export default CurrencyExchanger;