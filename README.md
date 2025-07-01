📱 Expense Tracker App

A sleek, intuitive React Native application to track your income and expenses, visualize your spending habits, and manage your personal finances with ease.

🚀 Features

💼 Core Functionality

Add Income/Expense Transactions with:

Amount

Category (customizable)

Type (Income / Expense)

Date

Optional Description

Real-time Transaction Logs with automatic refresh across all screens

Transaction Delete Feature – synced across Home, Logs, and Overview screens

📊 Visual Insights

Home Screen:

Current balance summary

Animated card-style transaction list

Stylish dark/light toggle support

Overview Screen:

Income vs Expense Bar Chart

Toggle to filter logs by type

Net savings highlight

Logs Screen:

All transactions listed by date with clear formatting

🔔 Notifications & Tips

Get financial tips like saving strategies

Red dot appears on bell icon when unread

👤 Profile & Customization

Editable Settings/Profile screen

Sidebar Drawer with:

Profile, Wallet, Logs, Help, Privacy Policy, About

Dark/Light mode toggle

🖼️ Custom App Icon

Personalized Android launcher icon for a polished branding experience

🛠️ Tech Stack

Frontend: React Native, TypeScript

Backend: Node.js, Express

Database: MongoDB

Charts: react-native-chart-kit

Navigation: React Navigation Stack + Drawer

Icons: Ionicons + Lucide

Local Storage: AsyncStorage

📦 Folder Structure (Frontend)

frontend/ExpenseApp
├── assets/               # App icon and images
├── components/           # Reusable UI components
├── screens/              # Home, Overview, Logs, Profile, etc.
├── context/              # Auth context
├── services/             # API calls (transactions.ts)
├── types.ts              # Shared TS types
└── App.tsx               # Root app setup

📲 Setup Instructions

Prerequisites

Node.js 18+

React Native CLI

Android Studio (for emulator)

MongoDB + Express backend running locally at http://10.0.2.2:5000

Run the App

cd frontend/ExpenseApp
npm install
npx react-native run-android

🙌 Acknowledgements

Inspired by real-world personal finance tools

Designed and built by Saketh

📌 Screenshots

Add screenshots here once available: Home | Add Transaction | Overview | Logs | Tips

📄 License

This project is open-source and available under the MIT License.

💬 Feel free to contribute, fork, or raise issues if you'd like to collaborate or report bugs!
