import { Request, Response } from 'express';
import TokenService from '../services/token.service';
import LoginService from '../services/login.service';

class LoginController {
  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await LoginService.loginUser(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  static async validateToken(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (!authHeader.includes(' ')) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const userRole = await TokenService.validateToken(token);
      return res.status(200).json({ role: userRole });
    } catch (err) {
      if (err instanceof Error && err.message === 'Token inválido.') {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
    }
  }
}

export default LoginController;
