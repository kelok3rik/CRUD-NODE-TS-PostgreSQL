"use strict";
// src/routes/avesRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.avesRouter = void 0;
const express_1 = require("express");
const AveController_1 = require("../controllers/AveController");
const router = (0, express_1.Router)();
exports.avesRouter = router;
const avesController = new AveController_1.AvesController();
router.get('/', (req, res) => avesController.getAll(req, res));
router.get('/:id', (req, res) => avesController.getById(req, res));
router.post('/', (req, res) => avesController.create(req, res));
router.put('/:id', (req, res) => avesController.update(req, res));
router.delete('/:id', (req, res) => avesController.delete(req, res));
