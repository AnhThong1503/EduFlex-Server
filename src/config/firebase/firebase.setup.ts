import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

let app: admin.app.App = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}

  async onApplicationBootstrap() {
    if (!app) {
      const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
      const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');
      const clientEmail = this.configService.get<string>(
        'FIREBASE_CLIENT_EMAIL',
      );

      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
    }
  }

  setup() {
    return app;
  }
}
