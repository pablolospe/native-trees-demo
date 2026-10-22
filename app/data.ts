export type Language = 'es' | 'en';

export interface SpeciesItem {
  id: string;
  name: { es: string; en: string };
  scientificName: string;
  category: 'autóctono' | 'exótico' | 'palmera';
  sizes: string[];
  description: { es: string; en: string };
  image: string;
  badge: { es: string; en: string };
  anchor: string;
}

export interface ServiceItem {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  icon: string;
}

export interface ClientLogo {
  name: string;
  image: string;
}

export const SPECIES_CARDS = [
  {
    id: 'palo-borracho',
    name: 'Palo borracho',
    nameEn: 'Silk Floss Tree',
    scientific: 'Ceiba insignis',
    image: '/assets/palo-borracho.webp',
    link: '/nuestras-especies/arboles#paloborracho',
    category: 'autóctono'
  },
  {
    id: 'lapacho',
    name: 'Lapacho',
    nameEn: 'Pink Lapacho',
    scientific: 'Handroanthus impetiginosus',
    image: '/assets/lapacho-rosado.webp',
    link: '/nuestras-especies/arboles#lapacho',
    category: 'autóctono'
  },
  {
    id: 'arbol-de-papel',
    name: 'Árbol de Papel',
    nameEn: 'Paper Mulberry',
    scientific: 'Broussonetia papyrifera',
    image: '/assets/arbol-de-papel.webp',
    link: '/nuestras-especies/arboles#arbolpapel',
    category: 'exótico'
  },
  {
    id: 'jacaranda',
    name: 'Jacarandá',
    nameEn: 'Jacaranda',
    scientific: 'Jacaranda mimosifolia',
    image: '/assets/jacaranda.webp',
    link: '/nuestras-especies/arboles#jacaranda',
    category: 'autóctono'
  },
  {
    id: 'butia',
    name: 'Butia',
    nameEn: 'Butia Palm',
    scientific: 'Butia capitata',
    image: '/assets/butia.jpg',
    link: '/nuestras-especies/palmeras#butia',
    category: 'palmera'
  },
  {
    id: 'phoenix-canariensis',
    name: 'Phoenix Canariensis',
    nameEn: 'Canary Island Date Palm',
    scientific: 'Phoenix canariensis',
    image: '/assets/phoenix-canariensis.webp',
    link: '/nuestras-especies/palmeras#canariensis',
    category: 'palmera'
  }
];

