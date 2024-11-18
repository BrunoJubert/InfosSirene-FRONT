import emailjs from '@emailjs/browser';

export const environment = {
  production: false,

  apiUrl: 'http://localhost:3000',

  emailjs: { 
    publicKey: 'EguBoN9u370DZlZ6n',
    serviceId: 'infos_sirene',
    autoReplyTemplateId: 'auto_reply',
    notificationTemplateId: 'notif_template',
  },

  recaptcha: {
    siteKey: '6LeLp2kqAAAAAHWorLGHuTn8eU4DMEZou8azk2Wk', 
  }
};



