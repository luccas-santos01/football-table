import Matches from '../database/models/matches.model';
import TeamStats, { sortTeamStats, TeamStat } from '../utils/teamStats';
import Teams from '../database/models/teams.model';

class TeamsService {
  static getAllTeams() {
    return Teams.findAll();
  }

  static getTeamById(id: number) {
    return Teams.findByPk(id);
  }

  static async getTeamStats() {
    const teams = await this.getAllTeams();

    let teamStats: TeamStat[] = await Promise.all(teams.map(async (team) => {
      const matchesData = await Matches.findAll({
        where: {
          homeTeamId: team.id,
          inProgress: false,
        },
      });

      const stats = new TeamStats(matchesData, team.teamName);

      return {
        ...stats,
      };
    }));

    teamStats = sortTeamStats(teamStats);

    return teamStats;
  }
}

export default TeamsService;
