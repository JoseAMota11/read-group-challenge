import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route';
import { config } from './config/config';
import bookRouter from './routes/book.route';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', bookRouter);

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}/api/v1`);
});
