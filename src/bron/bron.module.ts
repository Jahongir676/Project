import { Module } from '@nestjs/common';
import { BronService } from './bron.service';
import { BronController } from './bron.controller';

@Module({
  controllers: [BronController],
  providers: [BronService],
})
export class BronModule {}
