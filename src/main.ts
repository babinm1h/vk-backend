import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from "express-session"
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 7777
  app.setGlobalPrefix("api")
  app.use(session({
    secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(PORT, () => console.log(`started ${PORT}`));
}


bootstrap();
