import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(params: {
    subject: string;
    template: string;
    receiver: string;
    context: ISendMailOptions['context'];
  }) {
    try {
      const sendMailParams: ISendMailOptions = {
        to: params.receiver,
        from: this.configService.get<string>('MAIL_FROM'),
        subject: params.subject,
        template: params.template,
        context: params.context,
      };

      const response = await this.mailerService.sendMail(sendMailParams);
      this.logger.log(
        `Email sent successfully to recipients with the following parameters : ${JSON.stringify(
          sendMailParams,
        )}`,
        response,
      );
    } catch (error) {
      this.logger.error(
        `Error while sending mail with the following parameters : ${JSON.stringify(
          params,
        )}`,
        error,
      );
    }
  }
}
