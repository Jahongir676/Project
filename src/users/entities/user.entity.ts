import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  fname: string;

  @Column()
  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  lname: string;

  @Column()
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Password for the user account',
    example: 'P@ssw0rd!',
  })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'User birthday in YYYY-MM-DD format',
    example: '1990-01-01',
    type: String,
    format: 'date',
  })
  birthdate: Date;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'User region',
    example: 'Namangan',
    type: String,
  })
  region: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates if the user account is active',
    example: false,
  })
  is_active: boolean;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Refresh token for user authentication (optional)',
    example: 'refresh-token-value',
    required: false,
  })
  refreshtoken: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates if the user is a super admin',
    example: false,
  })
  is_super: boolean;
  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates if the user has admin privileges',
    example: true,
  })
  admin: boolean;
}
