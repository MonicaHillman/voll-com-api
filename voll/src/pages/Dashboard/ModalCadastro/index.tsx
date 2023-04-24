import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Modal, Switch } from '@mui/material';
import { Box } from "@mui/material";
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";
import IProfissional from "../../../types/IProfissional";
import usePost from "../../../hooks/usePost";
import autenticaStore from "../../../stores/autentica.store";


const BoxCustomizado = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--branco);
  border: none;
  border-radius: 16px;
  padding: 1em 5em;
`;

const Container = styled.div`
text-align: left;
`

const ContainerSwitch = styled.div`
text-align: center;
`

const TextoSwitch = styled.p`
color: var(--cinza);
`

const BotaoCustomizado = styled(Botao)`
    width: 50%;
    display: block;
    margin: 0 auto;
`

export default function ModalCadastro() {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const [planosSelecionados, setPlanosSelecionados] = useState<string[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVerificada, setSenhaVerificada] = useState("");
    const [possuiPlano, setPossuiPlano] = useState(false);
    const [imagem, setImagem] = useState('');
    const [especialidade, setEspecialidade] = useState("");
    const [crm, setCrm] = useState("");
    const [telefone, setTelefone] = useState("");
    const label = { inputProps: { 'aria-label': 'Atende por plano?' } };
    const { cadastrarDados, erro, sucesso } = usePost();
    const { usuario } = autenticaStore;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setPlanosSelecionados([...planosSelecionados, checkboxValue]);
        } else {
            setPlanosSelecionados(planosSelecionados.filter(plano => plano !== checkboxValue));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(event)
        event.preventDefault(); // previne o envio padrão do formulário

        const profissional: IProfissional = {
            nome: nome,
            crm: crm,
            especialidade: especialidade,
            possuiPlanoSaude: true,
            senha: senha,
            planosSaude: planosSelecionados,
            estaAtivo: true,
            imagem: imagem,
            email: email,
            telefone: telefone,
            endereco: {
                cep: '76541321',
                rua: "Rua 9",
                estado: "São Paulo",
                numero: '65',
                complemento: "casa"
            }
        }

        cadastrarDados({ url: 'especialista', dados: profissional, token: usuario.token });
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxCustomizado>
                    <Titulo>Cadastre o especialista inserindo os dados abaixo:</Titulo>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <CampoDigitacao tipo="text" label="Nome" value={nome} placeholder="Digite seu nome completo" onChange={setNome} />
                            <CampoDigitacao tipo="email" label="Email" value={email} placeholder="Digite seu email" onChange={setEmail} />
                            <CampoDigitacao tipo="password" label="Senha" value={senha} placeholder="Digite sua senha" onChange={setSenha} />
                            <CampoDigitacao tipo="password" label="Repita a senha" value={senhaVerificada} placeholder="Digite sua senha novamente" onChange={setSenhaVerificada} />
                            <CampoDigitacao tipo="text" label="Especialidade" value={especialidade} placeholder="Qual sua especialidade?" onChange={setEspecialidade} />
                            <CampoDigitacao tipo="number" label="CRM" value={crm} placeholder="Insira seu número de registro" onChange={setCrm} />
                            <CampoDigitacao tipo="tel" label="Telefone" value={telefone} placeholder="(DDD) XXXXX-XXXX" onChange={setTelefone} />
                            <CampoDigitacao tipo="text" label="Insira a URL da sua imagem" value={imagem} placeholder="https://img.com/fotos/retrato-de-um-jovem-medico" onChange={setImagem} />
                        </Container>

                        <ContainerSwitch>
                            <Subtitulo>Atende por plano?</Subtitulo>
                            <Switch {...label} onChange={() => {
                                possuiPlano ?
                                    setPossuiPlano(false) :
                                    setPossuiPlano(true)
                            }
                            } />
                            <TextoSwitch>Não/Sim</TextoSwitch>
                        </ContainerSwitch>
                        {possuiPlano ?
                            <>
                                <Subtitulo>Selecione os planos:</Subtitulo>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Sulamerica" />} label="Sulamerica" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Unimed" />} label="Unimed" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Bradesco" />} label="Bradesco" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Amil" />} label="Amil" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Biosaúde" />} label="Biosaúde" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Biovida" />} label="Biovida" />
                                    <FormControlLabel control={<Checkbox onChange={handleChange} value="Outro" />} label="Outro" />
                                </FormGroup>
                            </>
                            : ''}
                        <BotaoCustomizado>Cadastrar</BotaoCustomizado>
                        {erro ? <p>Não foi possível cadastrar o especialista!</p> : ''}
                        {sucesso ? <p>Cadastrado com sucesso!</p> : ''}
                    </form>
                </BoxCustomizado>
            </Modal>
        </>
    );
}