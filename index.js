import { config } from 'dotenv';
config(); // 1. Load the .env file immediately

import express from 'express';
// 2. Import your DB connection AFTER config()
import { DB_Connection } from './src/DB/Connection.js'; 
import * as AllRouters from './src/Modules/index.routes.js';

const app = express();
app.use(express.json());

// Register routes
app.use('/user', AllRouters.userRouter);
app.use('/auth', AllRouters.AuthRouter);
app.use('/message', AllRouters.MsgRouter);

// 3. Call the connection
DB_Connection();

app.listen(process.env.PORT || 7000, () => {
    console.log(`APP Server is Running on port ${process.env.PORT || 7000}`);
});