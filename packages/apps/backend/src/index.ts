import express from 'express';
import cors from 'cors';

import { errorMiddlewareHandler } from './middlewares/error.middleware';
import apiRouter from './router';

export const app = express();
export const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running smoothly!' });
});

app.use(apiRouter)
app.use(errorMiddlewareHandler)

app.listen(PORT, () => {
  console.log(`Server is floating on http://localhost:${PORT}`);
});
