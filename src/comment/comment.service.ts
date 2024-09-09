import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Car } from '../car/entities/car.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Car) private carRepo: Repository<Car>,
  ) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto) {
    const { userId, carId } = createCommentDto;

    // Check if the user and car exist
    const user = await this.userRepo.findOneBy({ id: userId });
    const car = await this.carRepo.findOneBy({ id: carId });

    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi!`);
    }

    if (!car) {
      throw new NotFoundException(`Mashina topilmadi`);
    }

    // Create and save the comment
    const comment = this.commentRepo.create(createCommentDto);
    return await this.commentRepo.save(comment);
  }

  // Find all comments
  async findAll() {
    return await this.commentRepo.find({ relations: ['user', 'car'] });
  }

  async findOne(id: number) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['user', 'car'],
    });
    if (!comment) {
      throw new NotFoundException(`Bu Izoh topilmadi`);
    }
    return comment;
  }

  // Update an existing comment by ID
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Update the comment with new values
    Object.assign(comment, updateCommentDto);
    return await this.commentRepo.save(comment);
  }

  // Remove a comment by ID
  async remove(id: number) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Bunday izoh mavjud emas!`);
    }

    await this.commentRepo.remove(comment);
    return { message: `Comment with ID ${id} successfully removed` };
  }
}
