interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  ses: {
    apiVersion: string;
    region: string;
  };
}

const MailConfig: IMailConfig = {
  driver: process.env.MAIL_DRIVER as 'ses' | 'ethereal',
  defaults: {
    from: {
      email: process.env.MAIL_FROM,
      name: process.env.MAIL_NAME,
    },
  },
  ses: {
    apiVersion: process.env.AWS_SES_API_VERSION,
    region: process.env.AWS_SES_REGION,
  },
};

export default MailConfig;
