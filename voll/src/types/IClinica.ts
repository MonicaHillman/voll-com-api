import IEndereco from "./IEndereco";

export default interface IClinica {
    planoDeSaudeAceitos?: Array<String>;
    email: String;
    nome: String;
    senha: String;
    endereco: IEndereco;
};
