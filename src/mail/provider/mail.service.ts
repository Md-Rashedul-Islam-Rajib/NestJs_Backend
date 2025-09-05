import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {


    constructor(
        private readonly mailerService: MailerService
    ){}

    public async sendUserWelcome(user: User): Promise<void>{
        await this.mailerService.sendMail({
            to: user.email,
            from: 'support@nestjs.com',
            subject: "Welcome to nestjs",
            template: '/welcome',
            context: {
                name: user.name,
                email: user.email,
                loginURL: 'http://localhost:3000'
            }
        })
    }
}
