import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { LogOutDto } from './dto/logout.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signup(@Body() userRequest: UserDto) {
    return this.userService.createUser(userRequest);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('/logout')
  async logout(@Body() signOutDto: LogOutDto) {
    return this.userService.logout(signOutDto);
  }
}
