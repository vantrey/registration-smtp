import { Request, Response, Router } from 'express';
import { testingRepository } from '../repositories/testing-repository';

export const clearAllData = Router({});

clearAllData.delete('/all-data', async (req: Request, res: Response) => {
  try {
    const isCleared = await testingRepository.clearAllData();
    if (isCleared) {
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json((error as Error).message);
  }
});
