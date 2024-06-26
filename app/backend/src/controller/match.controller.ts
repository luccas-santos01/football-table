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

    try {
      const match = await MatchesService.finishMatch(id);
      if (!match) {
        return res.status(500).json({ message: 'Erro ao finalizar partida' });
      }
      return res.status(200).json(match);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao finalizar partida' });
    }
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const match = await MatchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json(match);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar partida' });
    }
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const match = await MatchesService
        .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
      return res.status(201).json(match);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar partida' });
    }
  }

  static handleMatchesRequest(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      MatchesController.getMatchesInProgress(req, res);
    } else {
      MatchesController.getAllMatches(req, res);
    }
  }
}

export default MatchesController;
