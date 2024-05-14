import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET não está definido.');
  }
  return secret;
}

class TokenService {
  static async validateToken(token: string) {
    const secret = getSecret();
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'object' && 'role' in decoded) {
      return (decoded as JwtPayload).role;
    }

    throw new Error('Token inválido.');
  }
}

export default TokenService;
