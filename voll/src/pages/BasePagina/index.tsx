import { Outlet } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho';
import Rodape from '../../components/Rodape';

export default function BasePagina() {
    return (
        <>
            <Cabecalho />
            <main>
                <Outlet />
            </main>
            <Rodape />
        </>
    );
}