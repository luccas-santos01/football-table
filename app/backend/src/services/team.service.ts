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

  static async getHomeTeamStats() {
    const teams = await this.getAllTeams();

    let teamStats: TeamStat[] = await Promise.all(teams.map(async (team) => {
      const matchesData = await Matches.findAll({
        where: {
          homeTeamId: team.id,
          inProgress: false,
        },
      });

      const stats = new TeamStats(matchesData, team.teamName, 'homeTeamId');

      return {
        ...stats,
      };
    }));

    teamStats = sortTeamStats(teamStats);

    return teamStats;
  }

  static async getAwayTeamStats() {
    const teams = await this.getAllTeams();

    let teamStats: TeamStat[] = await Promise.all(teams.map(async (team) => {
      const matchesData = await Matches.findAll({
        where: {
          awayTeamId: team.id,
          inProgress: false,
        },
      });

      const stats = new TeamStats(matchesData, team.teamName, 'awayTeamId');

      return {
        ...stats,
      };
    }));

    teamStats = sortTeamStats(teamStats);

    return teamStats;
  }

  static calculateEfficiency(totalGames: number, totalPoints: number): string {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  static async getTotalTeamStats(): Promise<TeamStat[]> {
    return sortTeamStats(this.combineTeamStats(
      await this.getHomeTeamStats(),
      await this.getAwayTeamStats(),
    ));
  }

  static combineTeamStats(homeTeamStats: TeamStat[], awayTeamStats: TeamStat[]): TeamStat[] {
    const teamMap = new Map<string, TeamStat>();

    const addStats = (team: TeamStat) => {
      const combined = teamMap.get(team.name) || this.initializeTeam(team.name);
      combined.totalPoints += team.totalPoints;
      combined.totalGames += team.totalGames;
      combined.totalVictories += team.totalVictories;
      combined.totalDraws += team.totalDraws;
      combined.totalLosses += team.totalLosses;
      combined.goalsFavor += team.goalsFavor;
      combined.goalsOwn += team.goalsOwn;
      combined.goalsBalance += team.goalsBalance;
      teamMap.set(team.name, combined);
    };

    [...homeTeamStats, ...awayTeamStats].forEach(addStats);

    return Array.from(teamMap.values()).map((team) => ({
      ...team,
      efficiency: this.calculateEfficiency(team.totalGames, team.totalPoints),
    }));
  }

  static initializeTeam(name: string): TeamStat {
    return {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0.00',
    };
  }
}

export default TeamsService;
