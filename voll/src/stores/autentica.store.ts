import { action, makeObservable, observable } from "mobx";

class AutenticaStore {
    estaAutenticado = false;
    usuario = {};

    constructor() {
        makeObservable(this, {
            estaAutenticado: observable,
            usuario: observable,
            login: action,
            logout: action
        });
    }


    login({ email, token }: { email: string, token: string }) {
        this.estaAutenticado = true;
        this.usuario = { email, token };
    }


    logout() {
        this.estaAutenticado = false;
        this.usuario = {};
    }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;