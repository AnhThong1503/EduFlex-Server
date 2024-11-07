import { Controller, Get } from '@nestjs/common';
import { Auth } from './decorators/auth.decorator';

@Controller()
export class AppController {
  @Get('/admin')
  @Auth('ADMIN')
  goodMorning() {
    return 'Hello Admin!';
  }

  @Get('/instructor')
  @Auth('INSTRUCTOR')
  goodAfternoon() {
    return 'Hello Instructor!';
  }

  @Get('/')
  goodEvening() {
    return 'Hello User!';
  }
}
