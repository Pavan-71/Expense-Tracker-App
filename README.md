# Expense Tracker App

A simple and efficient React Native Expense Tracker app with a Node.js + Express backend and MongoDB database.  
Track your daily income and expenses, view summary pie charts, and manage your financial transactions with ease.

---

## Features

- Add, edit, and delete transactions (income/expense)
- View a detailed list of all transactions
- Visualize expenses and income distribution using a pie chart
- Date, category, and description support for transactions
- User-friendly interface with smooth navigation between screens
- Backend REST API built with Node.js, Express, and MongoDB

---

## Tech Stack

| Frontend                   | Backend                  | Database        |
| --------------------------|--------------------------|-----------------|
| React Native              | Node.js & Express.js      | MongoDB Atlas   |

---

## How It Works

1. **Add Transaction**  
   User enters amount, category, type (income/expense), date, and optional description, then submits. The app calls backend API to save the transaction in the MongoDB database.

2. **View Transactions**  
   The home screen fetches all transactions from the backend API and displays them in a scrollable list.

3. **Edit or Delete Transaction**  
   Tapping the three dots beside a transaction reveals options to edit or delete it. Edit opens a modal form; delete confirms and removes the transaction.

4. **Pie Chart Visualization**  
   Clicking the "View Pie Chart" button navigates to a separate screen. The app passes all transactions data, and the pie chart summarizes income vs expense categories using React Native chart libraries.

---
