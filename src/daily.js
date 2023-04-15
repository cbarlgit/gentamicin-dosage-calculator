import React, { useState } from 'react';

const Daily = ({ dosage, weight }) => {
  const [troughLevel, setTroughLevel] = useState('');
  const [result, setResult] = useState('');

  const processTroughLevel = () => {
    let message = '';
    let newDosage = dosage;

    if (troughLevel < 1) {
      message = 'Continue the current dose and check level again in 2 or 3 days.';
    } else if (troughLevel >= 1 && troughLevel <= 1.9) {
      newDosage = dosage - (1 * weight);
      message = `Reduce further doses by 1mg/kg (of dosing weight). New recommended dosage: ${newDosage.toFixed(2)} mg.`;
    } else if (troughLevel >= 2 && troughLevel <= 3) {
      message = 'Omit the next dose, and increase the dosing interval to 48 hours for further doses. Take the next trough level at 36 hours post-dose and wait for the level. If this dose is <1mg/L, then continue with the same dose every 48 hours. If it is not, then discuss with a microbiology consultant or pharmacist.';
    } else if (troughLevel > 3) {
      message = 'Discuss with a microbiologist consultant or pharmacist.';
    }

    setResult(message);
  };

  return (
    <div>
      <h2>Gentamicin Trough Level</h2>
      <label htmlFor="troughLevel">Enter Trough Level (mg/L):</label>
      <input
        type="number"
        id="troughLevel"
        value={troughLevel}
        onChange={(e) => setTroughLevel(parseFloat(e.target.value))}
      />
      <button onClick={processTroughLevel}>Process Trough Level</button>
      {result && (
        <>
          <h3>Recommendation</h3>
          <p>{result}</p>
        </>
      )}
    </div>
  );
};

export default Daily;
