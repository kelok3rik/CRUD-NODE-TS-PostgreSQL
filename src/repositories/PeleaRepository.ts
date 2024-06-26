// PeleaRepository.ts

import { Pelea } from '../models/Peleas';
import pool from '../db/dbconfig';

export class PeleaRepository {
    async getAll(): Promise<Pelea[]> {
        const { rows } = await pool.query('SELECT * FROM peleas');
        return rows;
    }

    async getById(id: number): Promise<Pelea | undefined> {
        const { rows } = await pool.query('SELECT * FROM peleas WHERE id = $1', [id]);
        return rows[0];
    }

    async create(pelea: Pelea): Promise<Pelea> {

        const { fecha, placa, resultado, tiempo, club, evaluacion } = pelea;

        const { rows } = await pool.query(
            'INSERT INTO peleas (fecha, placa, resultado, tiempo, club, evaluacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [fecha, placa, resultado, tiempo, club, evaluacion]
        );
        return rows[0];
    }

    async update(id: number, newData: Partial<Pelea>): Promise<Pelea | undefined> {
        const { fecha, placa, resultado, tiempo, club, evaluacion } = newData;
        const { rows } = await pool.query(
            `UPDATE peleas SET 
            fecha = COALESCE($1, fecha),
            placa = COALESCE($2, placa),
            resultado = COALESCE($3, resultado),
            tiempo = COALESCE($4, tiempo),
            club = COALESCE($5, club),
            evaluacion = COALESCE($6, evaluacion)
            WHERE id = $7 RETURNING *`,
            [fecha, placa, resultado, tiempo, club, evaluacion, id]
        );
        return rows[0];
    }

    async delete(id: number): Promise<Pelea | undefined> {
        const { rows } = await pool.query('DELETE FROM peleas WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

}
