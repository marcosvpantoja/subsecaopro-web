export type Lawyer = {
  id: string;
  name: string;
  oab: string;
 city: string;
  specialties: string[];
  bio: string;
  rating: number;
  online: boolean;
  whatsapp: string;
  email: string;
  address: string;
  availability: string;
  color: string;
  initials: string;
  photo: string;
};

export const lawyers: Lawyer[] = [
 { id: "1", name: "Dra. Ana Carolina Ferreira", oab: "OAB/SP 234.567", city: "Centro", specialties: ["Família", "Sucessões"], bio: "Especialista em Direito de Família com 15 anos de experiência em divórcios consensuais, inventários e planejamento sucessório.", rating: 4.9, online: true, whatsapp: "19999990001", email: "ana.ferreira@adv.exemplo.org.br", address: "Av. Rebouças, 1020 — Centro, Sumaré", availability: "Seg–Sex, 9h–18h", color: "from-rose-400 to-rose-600", initials: "AF", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&auto=format&fit=crop" },
 { id: "2", name: "Dr. Ricardo Alves Santos", oab: "OAB/SP 189.432", city: "Maria Antônia", specialties: ["Trabalhista"], bio: "Defesa de trabalhadores em rescisões, verbas e ações coletivas. Mais de 500 causas trabalhistas conduzidas.", rating: 4.8, online: true, whatsapp: "19999990002", email: "ricardo.santos@adv.exemplo.org.br", address: "Rua Humaitá, 233 — Maria Antônia, Sumaré", availability: "Seg–Sáb, 8h–19h", color: "from-blue-400 to-blue-600", initials: "RS", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80&auto=format&fit=crop" },
 { id: "3", name: "Dra. Juliana Mendes Costa", oab: "OAB/SP 312.890", city: "Nova Veneza", specialties: ["Civil", "Imobiliário"], bio: "Contratos, locações, regularização de imóveis e usucapião. Atendimento humanizado e técnico.", rating: 4.7, online: false, whatsapp: "19999990003", email: "juliana.mendes@adv.exemplo.org.br", address: "Rua Orozimbo Maia, 88 — Nova Veneza, Sumaré", availability: "Seg–Sex, 10h–17h", color: "from-emerald-400 to-emerald-600", initials: "JM", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80&auto=format&fit=crop" },
 { id: "4", name: "Dr. Marcos Henrique Lima", oab: "OAB/SP 98.234", city: "Matão", specialties: ["Penal"], bio: "Defesa criminal estratégica em todas as instâncias. 25 anos de experiência em tribunais.", rating: 4.9, online: true, whatsapp: "19999990004", email: "marcos.lima@adv.exemplo.org.br", address: "Rua Barão de Jaguara, 1500 — Matão, Sumaré", availability: "Seg–Sex, 9h–18h", color: "from-slate-500 to-slate-700", initials: "ML", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&q=80&auto=format&fit=crop" },
 { id: "5", name: "Dra. Fernanda Oliveira", oab: "OAB/SP 267.123", city: "Picerno", specialties: ["Tributário", "Empresarial"], bio: "Consultoria tributária para empresas, recuperação de créditos e planejamento fiscal.", rating: 4.8, online: true, whatsapp: "19999990005", email: "fernanda.oliveira@adv.exemplo.org.br", address: "Av. Invernada, 1200 — Picerno, Sumaré", availability: "Seg–Sex, 9h–18h", color: "from-amber-400 to-amber-600", initials: "FO", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop" },
 { id: "6", name: "Dr. Gabriel Souza Pinto", oab: "OAB/SP 145.678", city: "Parque Bandeirantes", specialties: ["Consumidor"], bio: "Defesa do consumidor em compras, viagens, planos de saúde e telefonia.", rating: 4.6, online: true, whatsapp: "19999990006", email: "gabriel.pinto@adv.exemplo.org.br", address: "Rua Antônio Tedesco, 555 — Parque Bandeirantes, Sumaré", availability: "Seg–Sex, 9h–17h", color: "from-cyan-400 to-cyan-600", initials: "GP", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop" },
 { id: "7", name: "Dra. Camila Rocha Neves", oab: "OAB/SP 301.456", city: "Jardim Bordon", specialties: ["Previdenciário"], bio: "Aposentadorias, benefícios e revisões de INSS. Atendimento online em todo o Brasil.", rating: 4.9, online: true, whatsapp: "19999990007", email: "camila.neves@adv.exemplo.org.br", address: "Av. Norte-Sul, 1900 — Jardim Bordon, Sumaré", availability: "Seg–Sex, 8h–18h", color: "from-violet-400 to-violet-600", initials: "CN", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&auto=format&fit=crop" },
 { id: "8", name: "Dr. Thiago Barbosa Reis", oab: "OAB/SP 378.901", city: "Macieira", specialties: ["Digital", "Startups"], bio: "Direito digital, LGPD, contratos de tecnologia e estruturação de startups.", rating: 5.0, online: true, whatsapp: "19999990008", email: "thiago.reis@adv.exemplo.org.br", address: "Rua Exemplo, 100 — Macieira, Sumaré", availability: "Seg–Sex, 10h–19h", color: "from-indigo-400 to-indigo-600", initials: "TR", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80&auto=format&fit=crop" },
];

export type Room = {
  id: string;
  name: string;
  description: string;
  features: string[];
  capacity: number;
  pricePerHour: number;
  free: boolean;
  status: "available" | "occupied" | "request";
  color: string;
};

export const rooms: Room[] = [
  { id: "r1", name: "Sala de Reunião Executive", description: "Ambiente reservado para reuniões profissionais", capacity: 6, features: ["Ar-condicionado", "TV 55\"", "Wi-Fi"], pricePerHour: 40, free: false, status: "available", color: "from-blue-500 to-indigo-600" },
  { id: "r2", name: "Sala de Audiência Formal", description: "Mesa oval para audiências e mediações", capacity: 12, features: ["Mesa oval", "Gravação", "Microfones"], pricePerHour: 70, free: false, status: "available", color: "from-slate-600 to-slate-800" },
  { id: "r3", name: "Coworking Aberto", description: "Estações compartilhadas para advogados inscritos", capacity: 20, features: ["Wi-Fi", "Café incluso", "Estações individuais"], pricePerHour: 0, free: true, status: "available", color: "from-emerald-500 to-teal-600" },
  { id: "r4", name: "Sala de Videoconferência", description: "Setup completo para audiências online", capacity: 4, features: ["Setup pro", "Ring light", "Webcam 4K"], pricePerHour: 35, free: false, status: "occupied", color: "from-rose-500 to-pink-600" },
  { id: "r5", name: "Auditório Principal", description: "Para eventos, palestras e cursos", capacity: 80, features: ["Projetor", "Som profissional", "Palco"], pricePerHour: 200, free: false, status: "request", color: "from-amber-500 to-orange-600" },
];

export type Post = { id: string; date: string; image: string; photo: string; caption: string; likes: number };

export const posts: Post[] = [
  { id: "p1", date: "há 2 dias", image: "from-blue-400 to-indigo-500", photo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80&auto=format&fit=crop", caption: "🎉 Nova sala de coworking inaugurada! Agora temos 3 salas disponíveis para os inscritos. Venha conhecer e reserve a sua.", likes: 47 },
  { id: "p2", date: "há 4 dias", image: "from-slate-500 to-slate-700", photo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&auto=format&fit=crop", caption: "📢 Eleições da subseção abertas — confira os candidatos no site oficial e participe da votação.", likes: 89 },
  { id: "p3", date: "há 6 dias", image: "from-amber-400 to-orange-500", photo: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=900&q=80&auto=format&fit=crop", caption: "⚖️ Palestra gratuita: Reforma Trabalhista 2026 — inscreva-se pelo app. Vagas limitadas.", likes: 124 },
  { id: "p4", date: "há 1 semana", image: "from-emerald-400 to-teal-500", photo: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&q=80&auto=format&fit=crop", caption: "🤝 Novo parceiro: Clínica OdontoJur com 30% de desconto para advogados inscritos.", likes: 32 },
  { id: "p5", date: "há 2 semanas", image: "from-rose-400 to-pink-500", photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop", caption: "📋 Prazo: entrega de documentos para a Comissão de Ética até 30/06. Não deixe para a última hora.", likes: 18 },
  { id: "p6", date: "há 3 semanas", image: "from-violet-400 to-purple-500", photo: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop", caption: "✨ Programa de mentoria para advogados recém-formados — inscrições abertas.", likes: 76 },
];

// ──────────────────────────────────────────────────────────────
// PATROCINADORES (Sponsors)
// Aparecem no carrossel da Home. Pagam por exposição/branding.
// Cadastro no admin: título, subtítulo, CTA, imagem, link de destino, tier.
// ──────────────────────────────────────────────────────────────
export type Sponsor = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  color: string;
  photo: string;
  to: string;
  params?: Record<string, string>;
  tier?: "ouro" | "prata" | "bronze";
};

export const sponsors: Sponsor[] = [
  { id: "s1", title: "Unimed Campinas", subtitle: "Condições exclusivas para advogados OAB", cta: "Saiba mais", color: "from-emerald-700/85 to-green-900/85", photo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80&auto=format&fit=crop", to: "/club/$id", params: { id: "c1" }, tier: "ouro" },
  { id: "s2", title: "JuriSpace Coworking", subtitle: "Reserve seu espaço com 20% off", cta: "Reservar", color: "from-blue-700/85 to-indigo-900/85", photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop", to: "/rooms", tier: "prata" },
  { id: "s3", title: "Escola de Direito EAD", subtitle: "40% off para inscritos OAB", cta: "Matricular", color: "from-rose-700/85 to-orange-900/85", photo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80&auto=format&fit=crop", to: "/club/$id", params: { id: "c3" }, tier: "bronze" },
];

/** @deprecated use `sponsors` — mantido para compatibilidade temporária */
export const banners = sponsors;

// ──────────────────────────────────────────────────────────────
// PARCEIROS (Partners) — Clube de Benefícios
// Oferecem CUPONS / DESCONTOS aos advogados inscritos. NÃO aparecem na Home.
// Cadastro no admin: nome, categoria, desconto, código de cupom, validade,
// descrição, instruções de resgate.
// ──────────────────────────────────────────────────────────────
export type Partner = {
  id: string;
  name: string;
  category: "Saúde" | "Educação" | "Alimentação" | "Tecnologia" | "Serviços";
  discount: string;
  couponCode?: string;
  description: string;
  validity: string;
  color: string;
};

export const partners: Partner[] = [
  { id: "c1", name: "Unimed Campinas", category: "Saúde", discount: "20%", description: "Desconto no plano empresarial para advogados inscritos.", validity: "31/12/2026", color: "from-emerald-500 to-green-700" },
  { id: "c2", name: "OdontoJur Clínica", category: "Saúde", discount: "30%", description: "Procedimentos odontológicos com desconto exclusivo.", validity: "31/12/2026", color: "from-teal-500 to-cyan-700" },
  { id: "c3", name: "Escola Damásio", category: "Educação", discount: "40%", description: "Pós-graduação em diversas áreas do Direito.", validity: "31/12/2026", color: "from-blue-500 to-indigo-700" },
  { id: "c4", name: "LFG Cursos", category: "Educação", discount: "35%", description: "Cursos preparatórios para concursos e OAB.", validity: "31/12/2026", color: "from-indigo-500 to-violet-700" },
  { id: "c5", name: "Restaurante Escala", category: "Alimentação", discount: "15%", description: "Almoço executivo com desconto de segunda a sexta.", validity: "31/12/2026", color: "from-amber-500 to-orange-600" },
  { id: "c6", name: "iFood Pro", category: "Alimentação", discount: "R$20", description: "Crédito no primeiro pedido para advogados OAB.", validity: "31/12/2026", color: "from-rose-500 to-red-600" },
  { id: "c7", name: "Microsoft 365", category: "Tecnologia", discount: "25%", description: "Desconto no plano anual com benefícios profissionais.", validity: "31/12/2026", color: "from-sky-500 to-blue-700" },
  { id: "c8", name: "DocuSign", category: "Tecnologia", discount: "30%", description: "Assinatura eletrônica com validade jurídica.", validity: "31/12/2026", color: "from-yellow-500 to-amber-600" },
  { id: "c9", name: "Cartório Digital", category: "Serviços", discount: "10%", description: "Reconhecimentos e autenticações online.", validity: "31/12/2026", color: "from-slate-500 to-slate-700" },
  { id: "c10", name: "Gráfica JuriPrint", category: "Serviços", discount: "20%", description: "Impressões, encadernações e materiais jurídicos.", validity: "31/12/2026", color: "from-violet-500 to-purple-700" },
];

export type Notification = { id: string; icon: string; text: string; date: string; forLawyer?: boolean; href: string };

export const notifications: Notification[] = [
  { id: "n1", icon: "📅", text: "Evento: Palestra sobre Direito Digital — 12/06", date: "há 1h", href: "/about" },
  { id: "n2", icon: "🔔", text: "Novo comunicado da diretoria disponível", date: "há 3h", href: "/about" },
  { id: "n3", icon: "✅", text: "Sua reserva da Sala Executive foi confirmada", date: "ontem", forLawyer: true, href: "/reservations" },
];

export const currentLawyer = {
  id: "8",
  name: "Dr. Thiago Barbosa Reis",
  oab: "OAB/SP 378.901",
  specialty: "Direito Digital e Startups",
  city: "Macieira",
  email: "thiago.reis@adv.exemplo.org.br",
  whatsapp: "(19) 99999-0008",
  bio: "Direito digital, LGPD, contratos de tecnologia e estruturação de startups.",
  active: true,
  initials: "TR",
};

export type Reservation = {
  id: string;
  roomName: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "pending";
  amount: number;
};

export const myReservations: Reservation[] = [
  { id: "rs1", roomName: "Sala de Reunião Executive", date: "12/05/2026", time: "14h–16h", status: "confirmed", amount: 83.2 },
  { id: "rs2", roomName: "Sala de Videoconferência", date: "28/04/2026", time: "10h–11h", status: "confirmed", amount: 36.4 },
  { id: "rs3", roomName: "Coworking Aberto", date: "15/04/2026", time: "09h–13h", status: "confirmed", amount: 0 },
  { id: "rs4", roomName: "Sala Executive", date: "02/06/2026", time: "15h–17h", status: "pending", amount: 83.2 },
];

export const transactions = myReservations.filter((r) => r.amount > 0);

export const articles = [
  { slug: "consumidor-defeito", title: "Direitos do Consumidor: o que fazer quando um produto tem defeito", icon: "🛒", summary: "Entenda seus direitos e prazos para reclamar de produtos com defeito." },
  { slug: "pensao-alimenticia", title: "Pensão Alimentícia: como funciona e como solicitar", icon: "👨‍👩‍👧", summary: "Quem tem direito, como calcular e quais documentos são necessários." },
  { slug: "demissao-justa-causa", title: "Demissão sem Justa Causa: quais são seus direitos", icon: "💼", summary: "Verbas rescisórias, FGTS, seguro-desemprego e prazos." },
  { slug: "inventario-heranca", title: "Inventário e Herança: por onde começar", icon: "📜", summary: "Documentos, prazos e diferença entre judicial e extrajudicial." },
  { slug: "violencia-domestica", title: "Violência Doméstica: onde buscar ajuda jurídica", icon: "🛡️", summary: "Medidas protetivas, Lei Maria da Penha e atendimento gratuito." },
  { slug: "inquilino-proprietario", title: "Inquilino vs Proprietário: direitos na locação de imóvel", icon: "🏠", summary: "Reajustes, vistorias, multas e rescisão de contrato." },
];