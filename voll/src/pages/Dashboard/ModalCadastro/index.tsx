import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Modal, Switch } from '@mui/material';
import { Box } from "@mui/material";
import icone from './assets/publish.png';
import Titulo from "../../../components/Titulo";
import styled from "styled-components";
import CampoDigitacao from "../../../components/CampoDigitacao";
import Botao from "../../../components/Botao";
import Subtitulo from "../../../components/Subtitulo";

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

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [crm, setCrm] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [telefone, setTelefone] = useState("");

    const label = { inputProps: { 'aria-label': 'Atende por plano?' } };

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

                    <Container>
                        <CampoDigitacao label="Nome" value={nome} placeholder="Digite seu nome completo" onChange={setNome} />
                        <CampoDigitacao label="Email" value={email} placeholder="Digite seu email" onChange={setEmail} />
                        <CampoDigitacao label="Especialidade" value={especialidade} placeholder="Qual sua especialidade?" onChange={setEspecialidade} />
                        <CampoDigitacao label="CRM" value={crm} placeholder="Insira seu número de registro" onChange={setCrm} />
                        <CampoDigitacao label="Localização" value={localizacao} placeholder="Insira sua cidade" onChange={setLocalizacao} />
                        <CampoDigitacao label="Telefone" value={telefone} placeholder="(DDD) XXXXX-XXXX" onChange={setTelefone} />
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
                        <FormControlLabel control={<Checkbox />} label="Sulamerica" />
                        <FormControlLabel control={<Checkbox />} label="Unimed" />
                        <FormControlLabel control={<Checkbox />} label="Bradesco" />
                        <FormControlLabel control={<Checkbox />} label="Amil" />
                        <FormControlLabel control={<Checkbox />} label="Biosaúde" />
                        <FormControlLabel control={<Checkbox />} label="Biosaúde" />
                        <FormControlLabel control={<Checkbox />} label="Biovida" />
                        <FormControlLabel control={<Checkbox />} label="Outro" />
                    </FormGroup>

                    <Botao>Cadastrar</Botao>
                </BoxCustomizado>
            </Modal>
        </>
    );
}