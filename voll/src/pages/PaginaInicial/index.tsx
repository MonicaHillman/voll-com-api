import styled from "styled-components";
import Atividades from "./Atividades";
import Banner from "./Banner";
import Depoimentos from "./Depoimentos";
import Formulario from "./Formulario";

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`

export default function PaginaInicial() {
    return (
        <>
            <Banner />
            <Container>
                <Formulario />
                <Atividades />
                <Depoimentos />
            </Container >
        </>
    )
}