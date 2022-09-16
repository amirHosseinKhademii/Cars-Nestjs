import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const hasher = async (password: string, salt) =>
  (await scrypt(password, salt, 32)) as Buffer;

export const encrypter = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const hash = await hasher(password, salt);
  return salt + '.' + hash.toString('hex');
};
