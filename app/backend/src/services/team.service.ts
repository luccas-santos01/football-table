import Teams from '../database/models/teams.model';

class TeamsService {
  static getAllTeams() {
    return Teams.findAll();
  }

  static getTeamById(id: number) {
    return Teams.findByPk(id);
  }

  static createTeam(teamName: string) {
    return Teams.create({ teamName });
  }

  static updateTeam(id: number, teamName: string) {
    return Teams.update({ teamName }, { where: { id } });
  }

  static deleteTeam(id: number) {
    return Teams.destroy({ where: { id } });
  }
}

export default TeamsService;
