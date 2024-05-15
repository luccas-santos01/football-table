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

  static async getMatchesInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await ShowMatchesService.getMatchesInProgress(inProgress as string);
    if (!matches) {
      return res.status(500).json({ message: 'Erro ao exibir partidas' });
    }
    return res.status(200).json(matches);
  }
}

export default MatchesController;
