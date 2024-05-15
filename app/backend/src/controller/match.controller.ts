import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const matches = await MatchesService.getAllMatches();
    if (!matches) {
      return res.status(500).json({ message: 'Erro ao exibir partidas' });
    }
    return res.status(200).json(matches);
  }

  static async getMatchesInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchesService.getMatchesInProgress(inProgress as string);
    if (!matches) {
      return res.status(500).json({ message: 'Erro ao exibir partidas' });
    }
    return res.status(200).json(matches);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await MatchesService.finishMatch(id);
    if (!match) {
      return res.status(500).json({ message: 'Erro ao finalizar partida' });
    }
    return res.status(200).json(match);
  }
}

export default MatchesController;
