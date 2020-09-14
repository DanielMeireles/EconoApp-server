import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUsersByIdDTO from '@modules/users/dtos/IFindUsersByIdDTO';
import IFindUsersByEmailDTO from '@modules/users/dtos/IFindUsersByEmailDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(data: IFindUsersByIdDTO): Promise<User | undefined>;
  findByEmail(data: IFindUsersByEmailDTO): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export default IUsersRepository;
