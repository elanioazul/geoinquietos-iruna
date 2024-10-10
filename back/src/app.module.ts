import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('logeandoooooooooooooooooooooooooooooooooooooooooo');
    console.log('logeandoooooooooooooooooooooooooooooooooooooooooo');

    console.log('Database Host:', process.env.DATABASE_HOST);
    console.log('Database Port:', process.env.DATABASE_PORT);
    console.log('Database User:', process.env.DATABASE_USER);
  }
}
