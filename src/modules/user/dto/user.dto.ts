import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  INS = 'INSTRUCTOR',
}

export class UserDto {
  @ApiProperty({ description: "The user's email" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "The user's password" })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({ description: "The user's first name" })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @ApiProperty({ description: "The user's last name" })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  @ApiProperty({ description: "The user's phone number" })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: "The user's role" })
  @IsNotEmpty()
  @IsEnum(Role, { each: true })
  role: Role[];
}
