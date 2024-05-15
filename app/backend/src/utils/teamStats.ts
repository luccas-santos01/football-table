interface Match {
  points: number;
  result: 'win' | 'draw' | 'loss';
  goalsFavor: number;
  goalsOwn: number;
}

interface MatchData {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export type TeamStat = {
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
  name: string;
};

function calculateMatchOutcome(homeTeamGoals: number, awayTeamGoals: number): Match {
  let points: number;
  let result: 'win' | 'draw' | 'loss';

  if (homeTeamGoals > awayTeamGoals) {
    points = 3;
    result = 'win';
  } else if (homeTeamGoals === awayTeamGoals) {
    points = 1;
    result = 'draw';
  } else {
    points = 0;
    result = 'loss';
  }

  return {
    points,
    result,
    goalsFavor: homeTeamGoals,
    goalsOwn: awayTeamGoals,
  };
}

export default class TeamStats {
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
  name: string;

  constructor(matchesData: MatchData[], teamName: string) {
    const matches: Match[] = matchesData.map((matchData) =>
      calculateMatchOutcome(matchData.homeTeamGoals, matchData.awayTeamGoals));
    this.name = teamName;
    this.totalPoints = matches.reduce((sum, match) => sum + match.points, 0);
    this.totalGames = matches.length;
    this.totalVictories = matches.filter((match) => match.result === 'win').length;
    this.totalDraws = matches.filter((match) => match.result === 'draw').length;
    this.totalLosses = matches.filter((match) => match.result === 'loss').length;
    this.goalsFavor = matches.reduce((sum, match) => sum + match.goalsFavor, 0);
    this.goalsOwn = matches.reduce((sum, match) => sum + match.goalsOwn, 0);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }
}

export function sortTeamStats(teamStats: TeamStats[]): TeamStat[] {
  return teamStats.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    return b.goalsFavor - a.goalsFavor;
  });
}
