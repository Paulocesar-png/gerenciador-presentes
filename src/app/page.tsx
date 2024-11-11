import { useState, useEffect } from 'react';

interface Presente {
  id: number;
  nome_presente: string;
  disponivel: boolean;
  nome_pessoa?: string | null;
}

export default function Home() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [selectedPresente, setSelectedPresente] = useState<number | null>(null);
  const [nomePessoa, setNomePessoa] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('/api/presentes')
      .then((res) => res.json())
      .then((data: Presente[]) => setPresentes(data));
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
    <div style={styles.container}>
      <h1 style={styles.heading}>Selecione um Presente Disponível</h1>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nomePessoa}
        onChange={(e) => setNomePessoa(e.target.value)}
        style={styles.input}
      />
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
            <label htmlFor={`presente-${presente.id}`} style={styles.label}>
              {presente.nome_presente} {presente.disponivel ? '' : `(Reservado por ${presente.nome_pessoa})`}
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
  );
}

const styles = {
  container: {
    textAlign: 'center' as 'center',
    marginTop: '50px',
    padding: '20px 30px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    margin: 'auto',
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
  giftContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'start' as 'start',
    marginBottom: '20px',
  },
  giftItem: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: '16px',
    color: '#555555',
    cursor: 'pointer',
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
