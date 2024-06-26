import { Request, Response } from "express";
import { PeleaRepository } from "../repositories/PeleaRepository";
import { Pelea } from "../models/Peleas";

const peleaRepository = new PeleaRepository();

export class PeleaController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const peleas = await peleaRepository.getAll();
            res.status(200).json(peleas);
        } catch (error) {
            console.error('Error al obtener peleas', error);
            res.status(500).send('Error al obtener peleas');
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const pelea = await peleaRepository.getById(id);
            if (pelea) {
                res.status(200).json(pelea);
            } else {
                res.status(404).send('Pelea no encontrada');
            }
        } catch (error) {
            console.error('Error al obtener pelea', error);
            res.status(500).send('Error al obtener pelea');
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const peleas: Pelea[] = req.body;  // Supone que el cuerpo de la solicitud es un array de peleas
        if (!Array.isArray(peleas)) {
            res.status(400).send('Formato de datos incorrecto, se espera un array de peleas');
            return;
        }

        try {
            const newPeleas = await Promise.all(peleas.map(pelea => peleaRepository.create(pelea)));
            res.status(201).json(newPeleas);
        } catch (error) {
            console.error('Error al registrar peleas', error);
            res.status(500).send('Error al registrar peleas');
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const peleaData: Partial<Pelea> = req.body;
        try {
            const updatedPelea = await peleaRepository.update(id, peleaData);
            if (updatedPelea) {
                res.status(200).json(updatedPelea);
            } else {
                res.status(404).send('Pelea no encontrada');
            }
        } catch (error) {
            console.error('Error al actualizar pelea', error);
            res.status(500).send('Error al actualizar pelea');
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const deletedPelea = await peleaRepository.delete(id);
            if (deletedPelea) {
                res.status(200).json(deletedPelea);
            } else {
                res.status(404).send('Pelea no encontrada');
            }
        } catch (error) {
            console.error('Error al eliminar pelea', error);
            res.status(500).send('Error al eliminar pelea');
        }
    }

    

}
