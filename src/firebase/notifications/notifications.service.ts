// import { Injectable } from '@nestjs/common';
// import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
// import { credential, initializeApp, messaging } from 'firebase-admin';
// import { chunk } from 'lodash';
// import { Logger } from '../../global/logger/logger';
// import { FirebaseMessage } from './notifications.interfaces';
// import { FirebaseService } from '../firebase.service';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class NotificationService extends FirebaseService {
//   constructor(private readonly configService: ConfigService) {
//     super(configService);
//   }

//   public async sendFirebaseMessages(firebaseMessages: FirebaseMessage[], dryRun?: boolean): Promise<BatchResponse> {
//     const batchSize = 500;
//     const batchedFirebaseMessages = chunk(firebaseMessages, batchSize);

//     const batchResponses: BatchResponse[] = [];

//     for (const groupedFirebaseMessages of batchedFirebaseMessages) {
//       try {
//         const tokenMessages: messaging.TokenMessage[] = groupedFirebaseMessages.map(({ message, title, token }) => ({
//           notification: { body: message, title },
//           token,
//           apns: {
//             payload: {
//               aps: {
//                 'content-available': 1,
//               },
//             },
//           },
//         }));

//         const response = await this.sendAll(tokenMessages, dryRun);
//         batchResponses.push(response);
//       } catch (error) {
//         const failureResponse: BatchResponse = {
//           responses: groupedFirebaseMessages.map(() => ({
//             success: false,
//             error,
//           })),
//           successCount: 0,
//           failureCount: groupedFirebaseMessages.length,
//         };
//         batchResponses.push(failureResponse);
//       }
//     }

//     return batchResponses.reduce(
//       (accumulator, currentResponse) => {
//         return {
//           responses: accumulator.responses.concat(currentResponse.responses),
//           successCount: accumulator.successCount + currentResponse.successCount,
//           failureCount: accumulator.failureCount + currentResponse.failureCount,
//         };
//       },
//       {
//         responses: [],
//         successCount: 0,
//         failureCount: 0,
//       },
//     );
//   }

//   public async sendAll(messages: messaging.TokenMessage[], dryRun?: boolean): Promise<BatchResponse> {
//     if (process.env.NODE_ENV === 'local') {
//       for (const { notification, token } of messages) {
//         this.logger.debug(
//           `echo '{ "aps": { "alert": ${JSON.stringify(notification)}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`,
//           { service: 'Firebase' },
//         );
//       }
//     }
//     return messaging().sendAll(messages, dryRun);
//   }
// }
