import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/team.service';

const validateMatchTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeamExists = await TeamsService.getTeamById(homeTeamId);
  const awayTeamExists = await TeamsService.getTeamById(awayTeamId);

  if (!homeTeamExists || !awayTeamExists) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatchTeams;
