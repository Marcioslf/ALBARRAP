export const STORE_CONFIG = {
  name: 'ALBARRAP Camisetas',
  tagline: 'Confecção de Roupas & Camisetas Personalizadas',
  whatsappNumber: '556993505894',
  whatsappCatalogUrl: 'https://wa.me/c/556993505894',
  instagramUrl: 'https://www.instagram.com/camisetas_albarrap',
  instagramHandle: '@camisetas_albarrap',
  address: 'Avenida Presidente Tancredo Neves, 5727, BNH',
  cityState: 'Vilhena - RO',
  cep: '76987-247',
  welcomeDiscountCode: 'ALBARRAP10',
  freeShippingMin: 199.00
};

export const CATEGORIES = [
  { id: 'todas', name: 'Todas as Camisetas' },
  { id: 'personalizadas', name: 'Personalizadas' },
  { id: 'oversized', name: 'Oversized Boxy' },
  { id: 'streetwear', name: 'Streetwear' },
  { id: 'estampada', name: 'Estampadas HD' }
];

export const PRODUCTS = [
  {
    id: 'albarrap-2',
    name: 'Camiseta Dabbing Santa "Falla 8"',
    subtitle: 'Edição Especial | Estampa Exclusiva',
    category: 'personalizadas',
    categoryName: 'Camisetas Personalizadas',
    price: 89.90,
    oldPrice: 119.90,
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Mais Vendida',
    image: '/albarrap_falla8_model.png',
    heroModelImage: '/gen_hero_falla8.jpg',
    material: '100% Algodão com Silk Screen de Alta Definição',
    grammage: '200g/m²',
    collar: 'Gola Ribana reforçada ombro a ombro',
    fit: 'Unissex Confortável',
    colors: [
      { id: 'black', name: 'Preto', hex: '#111827', image: '/albarrap_falla8_model.png' },
      { id: 'white', name: 'Branco', hex: '#FFFFFF', image: '/albarrap_merry_christmas.png' }
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    description: 'Camiseta divertida e estilosa com estampa dabbing Santa "Falla 8". Confeccionada na matriz em Vilhena-RO para vendas online e presencial.'
  },
  {
    id: 'albarrap-2',
    name: 'Camiseta Dabbing Santa "Falla 8"',
    subtitle: 'Edição Especial | Estampa Exclusiva',
    category: 'personalizadas',
    categoryName: 'Camisetas Personalizadas',
    price: 89.90,
    oldPrice: 119.90,
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Sucesso de Vendas',
    image: '/albarrap_falla8_model.png',
    heroModelImage: '/gen_hero_falla8.jpg',
    material: '100% Algodão com Silk Screen de Alta Definição',
    grammage: '200g/m²',
    collar: 'Gola Ribana reforçada ombro a ombro',
    fit: 'Unissex Confortável',
    colors: [
      { id: 'black', name: 'Preto', hex: '#111827', image: '/albarrap_falla8_model.png' },
      { id: 'white', name: 'Branco', hex: '#FFFFFF', image: '/albarrap_merry_christmas.png' }
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    description: 'Camiseta divertida e estilosa com estampa dabbing Santa "Falla 8". Confeccionada na matriz em Vilhena-RO para vendas online e presencial.'
  },
  {
    id: 'albarrap-3',
    name: 'Camiseta Streetwear Pro Spray Can',
    subtitle: 'Arte Urbana nas Costas | Marrom Vintage',
    category: 'streetwear',
    categoryName: 'Streetwear Art',
    price: 119.90,
    oldPrice: 149.90,
    rating: 5.0,
    reviewsCount: 92,
    badge: 'Lançamento',
    image: '/albarrap_pro_streetwear.png',
    heroModelImage: '/gen_hero_pro.jpg',
    material: '100% Algodão Heavyweight tom Marrom Ferrugem Vintage',
    grammage: '240g/m²',
    collar: 'Gola Ribana 3.0cm pespontada',
    fit: 'Streetwear Oversized',
    colors: [
      { id: 'maroon', name: 'Marrom Ferrugem Vintage', hex: '#4A2521', image: '/albarrap_pro_streetwear.png' },
      { id: 'black', name: 'Preto Obsidian', hex: '#111827', image: '/albarrap_falla8.png' }
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    description: 'Ilustração urbana em alta definição estampada nas costas com lata de tinta spray PRO. Malha encorpada de alta gramatura com toque amaciado.'
  },
  {
    id: 'albarrap-4',
    name: 'Camiseta Merry Christmas Checkerboard',
    subtitle: 'Linha Festas & Eventos | 100% Algodão',
    category: 'estampada',
    categoryName: 'Estampadas HD',
    price: 89.90,
    oldPrice: 109.90,
    rating: 4.8,
    reviewsCount: 65,
    badge: 'Em Destaque',
    image: '/albarrap_merry_christmas.png',
    heroModelImage: '/gen_hero_merry.jpg',
    material: '100% Algodão Penteado macio e respirável',
    grammage: '190g/m²',
    collar: 'Ribana Fina 2.0cm',
    fit: 'Regular Fit Unissex',
    colors: [
      { id: 'white', name: 'Branco Neve', hex: '#FFFFFF', image: '/albarrap_merry_christmas.png' },
      { id: 'black', name: 'Preto Obsidian', hex: '#111827', image: '/albarrap_falla8.png' }
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Estampa Merry Christmas com fundo xadrez quadriculado e óculos escuros. Perfeita para composição de looks modernos de fim de ano.'
  }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    name: 'Juliana Medeiros',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Há 2 dias',
    sizeBought: 'Comprou Dabbing Santa Falla 8 (Tam M)',
    comment: 'A qualidade da camiseta é surpreendente! O algodão é super macio, a gola não esgarça e o silk ficou perfeito. Entrega super rápida em Vilhena!'
  },
  {
    id: 'rev-2',
    name: 'Carlos Eduardo Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Há 5 dias',
    sizeBought: 'Comprou Pro Spray Can Streetwear (Tam GG)',
    comment: 'Comprei no atacado para nossa equipe. O atendimento da ALBARRAP no WhatsApp foi nota 1000 e as camisetas têm um caimento surreal de bom!'
  },
  {
    id: 'rev-3',
    name: 'Fernanda Oliveira',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Há 1 semana',
    sizeBought: 'Comprou Dabbing Santa Falla 8 (Tam G)',
    comment: 'Fiz a compra pelo WhatsApp e busquei na loja da Tancredo Neves em Vilhena. Muito capricho na embalagem e no tecido. Recomendo de olhos fechados!'
  }
];

export function generateWhatsAppLink(cartItems, grandTotal, customerData, origin = 'WhatsApp Direct') {
  const number = STORE_CONFIG.whatsappNumber;
  let message = `*PEDIDO ONLINE - ${STORE_CONFIG.name}*\n`;
  message += `📍 Vilhena - RO | Instagram: ${STORE_CONFIG.instagramHandle}\n\n`;

  if (cartItems && cartItems.length > 0) {
    message += `*ITENS SELECIONADOS:*\n`;
    cartItems.forEach((item, index) => {
      const colorName = item.selectedColor?.name || 'Padrão';
      const sizeStr = item.selectedSize || 'G';
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Cor: ${colorName} | Tamanho: ${sizeStr}\n`;
      message += `   • Qtd: ${item.quantity}x - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    message += `💰 *VALOR TOTAL:* R$ ${grandTotal.toFixed(2).replace('.', ',')}\n\n`;
  } else {
    message += `Olá, gostaria de saber mais informações sobre as camisetas personalizadas e catálogo em atacado/varejo da ALBARRAP!\n\n`;
  }

  if (customerData?.name) {
    message += `*DADOS DO CLIENTE:*\n`;
    message += `👤 Nome: ${customerData.name}\n`;
    if (customerData.phone) message += `📞 Whats: ${customerData.phone}\n`;
    if (customerData.address) message += `🏡 Endereço: ${customerData.address}, ${customerData.number || 'S/N'}\n`;
    if (customerData.city) message += `🏙️ Cidade: ${customerData.city} - ${customerData.state || 'RO'}\n\n`;
  }

  message += `📍 *Endereço da Loja:* ${STORE_CONFIG.address}, BNH, Vilhena - RO\n`;
  message += `📲 Peça já pelo WhatsApp!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
