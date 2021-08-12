import { MessagesModule } from './messages/messages.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(3000);
  console.log("listening on port 3000")
}
bootstrap();
