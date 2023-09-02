// import { Injectable } from '@nestjs/common';
// import { credential, initializeApp } from 'firebase-admin';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class FirebaseService {
//   constructor(private readonly configService: ConfigService) {}

//   public static initFirebase() {
//     const firebaseCredentials = JSON.parse(this.configService.get<string>('firebase.creds'));
//     initializeApp({
//       credential: credential.cert(firebaseCredentials),
//       databaseURL: this.configService.get<string>('firebase.database.url'),
//     });
//   }
// }
