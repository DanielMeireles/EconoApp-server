interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

const AuthConfig: IAuthConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: process.env.APP_EXPIRES_IN || '1d',
  },
};

export default AuthConfig;
