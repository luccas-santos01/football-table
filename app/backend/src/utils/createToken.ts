import * as jwt from 'jsonwebtoken';

type User = {
  id: number;
  role: string;
};

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET não está definido');
}

const createToken = (user: User) => jwt.sign({ id: user.id, role: user.role }, secret);

export default createToken;
