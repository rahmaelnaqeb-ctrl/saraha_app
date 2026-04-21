# Saraha App (Backend) 

A private messaging application (Saraha-style) built with **Node.js**, **Express**, and **MongoDB**. This project focuses on backend architecture, security best practices, and RESTful API development.

##  Features
* **User Authentication:** Secure signup and login using JWT (JSON Web Tokens).
* **Anonymous Messaging:** Send and receive anonymous messages.
* **Database Management:** Integrated with MongoDB Atlas using Mongoose.
* **Security:** Sensitive data protected via Environment Variables (`.env`).
* **Real-time:** Built-in logic for scalable messaging.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas)
* **ORM:** Mongoose
* **Authentication:** JWT & Bcrypt (for password hashing)

##  Project Structure
```text
├── src
│   ├── DB/            # Database connection logic
│   ├── Modules/       # API routes and controllers (User, Message)
│   └── Middleware/    # Auth and validation middlewares
├── .env               # Environment Variables (Not uploaded to GitHub)
├── .gitignore         # Rules to ignore sensitive files
└── index.js           # Entry point
How to Run Locally
Clone the repository:

Bash
git clone [https://github.com/rahmaelnaqeb-ctrl/saraha_app.git](https://github.com/rahmaelnaqeb-ctrl/saraha_app.git)
Install dependencies:

Bash
npm install
Create a .env file and add your credentials:

Code snippet
MONGO_URI=your_mongodb_connection_string
PORT=3000
Start the server:

Bash
npm start
