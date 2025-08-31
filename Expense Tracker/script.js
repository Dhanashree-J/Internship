const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("plus");
const expenseEl = document.getElementById("minus");
const listEl = document.getElementById("list");
const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = [];
let id=1;
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let text = textInput.value;
  let amount = Number(amountInput.value);
  let idvalue=id++;
  if (text === "" || amount === 0) {
    alert("Please enter description and amount");
    return;
  }

  let transaction = { idvalue ,text, amount };
  transactions.push(transaction);
  addTransactionToList(transaction);
  updateBalance();
  textInput.value = "";
  amountInput.value = "";
});

function renderTransactions() {
  listEl.innerHTML = "";
  transactions.forEach(addTransactionToList);
  updateBalance();
}

function addTransactionToList(transaction) {
  let li = document.createElement("li");
  li.className = transaction.amount > 0 ? "plus" : "minus";
  li.innerHTML = `
    ${transaction.text} : ₹${transaction.amount}
    <button class="delete-btn" style='color:red;font-weight:bold;' onclick="deleteTransaction(${transaction.idvalue})">X</button>
  `;
  listEl.appendChild(li);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.idvalue !== id);
  renderTransactions();
}

function updateBalance() {
  let income = 0;
  let expense = 0;

  transactions.forEach(
    t => 
      {
        if (t.amount > 0) {
          income += t.amount;
        } else {
          expense += t.amount;
        }
  });

  let total = income + expense;

  balanceEl.innerText = `Balance: ₹${total}`;
  incomeEl.innerText = `Income: ₹${income}`;
  expenseEl.innerText = `Expense: ₹${Math.abs(expense)}`;
}
