import IEndereco from "./IEndereco";

export default interface IPaciente {
    cpf: string,
    nome: string,
    email: string,
    estaAtivo: boolean,
    endereco: Array<IEndereco>,
    senha: string,
    telefone: number,
    planoDeSaude: Array<string>,
    imagem: string,
    historico: Array<string>,
    possuiPlanoSaude: boolean
}