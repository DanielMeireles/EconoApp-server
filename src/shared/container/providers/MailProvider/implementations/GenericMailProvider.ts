import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import ora from 'ora';

import mailConfig from '@config/mail';
import ISendMailDto from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@injectable()
export default class GenericMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const { host, port, ssl, tls, auth } = mailConfig.generic;

    this.client = nodemailer.createTransport({
      host,
      port,
      ssl,
      tls,
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
    } as SMTPTransport.Options);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDto): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || process.env.MAIL_NAME,
        address: from?.email || process.env.MAIL_FROM,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    ora(`Message sent: ${message.messageId}`).succeed();
    ora(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`).succeed();
  }
}
