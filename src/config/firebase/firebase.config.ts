import { FirebaseConfigDto } from './dto/firebase.config.dto';
import * as dotenv from 'dotenv';

dotenv.config();

export const firebaseConfig = new FirebaseConfigDto();
