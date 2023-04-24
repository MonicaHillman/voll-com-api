import { useState } from 'react';

export default function usePost() {
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [resposta, setResposta] = useState('');

  async function cadastrarDados<T>({ url, dados, token }: { url: string; dados: T; token?: string }) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const res = await fetch(`http://localhost:8080/${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(dados),
      });
      if (!res.ok) {
        throw new Error('Erro ao cadastrar dados.');
      }
      const resConvertida = await res.json();
      setSucesso(true);
      setResposta(resConvertida.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro('Erro desconhecido');
      }
    }
  }

  return { cadastrarDados, erro, sucesso, resposta };
}