import Activity from '../models/Activity';
import { createCollectionRouter } from './collectionRouter';

export default createCollectionRouter(Activity, { completedAt: -1 });
