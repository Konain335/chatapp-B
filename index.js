import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './DB/dbConnect.js';
import authRouter from './Route/authUser.js';
import messageRouter from './Route/messageRoute.js';
import cookieParser from 'cookie-parser';
import userRouter from './Route/userRoute.js';
import path from 'path';

import { app, server } from './Socket/socket.js';

//Deploy ky liya package hai path.
const __dirname = path.resolve();

// load environment variables.
dotenv.config();


// middleware to parse JSON requests.
app.use(express.json());
app.use(cookieParser());

// connect database first.
dbConnect();


// routes.
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// line 13 Server static files from the React frontend app.
app.use(express.static(path.join(__dirname, "/F/dist")));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "F", "dist", "index.html"));
});

//config port .env file
const PORT = process.env.PORT;

// start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;
