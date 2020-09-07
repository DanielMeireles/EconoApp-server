interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  comapreHash(payload: string, hashed: string): Promise<boolean>;
}

export default IHashProvider;
