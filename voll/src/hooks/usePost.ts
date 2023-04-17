import { useState } from 'react';

export default function usePost() {
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [resposta, setResposta] = useState('');

  async function cadastrarDados<T>({ url, dados }: { url: string; dados: T }) {
    await fetch('http://localhost:8080/' + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao cadastrar dados.');
        }
        return res.json();
      })
      .then((resConvertida) => {
        setSucesso(true);
        setResposta(resConvertida.token);
      })
      .catch((err) => setErro(err.message));

    return resposta;
  }

  return { cadastrarDados, erro, sucesso, resposta };
}