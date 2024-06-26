
import { Router } from 'express';
import { SummaryBirdFightController } from '../controllers/SummaryBirdFightController';

const router: Router = Router();
const summaryBirdFightController = new SummaryBirdFightController();

router.get('/', (req, res) => summaryBirdFightController.getAll(req, res));

export { router as SummaryBirdFightRouter };