// // script.js
// document.addEventListener('DOMContentLoaded', () => {
//   const conversionType = document.getElementById('conversion-type');
//   const fromUnit = document.getElementById('from-unit');
//   const toUnit = document.getElementById('to-unit');
//   const inputValue = document.getElementById('input-value');
//   const result = document.getElementById('result');

//   const unitOptions = {
//     length: ['Meters', 'Kilometers', 'Feet', 'Miles'],
//     weight: ['Kilograms', 'Pounds', 'Ounces', 'Grams'],
//     volume: ['Liters', 'Milliliters', 'Gallons', 'Pints'],
//     temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
//     currency: ['INR', 'USD', 'EUR']
//   };

//   const conversionRates = {
//     length: {
//       Meters: { Kilometers: 0.001, Feet: 3.281, Miles: 0.000621 },
//       Kilometers: { Meters: 1000, Feet: 3281, Miles: 0.621 },
//       Feet: { Meters: 0.305, Kilometers: 0.000305, Miles: 0.000189 },
//       Miles: { Meters: 1609, Kilometers: 1.609, Feet: 5280 }
//     },
//     weight: {
//       Kilograms: { Pounds: 2.205, Ounces: 35.274, Grams: 1000 },
//       Pounds: { Kilograms: 0.454, Ounces: 16, Grams: 453.6 },
//       Ounces: { Kilograms: 0.0283, Pounds: 0.0625, Grams: 28.35 },
//       Grams: { Kilograms: 0.001, Pounds: 0.0022, Ounces: 0.035 }
//     },
//     volume: {
//       Liters: { Milliliters: 1000, Gallons: 0.264, Pints: 2.113 },
//       Milliliters: { Liters: 0.001, Gallons: 0.000264, Pints: 0.0021 },
//       Gallons: { Liters: 3.785, Milliliters: 3785, Pints: 8 },
//       Pints: { Liters: 0.473, Milliliters: 473, Gallons: 0.125 }
//     },
//     temperature: {
//       convert: (val, from, to) => {
//         if (from === to) return val;
//         if (from === 'Celsius') return to === 'Fahrenheit' ? val * 9/5 + 32 : val + 273.15;
//         if (from === 'Fahrenheit') return to === 'Celsius' ? (val - 32) * 5/9 : ((val - 32) * 5/9 + 273.15);
//         if (from === 'Kelvin') return to === 'Celsius' ? val - 273.15 : (val - 273.15) * 9/5 + 32;
//       }
//     },
//     currency: {
//       INR: { USD: 0.012, EUR: 0.011 },
//       USD: { INR: 83.5, EUR: 0.92 },
//       EUR: { INR: 91.3, USD: 1.09 }
//     }
//   };

//   function populateUnits(type) {
//     fromUnit.innerHTML = '';
//     toUnit.innerHTML = '';
//     unitOptions[type].forEach(unit => {
//       fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
//       toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
//     });
//   }

//   conversionType.addEventListener('change', () => {
//     populateUnits(conversionType.value);
//     result.textContent = '';
//   });

//   populateUnits('length');

//   window.convert = () => {
//     const val = parseFloat(inputValue.value);
//     const type = conversionType.value;
//     const from = fromUnit.value;
//     const to = toUnit.value;

//     if (isNaN(val)) {
//       result.textContent = 'Please enter a valid number';
//       return;
//     }

//     if (from === to) {
//       result.textContent = `${val} ${to}`;
//       return;
//     }

//     let output = '';
//     if (type === 'temperature') {
//       output = conversionRates.temperature.convert(val, from, to);
//     } else {
//       output = conversionRates[type][from][to];
//       output = output ? val * output : 'Conversion not available';
//     }

//     result.textContent = `Result: ${output} ${to}`;
//   };

//   window.clearFields = () => {
//     inputValue.value = '';
//     result.textContent = '';
//   };
// });



// script.js

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

