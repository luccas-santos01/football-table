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

  constructor(matchesData: MatchData[]) {
    const matches: Match[] = matchesData.map((matchData) =>
      calculateMatchOutcome(matchData.homeTeamGoals, matchData.awayTeamGoals));

    this.totalPoints = matches.reduce((sum, match) => sum + match.points, 0);
    this.totalGames = matches.length;
    this.totalVictories = matches.filter((match) => match.result === 'win').length;
    this.totalDraws = matches.filter((match) => match.result === 'draw').length;
    this.totalLosses = matches.filter((match) => match.result === 'loss').length;
    this.goalsFavor = matches.reduce((sum, match) => sum + match.goalsFavor, 0);
    this.goalsOwn = matches.reduce((sum, match) => sum + match.goalsOwn, 0);
  }
}
