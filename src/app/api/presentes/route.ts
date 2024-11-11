import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Obtém a lista de presentes
  const presentes = await prisma.presentes.findMany();
  return NextResponse.json(presentes);
}

export async function POST(request: NextRequest) {
  // Desestrutura os dados do corpo da requisição
  const { presenteId, nomePessoa } = await request.json();

  // Atualiza o presente no banco de dados
  await prisma.presentes.update({
    where: { id: presenteId },
    data: { disponivel: false, nome_pessoa: nomePessoa },
  });

  return NextResponse.json({ message: 'Presente reservado com sucesso!' });
}