export const SPECIES_DATA: SpeciesItem[] = [
  {
    id: 'palo-borracho',
    name: { es: 'Palo Borracho', en: 'Silk Floss Tree' },
    scientificName: 'Ceiba insignis / speciosa',
    category: 'autóctono',
    sizes: ['Semi ejemplar', 'Súper ejemplar'],
    description: {
      es: 'Árbol autóctono de silueta icónica y floración impactante. Ideal para grandes parques, rotondas y proyectos paisajísticos de jerarquía.',
      en: 'Iconic native tree with striking blossoms and sculpted trunk. Ideal for grand parks, boulevard centers and premium landscaping projects.'
    },
    image: '/assets/palo-borracho.webp',
    badge: { es: 'Autóctono Destacado', en: 'Featured Native' },
    anchor: 'paloborracho'
  },
  {
    id: 'lapacho-rosado',
    name: { es: 'Lapacho Rosado', en: 'Pink Lapacho' },
    scientificName: 'Handroanthus impetiginosus',
    category: 'autóctono',
    sizes: ['Ejemplar mediano', 'Semi ejemplar', 'Súper ejemplar'],
    description: {
      es: 'Una de las especies más representativas y admiradas del norte argentino, con floración rosada exuberante a fines de invierno.',
      en: 'One of the most admired Argentine native species, boasting exuberant pink blooms at the close of winter.'
    },
    image: '/assets/lapacho-rosado.webp',
    badge: { es: 'Exportación Frecuente', en: 'Top Export' },
    anchor: 'lapacho'
  },
  {
    id: 'jacaranda',
    name: { es: 'Jacarandá', en: 'Jacaranda' },
    scientificName: 'Jacaranda mimosifolia',
    category: 'autóctono',
    sizes: ['Ejemplar mediano', 'Súper ejemplar'],
    description: {
      es: 'Símbolo del paisaje urbano y de las avenidas más distinguidas de Buenos Aires. Floración lila/azulada inconfundible.',
      en: 'Symbol of distinguished avenues across Buenos Aires. Celebrated for its unique lilac-blue springtime canopy.'
    },
    image: '/assets/jacaranda.webp',
    badge: { es: 'Símbolo Regional', en: 'Regional Symbol' },
    anchor: 'jacaranda'
  },
  {
    id: 'arbol-de-papel',
    name: { es: 'Árbol de Papel', en: 'Paper Mulberry' },
    scientificName: 'Broussonetia papyrifera',
    category: 'exótico',
    sizes: ['Semi ejemplar', 'Ejemplar adulto'],
    description: {
      es: 'Especie exótica de rápido desarrollo y gran porte ornamental. Follaje denso y corteza de textura muy distintiva.',
      en: 'Exotic ornamental species of fast canopy development. Dense shade foliage with characteristic fibrous bark.'
    },
    image: '/assets/arbol-de-papel.webp',
    badge: { es: 'Especie Exótica', en: 'Exotic Species' },
    anchor: 'arbolpapel'
  },
  {
    id: 'butia',
    name: { es: 'Palmera Butiá', en: 'Butia Palm' },
    scientificName: 'Butia odorata / capitata',
    category: 'palmera',
    sizes: ['2m a 6m de estípite', 'Súper ejemplar'],
    description: {
      es: 'Palmera nativa sumamente rústica y elegante, de follaje arqueado verde ceniciento, resistente a bajas temperaturas.',
      en: 'Extremely resilient and elegant native palm with silvery arching fronds, highly cold-tolerant.'
    },
    image: '/assets/butia.jpg',
    badge: { es: 'Palmera Nativa', en: 'Native Palm' },
    anchor: 'butia'
  },
  {
    id: 'phoenix-canariensis',
    name: { es: 'Phoenix Canariensis', en: 'Canary Island Date Palm' },
    scientificName: 'Phoenix canariensis',
    category: 'palmera',
    sizes: ['3m a 10m de estípite', 'Súper ejemplar'],
    description: {
      es: 'Palmera de gran porte y copa frondosa, indispensable en accesos principales, avenidas residenciales y countries.',
      en: 'Majestic large palm with a massive crown, quintessential for gated community gates, grand avenues and luxury resorts.'
    },
    image: '/assets/phoenix-canariensis.webp',
    badge: { es: 'Gran Porte', en: 'Grand Scale' },
    anchor: 'canariensis'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'provision',
    title: {
      es: 'Provisión de ejemplares de distintas especies',
      en: 'Supply of specimens across diverse species'
    },
    description: {
      es: 'Producimos, enviamos y trasplantamos palmeras y arboles autóctonos y exóticos de diferentes tamaños. Desde semi a súper ejemplares.',
      en: 'We produce, ship and transplant native and exotic trees and palms across all sizes, from semi to super specimens.'
    },
    icon: 'tree'
  },
  {
    id: 'trasplantes',
    title: {
      es: 'Trasplantes responsables e integrales',
      en: 'Responsible and comprehensive transplants'
    },
    description: {
      es: 'Cuidamos todo el proceso para que los ejemplares sigan su vida en la nueva ubicación donde fueron trasplantados. Trabajamos tanto en casas particulares como en barrios cerrados, municipios, centros comerciales y espacios públicos.',
      en: 'We oversee the full root-to-crown protocol to guarantee survival at the new location, serving estates, developments and municipalities.'
    },
    icon: 'refresh'
  },
  {
    id: 'transporte',
    title: {
      es: 'Servicio de transporte de especies',
      en: 'Specialized tree logistics and transport'
    },
    description: {
      es: 'Contamos con camiones e hidrogruas. Para un transporte seguro y posterior plantación de los ejemplares.',
      en: 'Our own fleet of trucks and heavy-duty hydro-cranes enables secure transit and professional on-site crane planting.'
    },
    icon: 'truck'
  },
  {
    id: 'mantenimiento',
    title: {
      es: 'Mantenimiento integral de espacios verdes',
      en: 'Comprehensive green spaces maintenance'
    },
    description: {
      es: 'Servicios de corte de césped, poda, riego, fumigación y fertilización para grandes desarrollos.',
      en: 'Lawn care, technical canopy pruning, smart irrigation, phytosanitary management and fertilization for major developments.'
    },
    icon: 'shield'
  },
  {
    id: 'recuperacion',
    title: {
      es: 'Recuperación de especies previa a desmontes',
      en: 'Tree rescue prior to authorized clearings'
    },
    description: {
      es: 'Rescatamos árboles y palmeras de desmontes autorizados por el estado y les brindamos un nuevo hogar.',
      en: 'We rescue century-old trees and palms from authorized agricultural clearings, preserving heritage specimens in new landscapes.'
    },
    icon: 'heart'
  }
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Puertos del Lago', image: '/assets/logos-clientes/Puertos-logo.png' },
  { name: 'EDECA', image: '/assets/logos-clientes/edeca-bn.png' },
  { name: 'Goya', image: '/assets/logos-clientes/goya-logo.jpg' },
  { name: 'Centro Comercial Nordelta', image: '/assets/logos-clientes/logo-centro-comercial-nordelta-bn.png' },
  { name: 'Rosetti', image: '/assets/logos-clientes/logo-rosetti-bn.jpg' },
  { name: 'Piattelli Vineyards', image: '/assets/logos-clientes/piattelli.jpg' },
  { name: 'San Miguel', image: '/assets/logos-clientes/san-miguel-logo-bn.png' },
  { name: 'Talar de Pacheco', image: '/assets/logos-clientes/talar-de-pacheco-logo.jpg' }
];
