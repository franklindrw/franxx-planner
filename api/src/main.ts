import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { setupSwagger } from './shared/swagger/setupSwagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    //configuracao de CORS
    app.enableCors({
      origin: '*',
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    // configuracao do swagger
    setupSwagger(app);

    // configuracao de proxy para identificar o ip do usuario
    app.set('trust proxy', true);

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Error starting server', error);
  }
}

bootstrap().catch((error) => {
  console.error('Unhandled error in bootstrap', error);
});
