import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { notesRoutes } from './routes/notesRoutes.js';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const bootstrap = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

bootstrap();
