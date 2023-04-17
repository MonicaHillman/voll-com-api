import { useContext, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Modal, Switch } from '@mui/material';
import { Box } from "@mui/material";
import icone from './assets/publish.png';
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";
import IProfissional from "../../../types/IProfissional";
import usePost from "../../../hooks/usePost";


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

const Rotulo = styled.label`
    display: inline-block;
    border-radius: 4px;
    padding: 2em 5em;
    border: 2px solid var(--cinza-escuro);
    cursor: pointer;
    font-size: 16px;
    color: var(--cinza);

    p {
        margin: 0;
    }
`

const UploadImagem = styled.input`
display: none;
`

export default function ModalCadastro() {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const [planosSelecionados, setPlanosSelecionados] = useState<string[]>([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [crm, setCrm] = useState("");

    const [telefone, setTelefone] = useState("");
    const label = { inputProps: { 'aria-label': 'Atende por plano?' } };
    const { cadastrarDados, erro, sucesso } = usePost();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setPlanosSelecionados([...planosSelecionados, checkboxValue]);
            console.log(planosSelecionados)
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
            imagem: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fpt-br%2Ffoto%2Ffotografia-de-pessoa-em-roupa-de-banho-est%C3%A1-sentado-em-uma-cadeira-de-praia-ao-",
            estaAtivo: true,
            especialidade: especialidade,
            email: email,
            telefone: telefone,
            possuiPlanoSaude: true,
            planosSaude: planosSelecionados,
            endereco: {
                cep: '76541321',
                rua: "Rua 9",
                estado: "São Paulo",
                numero: '65',
                complemento: "casa"
            }
        }

        cadastrarDados({ url: 'especialista', dados: profissional });
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
                            <CampoDigitacao tipo="text" label="Especialidade" value={especialidade} placeholder="Qual sua especialidade?" onChange={setEspecialidade} />
                            <CampoDigitacao tipo="number" label="CRM" value={crm} placeholder="Insira seu número de registro" onChange={setCrm} />
                            <CampoDigitacao tipo="tel" label="Telefone" value={telefone} placeholder="(DDD) XXXXX-XXXX" onChange={setTelefone} />
                        </Container>

                        <Subtitulo>Foto</Subtitulo>
                        <Rotulo htmlFor="file-upload" >
                            <img src={icone} />
                            <p>Clique para enviar</p>
                        </Rotulo>
                        <UploadImagem id="file-upload" type="file" accept="image/*"></UploadImagem>

                        <Subtitulo>Atende por plano?</Subtitulo>
                        <Switch {...label} />

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

                        <Botao>Cadastrar</Botao>
                    </form>
                </BoxCustomizado>
            </Modal>
        </>
    );
}