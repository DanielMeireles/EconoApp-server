import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IGenerateUserTokenDTO from '@modules/users/dtos/IGenerateUserTokenDTO';
import IFindUserTokensByTokenDTO from '@modules/users/dtos/IFindUserTokensByTokenDTO';

interface IUserTokensRepositoy {
  generate(data: IGenerateUserTokenDTO): Promise<UserToken>;
  findByToken(data: IFindUserTokensByTokenDTO): Promise<UserToken | undefined>;
}

export default IUserTokensRepositoy;
