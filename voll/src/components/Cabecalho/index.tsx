import styled from 'styled-components';
import logo from './assets/logo.png';
import perfil from './assets/perfil.png';
import autenticaStore from '../../stores/autentica.store';

const CabecalhoEstilizado = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 4em
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-grow: .1;
`

const LinkEstilizado = styled.a`
 color: var(--azul-escuro);
 font-weight: 700;
`

function Cabecalho() {

    const handleLogout = () => {
        autenticaStore.logout();
    };

    return (
        <CabecalhoEstilizado>
            <img src={logo} alt="logo da empresa Voll" />
            <Container>
                <img src={perfil} alt="imagem de perfil do usuário" />
                {autenticaStore.estaAutenticado
                    ? <LinkEstilizado href="/" onClick={handleLogout}>Sair</LinkEstilizado>
                    : <LinkEstilizado href="/login">Entrar</LinkEstilizado>
                }
            </Container>
        </CabecalhoEstilizado>
    )
}

export default Cabecalho;