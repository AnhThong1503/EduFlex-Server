import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseAdmin } from '../../config/firebase/firebase.setup';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { LogOutDto } from './dto/logout.dto';

@Injectable()
export class UserService {
  private firebaseApiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly admin: FirebaseAdmin,
    private readonly httpService: HttpService,
  ) {
    this.firebaseApiKey = this.configService.get<string>('FIREBASE_API_KEY');
  }

  async createUser(userRequest: UserDto): Promise<any> {
    const { email, password, firstName, lastName, role } = userRequest;
    const app = this.admin.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { role });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(payload: LoginDto): Promise<any> {
    const { email, password } = payload;

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`,
          {
            email,
            password,
            returnSecureToken: true,
          },
        ),
      );

      const { idToken } = response.data;

      const decodedToken = await this.admin
        .setup()
        .auth()
        .verifyIdToken(idToken);
      const user = await this.admin.setup().auth().getUser(decodedToken.uid);

      return {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        idToken,
      };
    } catch (error) {
      throw new BadRequestException(
        'Authentication failed. Please check your credentials.',
      );
    }
  }

  async logout(
    signOutDto: LogOutDto,
  ): Promise<{ message: string; status: string; timestamp: string }> {
    const { uid } = signOutDto;

    try {
      await this.admin.setup().auth().revokeRefreshTokens(uid);
      return {
        message: 'User signed out successfully.',
        status: 'success',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to sign out user.',
        status: 'error',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
