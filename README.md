# 🏦 Banking Backend System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Nodemailer-0078D4?style=for-the-badge&logo=gmail&logoColor=white" />
</p>

<p align="center">
  A high-integrity financial backend built with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>.<br/>
  Implements a <strong>Double-Entry Ledger</strong> and <strong>Idempotency</strong> to ensure financial accuracy and prevent duplicate transactions.
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Core Concepts](#-core-concepts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧾 Overview

The **Banking Backend System** is a production-grade REST API that simulates core banking operations. It goes far beyond simple CRUD by implementing real-world financial engineering principles — including atomic double-entry bookkeeping and idempotent transaction processing — making it suitable as a foundation for fintech applications.

---

## ✨ Key Features

- 🔐 **JWT Authentication** — Secure login, logout, and token blacklisting
- 🏦 **Account Management** — Create and manage bank accounts per user
- 💸 **Double-Entry Ledger** — Every transaction creates balanced debit/credit entries ensuring books never go out of sync
- 🔁 **Idempotency** — Duplicate transaction requests are safely detected and rejected using unique idempotency keys
- 📧 **Email Notifications** — Automated emails via Nodemailer for account events and transactions
- 🔒 **Middleware Guards** — Route-level authentication and idempotency validation
- 🗂️ **Token Blacklisting** — Invalidated JWTs are stored and blocked from reuse

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | JSON Web Tokens (JWT) |
| Email Service | Nodemailer |
| Environment | dotenv |

---

## 📁 Project Structure

```
Banking-Backend-System-Project/
│
├── src/
│   ├── config/          # Database connection & environment setup
│   ├── controllers/     # Business logic (Auth, Account, Transaction)
│   ├── middleware/      # Auth guards & Idempotency validators
│   ├── models/          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Account.js
│   │   ├── Transaction.js
│   │   ├── Ledger.js
│   │   └── Blacklist.js
│   ├── routes/          # API route definitions
│   └── utils/           # Helper utilities (email service, etc.)
│
├── server.js            # App entry point
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/simrankhan-coder/Banking-Backend-System-Project.git

# 2. Navigate into the project directory
cd Banking-Backend-System-Project

# 3. Install dependencies
npm install

# 4. Create your environment file
cp .env.example .env
# (Then fill in your values — see Environment Variables below)

# 5. Start the development server
npm start
```

The server will start on `http://localhost:5000` (or whichever port is set in your `.env`).

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📡 API Endpoints

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login and receive JWT | ❌ |
| POST | `/logout` | Logout and blacklist token | ✅ |

### 🏦 Account Routes — `/api/accounts`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create a new bank account | ✅ |
| GET | `/` | Get all accounts for current user | ✅ |
| GET | `/:id` | Get a specific account by ID | ✅ |

### 💸 Transaction Routes — `/api/transactions`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/deposit` | Deposit funds into an account | ✅ |
| POST | `/withdraw` | Withdraw funds from an account | ✅ |
| POST | `/transfer` | Transfer funds between accounts | ✅ |
| GET | `/:accountId` | Get transaction history for account | ✅ |

> All protected routes require the `Authorization: Bearer <token>` header.

---

## 🧠 Core Concepts

### Double-Entry Ledger

Every financial transaction creates **two entries** in the ledger: a **debit** on one side and a corresponding **credit** on the other. This ensures the accounting equation always balances and provides an immutable audit trail for every rupee that moves through the system.

```
Deposit ₹1000 into Account A:
  → DEBIT  : Cash/External  ₹1000
  → CREDIT : Account A      ₹1000
```

### Idempotency

To prevent double-charging or duplicate processing (e.g., from network retries), clients send a unique `Idempotency-Key` header with each transaction request. The server stores processed keys and returns the cached result for any duplicate request — without re-executing the operation.

```
First request  (key: "abc-123") → Processes transaction ✅
Second request (key: "abc-123") → Returns cached result 🔁 (no duplicate charge)
```

### Token Blacklisting

On logout, the JWT is stored in a `Blacklist` collection. All protected routes check against this list, ensuring that stolen or old tokens cannot be reused after a user logs out.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# 1. Fork the project
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please follow conventional commit messages and keep PRs focused on a single feature or fix.

---

## 👩‍💻 Author

**Simran Khan**
- GitHub: [@simrankhan-coder](https://github.com/simrankhan-coder)

---

<p align="center">
  Made with ❤️ and Node.js — <em>Banking, but make it backend.</em>
</p>
