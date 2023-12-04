import React, { useState } from "react";
import "./styles.css";
import "./tailwind.css"; // Import the compiled Tailwind CSS file

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [isYear, setIsYear] = useState(true);
  const [emi, setEMI] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalPayment, setTotalPayment] = useState("");

  const handleRadioChange = (e) => {
    setIsYear(e.target.value === "year");
  };

  const calculateEMI = () => {
    let noOfMonths = 0;

    if (!isYear && !loanDuration) {
      alert("Please select loan tenure type -> Month or year");
      return;
    }

    if (isYear) {
      noOfMonths = loanDuration * 12;
    } else {
      noOfMonths = loanDuration;
    }

    const r = parseFloat(interestRate) / 12 / 100;
    const P = parseFloat(loanAmount);
    const n = noOfMonths;

    const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const calculatedTotalInterest = EMI * n - P;
    const calculatedTotalPayment = calculatedTotalInterest + P;

    setEMI(Math.round(EMI));
    setTotalInterest(Math.round(calculatedTotalInterest));
    setTotalPayment(Math.round(calculatedTotalPayment));
  };

  return (
    <div className="container mx-auto p-4">
      <p className="text-3xl font-bold text-red-700 mb-4">EMI Calculator</p>
      <div className="input-container mb-4">
        <label htmlFor="amount" className="block mb-2">
          Loan Amount (₹)
        </label>
        <input
          type="number"
          id="amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="input-container mb-4">
        <label htmlFor="interest" className="block mb-2">
          Interest Rate(%)
        </label>
        <input
          type="number"
          id="interest"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="input-container loan-tenure-container mb-4">
        <label htmlFor="loanTenure" className="block mb-2">
          Loan Tenure
        </label>
        <input
          type="text"
          id="loanTenure"
          value={loanDuration}
          onChange={(e) => setLoanDuration(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <div className="radio-container mt-2">
          <input
            type="radio"
            name="btn"
            id="year"
            value="year"
            checked={isYear}
            onChange={handleRadioChange}
          />
          <label htmlFor="year" className="mr-4">
            Year
          </label>
          <input
            type="radio"
            name="btn"
            id="month"
            value="month"
            checked={!isYear}
            onChange={handleRadioChange}
          />
          <label htmlFor="month">Month</label>
        </div>
      </div>
      <div className="submit-container mb-4">
        <button
          onClick={calculateEMI}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
      <div className="output">
        <p className="mb-2">
          Loan EMI <span id="emi">₹{emi}</span>
        </p>
        <p className="mb-2">
          Total Interest Payable{" "}
          <span id="totalInterest">₹{totalInterest}</span>
        </p>
        <p>
          Total Payment(Principal + Interest){" "}
          <span id="totalPayment">₹{totalPayment}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
