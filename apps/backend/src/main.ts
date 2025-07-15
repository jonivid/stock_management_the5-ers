import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.BACKEND_PORT || 3000;
  const host = process.env.BIND_HOST;

  if (host) {
    await app.listen(port, host);
    console.log(`Backend running on http://${host}:${port}`);
  } else {
    await app.listen(port);
    console.log(`Backend running on port ${port} (all interfaces)`);
  }
}
bootstrap();
