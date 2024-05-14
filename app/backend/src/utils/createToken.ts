import * as jwt from 'jsonwebtoken';

type User = {
  id: number;
  role: string;
};

const secret = 'jwt_secret';

if (!secret) {
  throw new Error('JWT_SECRET não está definido');
}

const createToken = (user: User) => jwt.sign({ id: user.id, role: user.role }, secret);

export default createToken;
