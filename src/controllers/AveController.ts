// src/controllers/avesController.ts

import { Request, Response } from 'express';
import { AvesRepository } from '../repositories/AveRepository';
import { Ave } from '../models/Ave';

const avesRepository = new AvesRepository();

export class AvesController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const aves = await avesRepository.getAll();
      res.status(200).json(aves);
    } catch (error) {
      console.error('Error al obtener aves', error);
      res.status(500).send('Error al obtener aves');
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const ave = await avesRepository.getById(id);
      if (ave) {
        res.status(200).json(ave);
      } else {
        res.status(404).send('Ave no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener ave', error);
      res.status(500).send('Error al obtener ave');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const ave: Ave = req.body;
    try {
      const newAve = await avesRepository.create(ave);
      res.status(201).json(newAve);
    } catch (error) {
      console.error('Error al registrar ave', error);
      res.status(500).send('Error al registrar ave');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const aveData: Partial<Ave> = req.body;
    try {
      const updatedAve = await avesRepository.update(id, aveData);
      if (updatedAve) {
        res.status(200).json(updatedAve);
      } else {
        res.status(404).send('Ave no encontrada');
      }
    } catch (error) {
      console.error('Error al actualizar ave', error);
      res.status(500).send('Error al actualizar ave');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const deletedAve = await avesRepository.delete(id);
      if (deletedAve) {
        res.status(200).json(deletedAve);
      } else {
        res.status(404).send('Ave no encontrada');
      }
    } catch (error) {
      console.error('Error al eliminar ave', error);
      res.status(500).send('Error al eliminar ave');
    }
  }
}
