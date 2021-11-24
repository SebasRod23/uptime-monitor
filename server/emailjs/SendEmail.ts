import nodemailer from 'nodemailer';

import { SendEmailData } from './types';
import config from '../config/config';

export const SendEmail = async (sendEmailData: SendEmailData) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });

  var mailOptions = {
    from: 'uptime.monitor.tec@gmail.com',
    to: sendEmailData.to_email,
    subject: 'Uptime Monitor Alert',
    text: `Hello ${sendEmailData.to_name},

We detected that this server is currently down (${sendEmailData.date}):

${sendEmailData.message}

Uptime Monitor,
Kevin Torres Martínez - A01656257
Juan Sebastián Rodríguez Galarza - A01656159`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
