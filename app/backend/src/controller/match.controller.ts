import { Request, Response } from 'express';
import ShowMatchesService from '../services/match.service';

class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const matches = await ShowMatchesService.getAllMatches();
    if (!matches) {
      return res.status(500).json({ message: 'Erro ao exibir partidas' });
    }
    return res.status(200).json(matches);
  }
}

export default MatchesController;
