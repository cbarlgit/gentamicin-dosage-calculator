export function calculateDosage(age, weight, height, creatinine, gender) {
    const F = gender === "Male" ? 1.23 : 1.03;
    const creatinineMicromolPerL = creatinine * 88.4; // Convert creatinine from mg/dL to micromole per litre
    const CrCl = F * ((140 - age) * weight) / creatinineMicromolPerL;
  
    let dose;
    if (CrCl > 60) {
      dose = 7 * weight;
    } else if (CrCl >= 40 && CrCl <= 60) {
      dose = 5 * weight;
    } else if (CrCl >= 20 && CrCl < 40) {
      dose = 3 * weight;
    } else {
      dose = 2 * weight;
    }
  
    return dose;
  }
  