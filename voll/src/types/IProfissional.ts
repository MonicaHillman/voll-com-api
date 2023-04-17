import IEndereco from "./IEndereco";

export default interface IProfissional {
    nome: string,
    crm: string,
    imagem: string,
    especialidade: string,
    estaAtivo: boolean,
    email: string,
    telefone: string,
    possuiPlanoSaude: boolean,
    planosSaude: string[],
    endereco: IEndereco;
}