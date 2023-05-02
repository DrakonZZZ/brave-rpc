import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT || process.env.API_PORT;
const app = express();
const server = http.createServer(app);

//middlewares

app.use(express.json()); // request will be turned into json format
app.use(cors()); // for local browser conflict

app.use('/api/auth', authRoutes);

try {
  const connect = mongoose.connect(process.env.MONGO_URI).then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  });
} catch (err) {
  console.log('DB connection failed');
  console.error(err);
}
