import './workers/birthday.worker';
import App from './app';
import { BirthdayScheduler } from './schedulers/birthday.scheduler';

async function bootstrap() {
  const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const app = new App();
  app.start(PORT);

  const birthdayScheduler = new BirthdayScheduler();
  birthdayScheduler.start();

  console.log('Application has started');
}

bootstrap().catch((err) => {
  console.error('Error during application startup:', err);
});
