let selectedGender = null;

function selectGender(gender) {
  selectedGender = gender;

  document.getElementById('gender-section').style.display = 'none';
  document.getElementById('input-section').style.display = 'block';

  if (gender === 'female') {
    document.getElementById('female-only').style.display = 'block';
  } else {
    document.getElementById('female-only').style.display = 'none';
  }
}

function calculateFat() {
  const height = parseFloat(document.getElementById('height').value);
  const neck = parseFloat(document.getElementById('neck').value);
  const waist = parseFloat(document.getElementById('waist').value);
  const hip = selectedGender === 'female' ? parseFloat(document.getElementById('hip').value) : 0;

  if (!height || !neck || !waist || (selectedGender === 'female' && !hip)) {
    alert("Please fill all required fields.");
    return;
  }

  let bodyFat = 0;

  if (selectedGender === 'male') {
    // U.S. Navy formula for men (in inches)
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    // U.S. Navy formula for women (in inches)
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }

  const fatPercent = bodyFat.toFixed(2);
  const category = getFatCategory(fatPercent, selectedGender);
  const tips = getHealthTips(category);

  document.getElementById('result').innerHTML = `
    <p>Your estimated body fat is: <strong>${fatPercent}%</strong></p>
    <p>Category: <strong>${category}</strong></p>
    <p style="margin-top: 10px;">Health Advice:</p>
    <ul style="text-align: left;">
      ${tips.map(tip => `<li>${tip}</li>`).join('')}
    </ul>
  `;
}

function getFatCategory(fat, gender) {
  fat = parseFloat(fat);

  if (gender === 'male') {
    if (fat < 6) return "Essential Fat";
    else if (fat < 14) return "Athlete";
    else if (fat < 18) return "Fitness";
    else if (fat < 25) return "Average";
    else return "Obese";
  } else {
    if (fat < 14) return "Essential Fat";
    else if (fat < 21) return "Athlete";
    else if (fat < 25) return "Fitness";
    else if (fat < 32) return "Average";
    else return "Obese";
  }
}

function getHealthTips(category) {
  switch (category) {
    case "Essential Fat":
      return [
        "You're in the essential range. Maintain with healthy fats and nutrients.",
        "Avoid excessive fat loss — it may harm hormone balance."
      ];
    case "Athlete":
      return [
        "Excellent shape! Keep up your training and balanced diet.",
        "Hydrate well and maintain protein intake to preserve muscle."
      ];
    case "Fitness":
      return [
        "Great fitness level! Continue regular exercise.",
        "Eat whole foods, avoid junk, and rest well."
      ];
    case "Average":
      return [
        "You're within the average range.",
        "Consider moderate activity and balanced eating to improve further."
      ];
    case "Obese":
      return [
        "Your fat percentage is higher than recommended.",
        "Adopt a calorie-deficit diet with more vegetables and protein.",
        "Increase walking, reduce sugary foods, and stay consistent."
      ];
    default:
      return ["No specific advice available."];
  }
}

function resetForm() {
  selectedGender = null;

  // Hide input section and show gender section
  document.getElementById('input-section').style.display = 'none';
  document.getElementById('gender-section').style.display = 'block';

  // Clear inputs
  document.getElementById('fatForm').reset();
  document.getElementById('result').innerText = '';
}
