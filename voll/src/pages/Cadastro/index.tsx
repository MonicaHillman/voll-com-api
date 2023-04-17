import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import usePost from "../../hooks/usePost";
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

    const { cadastrarDados, erro, sucesso } = usePost();
    const navigate = useNavigate();

    function validarFormulario(): boolean {
        // Verifica se as senhas coincidem
        if (senha !== senhaVerificada) {
            alert("As senhas não coincidem.");
            return false;
        }

        // Verifica se o CNPJ é válido
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        if (!regexCnpj.test(cnpj)) {
            alert("Por favor, insira um CNPJ válido.");
            return false;
        }

        if (activeStep != 0) {

            // Verifica se o CEP é válido
            const regexCep = /^\d{5}\d{3}$/;
            if (!regexCep.test(cep)) {
                alert("Por favor, insira um CEP válido.");
                return false;
            }
        }

        return true;
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

        if (!validarFormulario()) {
            return; // impede o envio do formulário se os campos não estiverem preenchidos corretamente
        }

        const clinica: IClinica = {
            email: email,
            nome: nome,
            senha: senha,
            endereco: {
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                estado: 'RS',
            },
        }

        if (activeStep !== 0) {
            cadastrarDados({ url: 'clinica', dados: clinica });
            sucesso && navigate('/dashboard');
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
                            tipo="text"
                            label="Nome"
                            value={nome}
                            placeholder="Insira seu nome"
                            onChange={setNome}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="CNPJ"
                            value={cnpj}
                            placeholder="Insira seu cnpj"
                            onChange={setCnpj}
                        />
                        <CampoDigitacao
                            tipo="email"
                            label="Email"
                            value={email}
                            placeholder="Insira o endereço de e-mail para login"
                            onChange={setEmail}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Senha"
                            value={senha}
                            placeholder="Digite sua senha"
                            onChange={setSenha}
                        />
                        <CampoDigitacao
                            tipo="password"
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
                            tipo="tel"
                            label="Telefone"
                            value={telefone}
                            placeholder="(DDD) XXXXX-XXXX"
                            onChange={setTelefone}
                        />
                        <CampoDigitacao
                            tipo="number"
                            label="CEP"
                            value={cep}
                            placeholder="Insira o CEP"
                            onChange={setCep}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Rua"
                            value={rua}
                            placeholder="Rua"
                            onChange={setRua}
                        />
                        <Container>
                            <CampoDigitacao
                                tipo="number"
                                value={numero}
                                placeholder="Número"
                                onChange={setNumero}
                            />
                            <CampoDigitacao
                                tipo="text"
                                value={complemento}
                                placeholder="Complemento"
                                onChange={setComplemento}
                            />
                        </Container>
                        <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>

                        {erro ? <p>{erro}</p> : ''}
                        {sucesso ? <p>Usuário cadastrado com sucesso!</p> : ''}
                    </Formulario>
                </>
            )}
        </>
    );
}