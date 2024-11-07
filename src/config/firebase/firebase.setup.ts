import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { validateFirebaseConfig } from './firebase.config';
let app: admin.app.App = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  private initializeFirebase() {
    const FirebaseConfig = validateFirebaseConfig();

    const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } =
      FirebaseConfig;

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        privateKey: FIREBASE_PRIVATE_KEY,
        clientEmail: FIREBASE_CLIENT_EMAIL,
      }),
    });
  }

  async onApplicationBootstrap() {
    if (!app) {
      app = this.initializeFirebase();
    }
  }

  setup() {
    return app;
  }
}
