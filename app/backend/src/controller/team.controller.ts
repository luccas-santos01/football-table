import { Request, Response } from 'express';
import TeamsService from '../services/team.service';

class TeamsController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamsService.getAllTeams();
    if (!teams) {
      return res.status(500).json({ message: 'Erro ao exibir equipes' });
    }
    return res.status(200).json(teams);
  }
}

export default TeamsController;
