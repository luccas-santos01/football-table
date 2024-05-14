import { Request, Response } from 'express';
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
}

export default LoginController;
