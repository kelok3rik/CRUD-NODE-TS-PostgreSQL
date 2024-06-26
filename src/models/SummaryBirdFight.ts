export interface SummaryBirdFight {
    placa: string;
    totalPeleas: number;
    victorias: number;
    empates: number;
    derrotas: number;
    tasaVictoria: number;
    tasaEmpates: number;
    tasaDerrotas: number;
    duracionPromedio?: number;
    promedioDuracionVictorias?: number;
    promedioDuracionEmpates?: number;  // Puede ser opcional si no hay datos
    promedioDuracionDerrotas?: number; // Puede ser opcional si no hay datos
}
