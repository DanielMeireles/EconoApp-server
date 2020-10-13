interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'generic';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  generic: {
    host: string;
    port: number;
    ssl: boolean;
    tls: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  ses: {
    apiVersion: string;
    region: string;
  };
}

const MailConfig: IMailConfig = {
  driver: process.env.MAIL_DRIVER as 'ses' | 'ethereal' | 'generic',
  defaults: {
    from: {
      email: process.env.MAIL_FROM,
      name: process.env.MAIL_NAME,
    },
  },
  generic: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    ssl: process.env.MAIL_SSL,
    tls: process.env.MAIL_TLS,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  ses: {
    apiVersion: process.env.AWS_SES_API_VERSION,
    region: process.env.AWS_SES_REGION,
  },
};

export default MailConfig;
