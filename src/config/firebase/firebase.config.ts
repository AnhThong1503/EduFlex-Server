import { FirebaseConfigDto } from './dto/firebase.config.dto';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';

dotenv.config();

export function validateFirebaseConfig() {
  const FirebaseConfig = new FirebaseConfigDto();
  FirebaseConfig.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
  FirebaseConfig.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
  FirebaseConfig.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;

  const errors = validateSync(FirebaseConfig);

  if (errors.length > 0) {
    const errorMessages = errors.map((error) =>
      Object.values(error.constraints).join(', '),
    );
    throw new Error(
      `Firebase configuration validation failed: \n${errorMessages.join('\n')}`,
    );
  }

  return FirebaseConfig;
}
