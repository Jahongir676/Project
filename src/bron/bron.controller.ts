import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BronService } from './bron.service';
import { CreateBronDto } from './dto/create-bron.dto';
import { UpdateBronDto } from './dto/update-bron.dto';

@Controller('bron')
export class BronController {
  constructor(private readonly bronService: BronService) {}

  @Post()
  create(@Body() createBronDto: CreateBronDto) {
    return this.bronService.create(createBronDto);
  }

  @Get()
  findAll() {
    return this.bronService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bronService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBronDto: UpdateBronDto) {
    return this.bronService.update(+id, updateBronDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bronService.remove(+id);
  }
}
