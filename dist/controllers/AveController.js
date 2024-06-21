"use strict";
// src/controllers/avesController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvesController = void 0;
const AveRepository_1 = require("../repositories/AveRepository");
const avesRepository = new AveRepository_1.AvesRepository();
class AvesController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aves = yield avesRepository.getAll();
                res.status(200).json(aves);
            }
            catch (error) {
                console.error('Error al obtener aves', error);
                res.status(500).send('Error al obtener aves');
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const ave = yield avesRepository.getById(id);
                if (ave) {
                    res.status(200).json(ave);
                }
                else {
                    res.status(404).send('Ave no encontrada');
                }
            }
            catch (error) {
                console.error('Error al obtener ave', error);
                res.status(500).send('Error al obtener ave');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ave = req.body;
            try {
                const newAve = yield avesRepository.create(ave);
                res.status(201).json(newAve);
            }
            catch (error) {
                console.error('Error al registrar ave', error);
                res.status(500).send('Error al registrar ave');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const aveData = req.body;
            try {
                const updatedAve = yield avesRepository.update(id, aveData);
                if (updatedAve) {
                    res.status(200).json(updatedAve);
                }
                else {
                    res.status(404).send('Ave no encontrada');
                }
            }
            catch (error) {
                console.error('Error al actualizar ave', error);
                res.status(500).send('Error al actualizar ave');
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const deletedAve = yield avesRepository.delete(id);
                if (deletedAve) {
                    res.status(200).json(deletedAve);
                }
                else {
                    res.status(404).send('Ave no encontrada');
                }
            }
            catch (error) {
                console.error('Error al eliminar ave', error);
                res.status(500).send('Error al eliminar ave');
            }
        });
    }
}
exports.AvesController = AvesController;
