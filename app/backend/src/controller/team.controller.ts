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

  static async getHomeTeamStats(req: Request, res: Response) {
    try {
      const teamStats = await TeamsService.getHomeTeamStats();
      return res.status(200).json(teamStats);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao exibir estatísticas das equipes' });
    }
  }

  static async getAwayTeamStats(req: Request, res: Response) {
    try {
      const teamStats = await TeamsService.getAwayTeamStats();
      return res.status(200).json(teamStats);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao exibir estatísticas das equipes' });
    }
  }
}

export default TeamsController;
