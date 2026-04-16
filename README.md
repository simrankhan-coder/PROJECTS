Advanced Banking Backend System
A high-integrity financial backend built with Node.js, Express, and MongoDB. This system goes beyond simple CRUD operations by implementing a Double-Entry Ledger and Idempotency to ensure financial accuracy and prevent duplicate transactions.


├── config/             # Database connection & Env setup

├── controllers/        # Business logic (Transaction, Account, Auth)

├── middleware/         # Auth guards & Idempotency validators

├── models/             # Mongoose Schemas (User, Account, Transaction, Ledger, Blacklist)

├── routes/             # API Endpoints

└── utils/              # Email service (Nodemailer)
