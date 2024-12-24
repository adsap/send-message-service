import express, { Application } from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.route';
import { AppDataSource } from './config/database.config';
import NotFoundError from './errors/not-found.error';
import { ERROR_MESSAGES } from './constants/response.constant';

export default class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.initializeDatabase();
  }

  private config(): void {
    this.app.use(cors({ credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use('/api/user', userRoutes);
    this.app.all('*', (_req, _res, next) => {
      const error = new NotFoundError(ERROR_MESSAGES.ENDPOINT_NOT_FOUND);
      next(error);
    });
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.error('Database initialization failed:', error);
      process.exit(1);
    }
  }

  public start(port: number): void {
    this.app.use(errorMiddleware);
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
