import nodemailer from "nodemailer";
import envVars from "@shared/env-vars";

interface IAttachments {
  filename: string,
  path: string,
  contentType: string
}

class Mailer {
  private transport = nodemailer.createTransport({
    host: envVars.mailer.mailtrap.host,
    port: +envVars.mailer.mailtrap.port,
    secure:false,
    auth: envVars.mailer.mailtrap.auth
  });

  async mail(to: string, subject: string, html: string, attachments: IAttachments[] = [], cc : string | null = null, bcc : string | null = null) {
    let options : any =  {
      from: envVars.mailer.from,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments,
    }
    // if(cc){
    //   options.cc = cc;
    // }
    // if(bcc){
    //   options.bcc = bcc;
    // }
    // console.log(options)
    this.transport.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

export default new Mailer();