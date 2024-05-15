import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

class ShowMatchesService {
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
}

export default ShowMatchesService;
