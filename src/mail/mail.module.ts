/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Global, Module } from '@nestjs/common';
import { MailService } from './provider/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import {EjsAdapter} from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('appConfig.mailHost'),
          secure: false,
          port: 2525,
          auth: {
            user: config.get('appConfig.smtpUserName'),
            pass: config.get('appConfig.smtpPassword'),
          }
        },

        defaults: {
          from: `<no-reply@nestjs.com>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({
            inlineCssEnabled:true
          }),
          options: {
            strict: false
          }
        }
      })
    })
  ]

})
export class MailModule {




}
