import React, { useState } from "react";
import "./App.css";
import processTroughLevel from "./daily";
import { calculateDosage } from "./calculatedosage";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [gender, setGender] = useState("");
  const [dosage, setDosage] = useState("");
  const [troughLevel, setTroughLevel] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = () => {
    if (age < 1 || age > 130) {
      setErrorMessage("Please enter a valid age (1-130)");
      return false;
    }
    if (weight < 1 || weight > 700) {
      setErrorMessage("Please enter a valid weight (1-700 kg)");
      return false;
    }
    if (height < 50 || height > 300) {
      setErrorMessage("Please enter a valid height (50-300 cm)");
      return false;
    }
    if (creatinine < 10 || creatinine > 2650) {
      setErrorMessage("Please enter a valid creatinine level (10-2650 µmol/L)");
      return false;
    }
    if (!gender) {
      setErrorMessage("Please select a gender");
      return false;
    }
    return true;
  };

  const calculate = () => {
    if (validateInput()) {
      setErrorMessage("");
      const creatinineMgDL = creatinine / 88.4;
      const result = calculateDosage(weight, height, age, creatinineMgDL, gender);
      setDosage(result.toFixed(2));
    }
  };

  const processLevel = () => {
    if (troughLevel < 0) {
      setErrorMessage("Please enter a valid trough level (≥0 mg/L)");
    } else {
      setErrorMessage("");
      const result = processTroughLevel(troughLevel, weight, height, gender);
      setRecommendation(result);
    }
  };

  return (
    <div className="App">
      <h1>Gentamicin Dosage Calculator</h1>
      <div>
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div>
        <label>Height (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div>
        <label>Age (years):</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label>Creatinine (µmol/L):</label>
        <input type="number" value={creatinine} onChange={(e) => setCreatinine(e.target.value)} />
      </div>
      <div>
  <label>Gender:</label>
  <input
    type="range"
    min="0"
    max="1"
    step="1"
    value={gender === "Male" ? 0 : 1}
    onChange={(e) => setGender(e.target.value === "0" ? "Male" : "Female")}
  />
  <span>{gender}</span>
</div>

      <button onClick={calculate}>Calculate</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <h2>Recommended Dosage</h2>
      {dosage && <div>{dosage} mg</div>}

      <h2>Gentamicin Trough Level</h2>
      <div>
        <label>Enter Trough Level (mg/L):</label>
        <input type="number" value={troughLevel} onChange={(e) => setTroughLevel(e.target.value)} />
      </div>
      <button onClick={processLevel}>Process Trough Level</button>
      {recommendation && (
        <div>
          <h3>Recommendation</h3>
          <div>{recommendation}</div>
        </div>
      )}
    </div>
  );
}

export default App;
