

import { Router } from 'express';
import { AvesController } from '../controllers/AveController';

const router: Router = Router();
const avesController = new AvesController();

router.get('/', (req, res) => avesController.getAll(req, res));
router.get('/:id', (req, res) => avesController.getById(req, res));
router.post('/', (req, res) => avesController.create(req, res));
router.put('/:id', (req, res) => avesController.update(req, res));
router.delete('/:id', (req, res) => avesController.delete(req, res));

export { router as avesRouter };
