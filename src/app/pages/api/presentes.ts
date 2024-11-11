import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Obtém a lista de presentes
    const presentes = await prisma.presentes.findMany();
    res.status(200).json(presentes);
  } else if (req.method === 'POST') {
    // Desestrutura os dados do corpo da requisição e define o tipo esperado
    const { presenteId, nomePessoa }: { presenteId: number; nomePessoa: string } = req.body;

    // Atualiza o presente no banco de dados
    await prisma.presentes.update({
      where: { id: presenteId },
      data: { disponivel: false, nome_pessoa: nomePessoa },
    });
    res.status(200).json({ message: 'Presente reservado com sucesso!' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
