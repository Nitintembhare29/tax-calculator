const form = document.querySelector("#tax-form");
const grossIncomeInput = document.querySelector("#gross-income");
const extraIncomeInput = document.querySelector("#extra-income");
const ageInput = document.querySelector("#age");
const deductionInput = document.querySelector("#total-deduction");
const grossInputError = document.querySelector("#tooltip-error-1");
const extraInputError = document.querySelector("#tooltip-error-2");
const deductionError = document.querySelector("#tooltip-error-3");
const ageError = document.querySelector("#tooltip-age-error");
const myInput = document.getElementById("myInput");
const modal = document.querySelector(".myModal");
const overAllIncome = document.querySelector(".totalIncome");

// function to open modal
function openModal() {
  modal.classList.add("open-modal");
}
function closeModal() {
  modal.classList.remove("open-modal");
}

// Function to check if a value is numeric
function isNumeric(value) {
  return isNaN(parseFloat(value));
}

document.addEventListener("DOMContentLoaded", function () {
  const grossIncomeInput = document.querySelector("#gross-income");

  // Validate grossIncome input
  grossIncomeInput.addEventListener("input", function (event) {
    if (isNumeric(grossIncomeInput.value)) {
      grossInputError.style.display = "block";
    } else {
      grossInputError.style.display = "none";
    }
  });

  // Validate extraIncome input
  extraIncomeInput.addEventListener("input", function (event) {
    if (isNumeric(event.target.value)) {
      extraInputError.style.display = "block";
    } else {
      extraInputError.style.display = "none";
    }
  });

  // Validate deduction input
  deductionInput.addEventListener("input", function (event) {
    if (isNumeric(event.target.value)) {
      deductionError.style.display = "block";
    } else {
      deductionError.style.display = "none";
    }
  });
});

function calculateTax() {
  const income = Number(form.grossIncome.value);
  const extraIncome = Number(form.extraIncome.value);
  const age = form.age.value;
  const deduction = Number(form.deduction.value);
  let overallIncome = income + extraIncome - deduction;
  if (overallIncome <= 800000) {
    return income + extraIncome;
  } else if (overallIncome > 800000 && age === "<40") {
    tax = (overallIncome - 800000) * 0.3;
    return income + extraIncome - tax;
  } else if (overallIncome > 800000 && age === ">=40 & <60") {
    tax = (overallIncome - 800000) * 0.4;
    return income + extraIncome - tax;
  } else if (overallIncome > 800000 && age === ">=60") {
    tax = (overallIncome - 800000) * 0.1;
    return income + extraIncome - tax;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // validate age input and other input in number type
  if (ageInput.value === "") {
    ageError.style.display = "block";
  } else if (
    isNumeric(grossIncomeInput.value) ||
    isNumeric(extraIncomeInput.value) ||
    isNumeric(deductionInput.value)
  ) {
    e.preventDefault();
  } else {
    ageError.style.display = "none";

    const salaryAfterTax = calculateTax();
    // Intl.NumberFormat object to convert number into indian currency format
    let amt = Intl.NumberFormat("en-IN").format(salaryAfterTax);
    overAllIncome.innerHTML = amt;
    openModal();
    grossIncomeInput.value = "";
    extraIncomeInput.value = "";
    ageInput.value = "";
    deductionInput.value = "";
  }
});
