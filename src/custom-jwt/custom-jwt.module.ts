import { Module } from '@nestjs/common';
import { CustomJwtService } from './custom-jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
  ],
  controllers: [CustomJwtService],
  providers: [CustomJwtService],
})
export class CustomJwtModule {}
