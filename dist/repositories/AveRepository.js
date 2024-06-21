"use strict";
// src/repositories/avesRepository.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvesRepository = void 0;
const dbconfig_1 = __importDefault(require("../db/dbconfig"));
class AvesRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield dbconfig_1.default.query('SELECT * FROM aves');
            return rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield dbconfig_1.default.query('SELECT * FROM aves WHERE id = $1', [id]);
            return rows[0];
        });
    }
    create(ave) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id } = ave;
            const { rows } = yield dbconfig_1.default.query('INSERT INTO aves (fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id]);
            return rows[0];
        });
    }
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id } = newData;
            const { rows } = yield dbconfig_1.default.query(`UPDATE aves SET 
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
      WHERE id = $11 RETURNING *`, [fecha_nacimiento, placa, color_placa, color, tusa, numero_placa_coliseo, marca, sexo, padre_id, madre_id, id]);
            return rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield dbconfig_1.default.query('DELETE FROM aves WHERE id = $1 RETURNING *', [id]);
            return rows[0];
        });
    }
}
exports.AvesRepository = AvesRepository;
