import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

interface IUserTokensRepositoy {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}

export default IUserTokensRepositoy;
