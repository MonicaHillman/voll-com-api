import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import usePost from "../../usePost";
import logo from './assets/Logo.png';
import IClinica from "../../types/IClinica";

const Imagem = styled.img`
  padding: 2em 0;
`;

const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
`;

const Formulario = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BotaoCustomizado = styled(Botao)`
  width: 50%;
`;

interface CustomStepProps {
    color: string;
}

const CustomStep = styled.div<CustomStepProps>`
  background-color: ${({ color }) => color};
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;


const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 30% 65%;
  justify-content: space-between
`;

export default function Cadastro() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senhaVerificada, setSenhaVerificada] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const { cadastrarClinica, erro, sucesso } = usePost();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(event)
        event.preventDefault(); // previne o envio padrão do formulário

        const clinica: IClinica = {
            endereco: {
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
            },
            planoDeSaudeAceitos: ['Unimed'],
        }

        if (activeStep !== 0) {
            cadastrarClinica({ url: 'clinicas', dados: clinica });
            if (sucesso) navigate('/dashboard');

        }

        setActiveStep(activeStep + 1); // atualiza o estado da etapa para a próxima etapa
    }

    return (
        <>
            <Imagem src={logo} alt="Logo da Voll" />
            <Stepper activeStep={activeStep}>
                <Step>
                    <StepLabel
                        StepIconComponent={(props) => (
                            <CustomStep color={props.active ? 'blue' : 'gray'} />
                        )}
                    />
                </Step>

                <Step>
                    <StepLabel
                        StepIconComponent={(props) => (
                            <CustomStep color={props.active ? 'blue' : 'gray'} />
                        )}
                    />
                </Step>
            </Stepper>

            {activeStep === 0 ? (
                <>
                    <Titulo>Primeiro, alguns dados básicos:</Titulo>
                    <Formulario onSubmit={handleSubmit}>
                        <CampoDigitacao
                            label="Nome"
                            value={nome}
                            placeholder="Insira seu nome"
                            onChange={setNome}
                        />
                        <CampoDigitacao
                            label="CNPJ"
                            value={cnpj}
                            placeholder="Insira seu cnpj"
                            onChange={setCnpj}
                        />
                        <CampoDigitacao
                            label="Email"
                            value={email}
                            placeholder="Insira o endereço de e-mail para login"
                            onChange={setEmail}
                        />
                        <CampoDigitacao
                            label="Senha"
                            value={senha}
                            placeholder="Digite sua senha"
                            onChange={setSenha}
                        />
                        <CampoDigitacao
                            label="Confirme a senha"
                            value={senhaVerificada}
                            placeholder="Confirme sua senha"
                            onChange={setSenhaVerificada}
                        />
                        <BotaoCustomizado type="submit">Avançar</BotaoCustomizado>
                    </Formulario>
                </>) : (
                <>
                    {erro ? <p>{erro}</p> : ''}
                    <Titulo>Agora, os dados técnicos:</Titulo>
                    <Formulario onSubmit={handleSubmit}>
                        <CampoDigitacao
                            label="Telefone"
                            value={telefone}
                            placeholder="(DDD) XXXXX-XXXX"
                            onChange={setTelefone}
                        />
                        <CampoDigitacao
                            label="CEP"
                            value={cep}
                            placeholder="Insira o CEP"
                            onChange={setCep}
                        />
                        <CampoDigitacao
                            label="Rua"
                            value={rua}
                            placeholder="Rua"
                            onChange={setRua}
                        />
                        <Container>
                            <CampoDigitacao
                                value={numero}
                                placeholder="Número"
                                onChange={setNumero}
                            />
                            <CampoDigitacao
                                value={complemento}
                                placeholder="Complemento"
                                onChange={setComplemento}
                            />
                        </Container>
                        <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>
                    </Formulario>
                </>
            )}
        </>
    );
}