import { SendMailOptions, createTransport, Transporter } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import config from '../config/config';
import { Logger } from '../global/logger/logger';
import { NodemailerService } from '../config/enums';

@Injectable()
export class MailService {
  private transporter: Transporter;

  public constructor(private readonly logger: Logger) {
    this.transporter = createTransport({
      service: NodemailerService.GMAIL,
      auth: { user: config().nodemailer.user, pass: config().nodemailer.pass },
    });
  }

  public sendMail = (mailOptions: SendMailOptions) => {
    this.transporter.sendMail(mailOptions, () => {
      this.logger.debug(`Email sent with the following options: ${JSON.stringify(mailOptions)}`, { origin: 'email' });
    });
  };
}
