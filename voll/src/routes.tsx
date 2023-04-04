import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePagina from "./pages/BasePagina";
import BasePaginaFormulario from "./pages/BasePaginaFormulario";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NaoEncontrada from "./pages/NaoEncontrada";
import PaginaInicial from "./pages/PaginaInicial";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasePagina />}>
                    <Route index element={<PaginaInicial />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="*" element={<NaoEncontrada />}></Route>
                </Route>
                <Route path="/" element={<BasePaginaFormulario />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path='/cadastro' element={<Cadastro />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;