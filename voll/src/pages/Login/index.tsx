import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import logo from './assets/Logo.png';

const Imagem = styled.img`
padding: 2em 0;
`

const Titulo = styled.h2`
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: var(--cinza)
`

const Paragrafo = styled.p`
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: var(--azul-escuro)
`

const ParagrafoCadastro = styled(Paragrafo)`
color: var(--cinza);
`

const LinkCustomizado = styled(Link)`
color: var(--azul-claro);
font-weight: 700;
text-decoration: none;
`

const Formulario = styled.form`
width: 70%;
display: flex;
flex-direction: column;
align-items: center;
`

const BotaoCustomizado = styled(Botao)`
width: 50%;
`


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <>
            <Imagem src={logo} alt="Logo da Voll" />
            <Titulo>Faça login em sua conta</Titulo>
            <Formulario>
                <CampoDigitacao label="Email" value={email} placeholder="Insira seu endereço de email" onChange={setEmail} />
                <CampoDigitacao label="Senha" value={senha} placeholder="Insira sua senha" onChange={setSenha} />
                <BotaoCustomizado type="submit">Entrar</BotaoCustomizado>
            </Formulario>
            <Paragrafo>Esqueceu sua senha?</Paragrafo>
            <ParagrafoCadastro>Ainda não tem conta? <LinkCustomizado to="#">Faça seu cadastro!</LinkCustomizado></ParagrafoCadastro>
        </>
    )
}