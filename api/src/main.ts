import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './setupSwagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    //configuracao de CORS
    app.enableCors({
      origin: '*',
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    // configuracao do swagger
    setupSwagger(app);

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Error starting server', error);
  }
}

bootstrap().catch((error) => {
  console.error('Unhandled error in bootstrap', error);
});
