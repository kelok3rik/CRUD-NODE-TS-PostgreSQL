import { SummaryBirdFight } from '../models/SummaryBirdFight';
import pool from '../db/dbconfig';

export class SummaryBirdFightRepository {
    async getAll(): Promise<SummaryBirdFight[]> {
        const { rows } = await pool.query(`
            SELECT
    placa,
    COUNT(*) AS total_peleas,
    COALESCE(SUM(CASE WHEN resultado = 'GANO' THEN 1 ELSE 0 END), 0) AS victorias,
    COALESCE(SUM(CASE WHEN resultado = 'EMPATE' THEN 1 ELSE 0 END), 0) AS empates,
    COALESCE(SUM(CASE WHEN resultado = 'PERDIO' THEN 1 ELSE 0 END), 0) AS derrotas,
    COALESCE(ROUND(AVG(CASE WHEN resultado IN ('GANO', 'EMPATE', 'PERDIO') THEN 100.0 ELSE 0 END), 2), 0.00) AS tasa_victoria,
    COALESCE(ROUND(AVG(CASE WHEN resultado = 'EMPATE' THEN 100.0 ELSE 0 END), 2), 0.00) AS tasa_empates,
    COALESCE(ROUND(AVG(CASE WHEN resultado = 'PERDIO' THEN 100.0 ELSE 0 END), 2), 0.00) AS tasa_derrotas,
    COALESCE(ROUND(AVG(
        CASE WHEN resultado IN ('GANO', 'PERDIO') THEN
            EXTRACT(EPOCH FROM CAST('00:' || tiempo AS INTERVAL)) / 60.0
        ELSE
            NULL
        END
    ), 2), 0.00) AS duracion_promedio,
    COALESCE(ROUND(AVG(
        CASE WHEN resultado = 'GANO' THEN
            EXTRACT(EPOCH FROM CAST('00:' || tiempo AS INTERVAL)) / 60.0
        ELSE
            NULL
        END
    ), 2), 0.00) AS promedio_duracion_victorias,
    COALESCE(ROUND(AVG(
        CASE WHEN resultado = 'EMPATE' THEN
            EXTRACT(EPOCH FROM CAST('00:' || tiempo AS INTERVAL)) / 60.0
        ELSE
            NULL
        END
    ), 2), 0.00) AS promedio_duracion_empates,
    COALESCE(ROUND(AVG(
        CASE WHEN resultado = 'PERDIO' THEN
            EXTRACT(EPOCH FROM CAST('00:' || tiempo AS INTERVAL)) / 60.0
        ELSE
            NULL
        END
    ), 2), 0.00) AS promedio_duracion_derrotas
FROM
    peleas
GROUP BY
    placa
ORDER BY
    total_peleas DESC;
        `);
        return rows;
    }
}
