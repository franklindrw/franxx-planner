import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

const password = process.env.SWAGGER_PASSWORD as string;

export const setupSwagger = (app: INestApplication) => {
  // Configuração de autenticação
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: { franxx_admin: password },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Franxx Plann.er API')
    .setDescription('API para gerenciamento de tarefas pessoais')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Franklin Campos',
      'http://linkedin.com/in/franklindrw',
      'franklindrw@gmail.com',
    )
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
};
