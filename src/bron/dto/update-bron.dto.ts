import { PartialType } from '@nestjs/swagger';
import { CreateBronDto } from './create-bron.dto';

export class UpdateBronDto extends PartialType(CreateBronDto) {}
