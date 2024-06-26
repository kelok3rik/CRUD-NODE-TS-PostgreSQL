import { Ave } from '../models/Ave';
import pool from '../db/dbconfig';
export class AvesRepository {
  async getAll(): Promise<Ave[]> {
    const { rows } = await pool.query('SELECT * FROM aves');
    return rows;
  }

  async getById(id: number): Promise<Ave | undefined> {
    const { rows } = await pool.query('SELECT * FROM aves WHERE id = $1', [id]);
    return rows[0];
  }

  async create(ave: Ave): Promise<Ave> {
    console.log(ave);
    const {
      fecha_nacimiento, placa, color_placa, color, tusa,
      numero_placa_coliseo, marca, sexo, padre_id, madre_id
    } = ave;
    const { rows } = await pool.query(
      'INSERT INTO aves (fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id]
    );
    return rows[0];
  }

  async update(id: number, newData: Partial<Ave>): Promise<Ave | undefined> {
    const {
      fecha_nacimiento, placa, color_placa, color, tusa,
      numero_placa_coliseo, marca, sexo, padre_id, madre_id
    } = newData;
    const { rows } = await pool.query(
      `UPDATE aves SET 
        fecha_nacimiento = COALESCE($1, fecha_nacimiento),
        placa = COALESCE($2, placa),
        color_placa = COALESCE($3, color_placa),
        color = COALESCE($4, color),
        tusa = COALESCE($5, tusa),
        numero_placa_coliseo = COALESCE($6, numero_placa_coliseo),
        marca = COALESCE($7, marca),
        sexo = COALESCE($8, sexo),
        padre_id = COALESCE($9, padre_id),
        madre_id = COALESCE($10, madre_id)
      WHERE id = $11 RETURNING *`,
      [fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id, id]
    );
    return rows[0];
  }

  async delete(id: number): Promise<Ave | undefined> {
    const { rows } = await pool.query('DELETE FROM aves WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
}
