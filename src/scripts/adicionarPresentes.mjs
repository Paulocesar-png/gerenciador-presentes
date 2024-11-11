import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const presentes = [
    "JOGO DE TALHERES",
    "FAQUEIRO",
    "JOGO DE PRATOS FUNDOS/RASOS",
    "JOGO COPOS",
    "JOGO DE XÍCARAS",
    "JOGO DE PRATOS DE SOBREMESA",
    "PORTA TEMPEROS",
    "TÁBUA DE CORTE",
    "JOGO DE PANELAS",
    "DESCANSO DE PANELA",
    "POTES PORTA MANTIMENTOS",
    "ESCORREDOR DE LOUÇA",
    "RALADOR",
    "PENEIRA",
    "ABRIDOR DE LATAS",
    "SALEIRO/AÇUCAREIRO",
    "FRUTEIRA",
    "FORMAS/ASSADEIRAS",
    "PORTA DETERGENTE",
    "POTES DE USO DIÁRIO/PLÁSTICO",
    "POTES DE USO DIÁRIO/VIDRO",
    "CANECAS",
    "PANOS DE PRATO",
    "RODO DE PIA",
    "DESCASCADOR",
    "FÚNIL",
    "ESCORREDOR DE MACARRÃO/ARROZ",
    "JARRA DE SUCO",
    "PANO DE PIA",
    "BOWLS",
    "CESTO DE PÃO",
    "COPO MEDIDOR",
    "ROLO DE MASSA",
    "LIXEIRA",
    "FORMA DE GELO",
    "GARRAFA TÉRMICA",
    "JOGO AMERICANO",
    "PANELA DE PRESSÃO",
    "SUPORTE COADOR",
    "PIPOQUEIRA",
    "ABRIDOR DE GARRAFA",
    "GARRAFA DE ÁGUA",
    "JOGO DE TAÇAS PARA SUCO/ÁGUA",
    "JOGO TAÇAS PARA VINHO",
    "AMASSADOR DE BATATAS",
    "MOEDOR DE PIMENTA",
    "CORTADOR DE PIZZA",
    "CUMBUCAS/TIGELAS",
    "PORTA PALITO",
    "TÁBUAS DE MADEIRA/PETISQUEIRA",
    "BOLEIRA",
    "MANTEIGUEIRA",
    "SUPORTE PAPEL TOALHA",
    "LUVA TÉRMICA",
    "COLHER DE SORVETE",
    "ABRIDOR DE VINHO",
    "GALHETEIROS",
    "TRAVESSA DE VIDRO",
    "TAPETES",
    "TRITURADOR DE ALHO",
    "SUPORTE GUARDANAPO",
    "SECA SALADA",
    "PORTA ALHO",
    "PORTA XÍCARAS",
    "LATAS PARA CAFÉ/AÇÚCAR",
    "MELEIRA",
    "LEITEIRA",
    "ESPREMEDOR DE LIMÃO/ALHO",
    "PORTA COPOS",
    "SALEIRO DE MESA",
    "FORMA HAMBURGUER",
    "MEDIDORES",
    "PORTA FRIOS",
    "PORTA OVOS",
    "ORGANIZADORES DE GELADEIRA",
    "TESOURA CULINÁRIA",
    "COLHER DE PAU",
    "PEGADOR",
    "ESPÁTULA DE BOLO",
    "COLHER PARA SUCO",
    "FORMA SILICONE AIRFRYER",
    "QUEIJEIRA",
    "ESCOVA DE LIMPEZA",
    "PRENDEDOR DE EMBALAGEM",
    "MOLHEIRA",
    "FRIGIDEIRAS",
    "PORTA PÃO",
    "RAMEKINS",
    "UTENSÍLIOS PARA QUEIJO",
    "SALADEIRA",
    "BANDEJA DE CAFÉ DA MANHÃ",
    "PRENSA FRANCESA",
    "CUSCUZEIRA",
    "FILTRO DE ÁGUA",
    "AVENTAL",
    "TELA MOSQUITEIRO",
    "JOGO DE FRIGIDEIRA",
    "LIQUIDIFICADOR",
    "MIXER",
    "PROCESSADOR",
    "ESPREMEDOR DE FRUTAS",
    "SANDUICHEIRA",
    "BATEDEIRA",
    "CAFETEIRA",
    "KIT EMBALAGEM SHAMPOO/CONDICIONADOR",
    "TOALHAS DE BANHO",
    "TOALHAS DE ROSTO",
    "ESPELHO",
    "CESTO DE ROUPA",
    "ESCOVA SANITÁRIA",
    "TAPETE",
    "KIT ACESSÓRIOS PARA BANHEIRO",
    "KIT LAVABO",
    "LIXEIRA",
    "BALDES",
    "CESTO E PRENDEDORES DE ROUPAS",
    "PORTA SABÃO EM PÓ/AMACIANTE",
    "FERRO DE PASSAR",
    "LIXEIRAS",
    "RODO/VASSOURA/PÁ",
    "PANOS DE CHÃO",
    "TÁBUA DE PASSAR ROUPA",
    "MOP ESFREGÃO",
    "VARAL",
    "CABIDES",
    "EDREDOM",
    "COBRE LEITO",
    "JOGO DE LENÇOL",
    "MANTA",
    "TRAVESSEIROS",
    "BORRIFADOR"
  ];
  
async function adicionarPresentes() {
  try {
    for (const presente of presentes) {
      await prisma.presentes.create({
        data: {
          nome_presente: presente,
          disponivel: true, // Define como true para todos os presentes
          nome_pessoa: null, // Define como null para todos os presentes inicialmente
        },
      });
      console.log(`Presente "${presente}" adicionado com sucesso!`);
    }
    console.log('Todos os presentes foram adicionados com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar presentes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chame a função para adicionar os presentes
adicionarPresentes();