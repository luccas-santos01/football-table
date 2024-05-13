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

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getTeamById(Number(id));
    if (!team) {
      return res.status(500).json({ message: 'Erro ao exibir equipe' });
    }
    return res.status(200).json(team);
  }
}

export default TeamsController;
