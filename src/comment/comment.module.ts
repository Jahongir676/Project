import { Car } from './../car/entities/car.entity';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Car])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
