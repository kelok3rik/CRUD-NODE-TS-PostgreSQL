import { Request, Response } from "express";
import { SummaryBirdFightRepository } from "../repositories/SummaryBirdFightRepository";
import { SummaryBirdFight } from "../models/SummaryBirdFight";

const summaryBirdFightRepository = new SummaryBirdFightRepository();

export class SummaryBirdFightController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const summaryBirdFights = await summaryBirdFightRepository.getAll();
            res.status(200).json(summaryBirdFights);
        } catch (error) {
            console.error('Error al obtener resumen de peleas de aves', error);
            res.status(500).send('Error al obtener resumen de peleas de aves');
        }
    }

}
