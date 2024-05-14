import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/users.model';
import createToken from '../utils/createToken';

class LoginService {
  static async loginUser(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = createToken(user);

    return token;
  }
}

export default LoginService;
