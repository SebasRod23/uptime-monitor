import emailjs from 'emailjs-com';

import { SendEmailData } from '../types/types';

export const SendEmail = (sendEmailData: SendEmailData) => {
  emailjs
    .send(
      'service_80idy7g',
      'template_r20vjiy',
      sendEmailData,
      'user_jWT1rM8CkwdpMrmMWTDLE',
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
};
