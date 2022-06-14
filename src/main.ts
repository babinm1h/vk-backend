import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  const PORT = process.env.PORT || 7777
  app.enableCors({
    origin: 'https://vk-frontend-hkygj54ip-babinm1h.vercel.app',
    credentials: true
  })
  app.use(session({
    secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(PORT, () => console.log(`started ${PORT}`));
}


bootstrap();
