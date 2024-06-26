import { Router } from "express";
import { PeleaController } from "../controllers/PeleaController";

const router: Router = Router();
const peleaController = new PeleaController();

router.get('/', (req, res) => peleaController.getAll(req, res));
router.get('/:id', (req, res) => peleaController.getById(req, res));
router.post('/', (req, res) => peleaController.create(req, res));
router.put('/:id', (req, res) => peleaController.update(req, res));
router.delete('/:id', (req, res) => peleaController.delete(req, res));


export { router as peleaRouter };


