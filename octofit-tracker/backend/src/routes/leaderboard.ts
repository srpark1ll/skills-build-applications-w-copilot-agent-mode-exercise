import Leaderboard from '../models/Leaderboard';
import { createCollectionRouter } from './collectionRouter';

export default createCollectionRouter(Leaderboard, { points: -1 });
