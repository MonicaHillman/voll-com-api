import IPaciente from "./IPaciente";
import IProfissional from "./IProfissional";

export default interface IConsulta extends IProfissional {
    id: string;
    data: string;
    desejaLembrete: boolean;
    lembretes: string[];
    motivoCancelamento: string | null;
    especialista: IProfissional;
    paciente: IPaciente;
}