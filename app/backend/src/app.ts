import * as express from 'express';
import 'express-async-errors';

import errorMiddleware from './middlewares/errorMiddleware';
import TeamsController from './controller/team.controller';
import { loginMiddleware, validateLoginMiddleware } from './middlewares/login.middleware';
import LoginController from './controller/login.controller';
import MatchesController from './controller/match.controller';
import validateMatchTeams from './middlewares/match.middleware';
import validateToken from './middlewares/validateToken.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.get('/teams', TeamsController.getAllTeams);
    this.app.get('/teams/:id', TeamsController.getTeamById);
    this.app.get('/login/role', LoginController.validateToken);
    this.app.get('/leaderboard/home', TeamsController.getHomeTeamStats);
    this.app.get('/leaderboard/away', TeamsController.getAwayTeamStats);
    this.app.get('/leaderboard', TeamsController.getTotalTeamStats);
    this.app.get('/matches', MatchesController.handleMatchesRequest);
    this.app.patch('/matches/:id', validateToken, MatchesController.updateMatch);
    this.app.patch('/matches/:id/finish', validateToken, MatchesController.finishMatch);
    this.app.post('/login', loginMiddleware, validateLoginMiddleware, LoginController.loginUser);
    this.app.post('/matches', validateToken, validateMatchTeams, MatchesController.createMatch);
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
