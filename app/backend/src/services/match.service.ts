import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

class MatchesService {
  static getAllMatches() {
    return Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
  }

  static getMatchesInProgress(inProgress: string) {
    return Matches.findAll({
      where: {
        inProgress: inProgress === 'true',
      },
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
  }

  static async finishMatch(id: string) {
    const match = await Matches.findOne({ where: { id } });

    if (!match) {
      throw new Error('Match not found');
    }

    match.inProgress = false;
    await match.save();

    return { message: 'Finished' };
  }
}

export default MatchesService;
