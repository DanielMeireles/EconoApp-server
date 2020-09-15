import User from '@modules/users/infra/typeorm/entities/User';

interface IAuthenticateUserResponseDTO {
  user: User;
  token: string;
}

export default IAuthenticateUserResponseDTO;
