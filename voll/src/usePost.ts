import { useState } from 'react';

export default function usePost() {
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  async function cadastrarClinica<T>({ url, dados }: { url: string; dados: T }) {
    const response = await fetch('http://localhost:8080/' + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      setSucesso(true);
    } else {
      const dados = await response.json();
      setErro(dados.message);
    }
  }

  return { cadastrarClinica, erro, sucesso };
}