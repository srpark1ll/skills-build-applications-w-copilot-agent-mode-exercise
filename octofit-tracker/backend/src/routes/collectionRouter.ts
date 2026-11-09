import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCollectionRouter<T>(model: Model<T>, sort: Record<string, 1 | -1> = {}) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const documents = await model.find().sort(sort).lean().exec();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    if (request.body === null || typeof request.body !== 'object' || Array.isArray(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }

    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
