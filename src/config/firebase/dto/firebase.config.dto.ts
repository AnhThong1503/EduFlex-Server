import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class FirebaseConfigDto {
  @IsString()
  @IsNotEmpty()
  FIREBASE_PROJECT_ID: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/-----BEGIN PRIVATE KEY-----[\s\S]+-----END PRIVATE KEY-----/, {
    message: 'Invalid private key format',
  })
  FIREBASE_PRIVATE_KEY: string;

  @IsEmail()
  @IsNotEmpty()
  FIREBASE_CLIENT_EMAIL: string;
}
