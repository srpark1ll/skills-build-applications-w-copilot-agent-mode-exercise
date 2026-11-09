import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import db, { connectToDatabase } from './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/api/config', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl });
});

app.use('/api', (_request, response, next) => {
  if (db.readyState !== 1) {
    response.status(503).json({ error: 'Database is not connected' });
    return;
  }
  next();
});

app.use('/api/users/', usersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/activities/', activitiesRouter);
app.use('/api/leaderboard/', leaderboardRouter);
app.use('/api/workouts/', workoutsRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, next: express.NextFunction) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  console.error('API request failed:', error);
  if (error instanceof mongoose.Error.ValidationError) {
    response.status(400).json({ error: error.message });
    return;
  }
  if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    response.status(409).json({ error: 'A record with the same unique value already exists' });
    return;
  }
  response.status(500).json({ error: 'Internal server error' });
});

void connectToDatabase().catch((error: unknown) => {
  console.error('Error connecting to octofit_db:', error);
});

app.listen(8000, () => {
  console.log('Octofit Tracker API listening on port 8000');
});
