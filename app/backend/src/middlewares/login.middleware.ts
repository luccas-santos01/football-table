import { Request, Response, NextFunction } from 'express';

export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}

export function validateLoginMiddleware(req: Request, res: Response, next: NextFunction) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{6,}$/;

  const { email, password } = req.body;

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
