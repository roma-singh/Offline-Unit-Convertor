

const conversionType = document.getElementById('conversion-type');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const inputValue = document.getElementById('input-value');
const resultDiv = document.getElementById('result');

const units = {
  length: ['meter', 'kilometer', 'millimeter', 'feet'],
  weight: ['kilogram', 'gram', 'pounds'],
  volume: ['liter', 'milliliter', 'gallon'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  currency: ['INR', 'USD', 'EUR']
};

const conversionRates = {
  length: {
    meter: 1,
    kilometer: 0.001,
    millimeter: 1000,
    feet: 3.28084
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pounds: 2.20462
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172
  },
  currency: {
    INR: 1,
    USD: 0.012,
    EUR: 0.011
  }
};

function populateUnits() {
  const type = conversionType.value;
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  units[type].forEach(unit => {
    fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
  });
}

function convert() {
  const type = conversionType.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    resultDiv.textContent = 'Please enter a valid number.';
    return;
  }

  if (type === 'temperature') {
    let result = convertTemperature(value, from, to);
    resultDiv.textContent = `${value} ${from} = ${result.toFixed(2)} ${to}`;
  } else {
    let base = value / conversionRates[type][from];
    let result = base * conversionRates[type][to];
    resultDiv.textContent = `${value} ${from} = ${result.toFixed(2)} ${to}`;
  }
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === 'Celsius') {
    if (to === 'Fahrenheit') return value * 9/5 + 32;
    if (to === 'Kelvin') return value + 273.15;
  }
  if (from === 'Fahrenheit') {
    if (to === 'Celsius') return (value - 32) * 5/9;
    if (to === 'Kelvin') return (value - 32) * 5/9 + 273.15;
  }
  if (from === 'Kelvin') {
    if (to === 'Celsius') return value - 273.15;
    if (to === 'Fahrenheit') return (value - 273.15) * 9/5 + 32;
  }
}

function clearFields() {
  inputValue.value = '';
  resultDiv.textContent = '';
}

window.onload = populateUnits;

