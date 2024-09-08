import { env } from 'process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.PG_HOST,
      port: +env.PG_PORT,
      username: env.PG_USER,
      password: env.PG_PASSWORD,
      database: env.PG_DB,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Use only in development
      logging: false,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
