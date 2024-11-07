import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdmin } from './config/firebase/firebase.setup';
import { AppController } from './app.controller';
import { ValidateEnv } from './config/env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: ValidateEnv,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [FirebaseAdmin],
})
export class AppModule {}
