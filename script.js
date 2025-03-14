const sections = [
  "enter-expenses",
  "reflect-spending",
  "savings-adjustment",
  "spend-to-save"
];

function hideAllSections() {
  sections.forEach(sectionId => {
    document.getElementById(sectionId).classList.add("hidden");
  });
}

function showSection(sectionId) {
  hideAllSections();
  document.getElementById(sectionId).classList.remove("hidden");
}

function addExpenseRow(type) {
  let table = document.getElementById(`${type}ExpenseTable`);
  let newRow = table.insertRow(table.rows.length);
  newRow.innerHTML = `
    <td><input type="text" placeholder="Enter expense" class="${type}-expense" /></td>
    <td><input type="number" placeholder="Enter amount" class="expense-amount" /></td>
    <td><input type="number" placeholder="Enter amount" class="actual-expense" /></td>
    <td><button class="remove-button" onclick="removeRow(this)">Remove</button></td>
  `;
}

function addExpenseRowWithListeners(type) {
  addExpenseRow(type);
  attachExpenseListeners();
  updateAll(); // Update totals after adding a row
}

function removeRow(button) {
  let row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateAll(); // Update totals after removal
}

function calculateTotalSpending() {
  let total = 0;
  const expenses = document.querySelectorAll(".actual-expense");
  expenses.forEach(expense => {
    total += parseFloat(expense.value) || 0;
  });
  return total;
}

function calculateFixedSpending() {
  let total = 0;
  const expenses = document.querySelectorAll(".fixed-expense");
  expenses.forEach(expense => {
    total += parseFloat(expense.value) || 0;
  });
  return total;
}

function calculateOptionalSpending() {
  let total = 0;
  const expenses = document.querySelectorAll(".optional-expense");
  expenses.forEach(expense => {
    total += parseFloat(expense.value) || 0;
  });
  return total;
}

function updateProgressBar(fixed, optional, total) {
  const fixedBar = document.getElementById("fixedBar");
  const optionalBar = document.getElementById("optionalBar");

  if (total > 0) {
    fixedBar.style.width = `${(fixed / total) * 100}%`;
    optionalBar.style.width = `${(optional / total) * 100}%`;
  } else {
    fixedBar.style.width = "0%";
    optionalBar.style.width = "0%";
  }
}

function updateTotalSpendingDisplay() {
  let totalSpending = calculateTotalSpending();
  // Update the displayed total spending
  document.getElementById("reflectedTotal").textContent = `TZS ${totalSpending.toFixed(2)}`;
  let fixedSpending = calculateFixedSpending();
  let optionalSpending = calculateOptionalSpending();
  updateProgressBar(fixedSpending, optionalSpending, totalSpending);
}

function updateSavings() {
  const slider = document.getElementById("savingsSlider");
  const savingsMessage = document.getElementById("savingsMessage");
  // Update the slider value display
  document.getElementById("sliderValue").textContent = slider.value;

  let savingsPercent = parseFloat(slider.value);
  let totalSpending = calculateTotalSpending();
  let potentialSavings = (totalSpending * savingsPercent) / 100;

  savingsMessage.textContent = `Based on your total spending of $${totalSpending.toFixed(2)}, you could save $${potentialSavings.toFixed(2)} this month. Adjust your spending and savings percentage to see how it works!`;
}

function updateAll() {
  updateTotalSpendingDisplay();
  updateSavings();
}

function attachExpenseListeners() {
  document.querySelectorAll(".actual-expense").forEach(input => {
    input.removeEventListener("input", updateAll);
    input.addEventListener("input", updateAll);
  });
}

attachExpenseListeners();
document.getElementById("savingsSlider").addEventListener("input", updateAll);

function calculateAndProceed() {
  updateAll();
  showSection("reflect-spending");
}

// Adding event listeners for the buttons to navigate to the links
document.getElementById("learnMoreBtn").addEventListener("click", function() {
    // Change the URL to the link you want
    window.location.href = "https://bit.ly/3DBkfRA"; // Example link
});

document.getElementById("openAccountBtn").addEventListener("click", function() {
    // Change the URL to the link you want
    window.location.href = "https://linktr.ee/gtworldtanzania"; // Example link
});
