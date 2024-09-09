import { Injectable } from '@nestjs/common';
import { CreateBronDto } from './dto/create-bron.dto';
import { UpdateBronDto } from './dto/update-bron.dto';

@Injectable()
export class BronService {
  create(createBronDto: CreateBronDto) {
    return 'This action adds a new bron';
  }

  findAll() {
    return `This action returns all bron`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bron`;
  }

  update(id: number, updateBronDto: UpdateBronDto) {
    return `This action updates a #${id} bron`;
  }

  remove(id: number) {
    return `This action removes a #${id} bron`;
  }
}
