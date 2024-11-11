"use client";

import { useState, useEffect } from 'react';

interface Presente {
  id: number;
  nome_presente: string;
  disponivel: boolean;
  nome_pessoa: string | null;
}

export default function Home() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [selectedPresente, setSelectedPresente] = useState<number | null>(null);
  const [nomePessoa, setNomePessoa] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchPresentes = async () => {
      try {
        const response = await fetch('/api/presentes');
        const data = await response.json();
        setPresentes(data);
      } catch (error) {
        console.error("Erro ao buscar presentes:", error);
      }
    };

    fetchPresentes();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPresente || !nomePessoa) {
      alert("Selecione um presente e insira seu nome.");
      return;
    }
    await fetch('/api/presentes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ presenteId: selectedPresente, nomePessoa }),
    });
    alert("Presente reservado com sucesso!");
    setNomePessoa('');
    setSelectedPresente(null);

    fetch('/api/presentes')
      .then((res) => res.json())
      .then((data: Presente[]) => setPresentes(data));
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Selecione um Presente Disponível</h1>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nomePessoa}
          onChange={(e) => setNomePessoa(e.target.value)}
          style={styles.input}
        />

        {/* Legenda das Cores */}
        <div style={styles.legend}>
          <span style={styles.available}>Disponível</span> - Verde
          <span style={styles.reserved}>Reservado</span> - Vermelho
        </div>

        <div style={styles.giftContainer}>
          {presentes.map((presente) => (
            <div key={presente.id} style={styles.giftItem}>
              <input
                type="radio"
                id={`presente-${presente.id}`}
                name="presente"
                value={presente.id}
                disabled={!presente.disponivel}
                onChange={() => setSelectedPresente(presente.id)}
              />
              <label
                htmlFor={`presente-${presente.id}`}
                style={{
                  ...styles.label,
                  color: presente.disponivel ? 'green' : 'red', // Disponível em verde, reservado em vermelho
                }}
              >
                {presente.nome_presente}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            ...styles.button,
            backgroundColor: isHovered ? '#45a049' : styles.button.backgroundColor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Confirmar Seleção
        </button>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    height: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  container: {
    textAlign: 'center' as const,
    padding: '20px 30px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    color: '#333333',
    fontSize: '20px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '15px',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '14px',
    marginBottom: '10px',
  },
  available: {
    color: 'green',
    fontWeight: 'bold',
  },
  reserved: {
    color: 'red',
    fontWeight: 'bold',
  },
  giftContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '35px',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    padding: '10px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  giftItem: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  label: {
    fontSize: '14px',
    marginLeft: '5px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
