'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SPECIES_DATA, SPECIES_CARDS, SERVICES_DATA, CLIENT_LOGOS, type Language, type SpeciesItem } from './data';

interface CartItem {
  species: SpeciesItem;
  quantity: number;
  size: string;
}

export default function NativeTreesHome() {
  const [lang, setLang] = useState<Language>('es');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [speciesDropdownOpen, setSpeciesDropdownOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'autóctono' | 'exótico' | 'palmera'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const [bannerTransform, setBannerTransform] = useState({ scale: 1.05, translateY: 0 });

  // Watch scroll for navbar sticky state and parallax zoom/translate on banner1
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          if (bannerRef.current) {
            const rect = bannerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calcule progress when banner enters viewport (-1 = entering from bottom, 1 = leaving to top)
            if (rect.bottom > 0 && rect.top < windowHeight) {
              const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
              // progress goes from 0 (just entering bottom) to 1 (just exiting top)
              // Zoom effect: expands smoothly from 1.05 to 1.30
              // Translate effect: subtle vertical movement (-40px to +40px)
              const scale = 1.08 + progress * 0.22;
              const translateY = (progress - 0.5) * 70;
              setBannerTransform({ scale, translateY });
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic carousel advances every 7 seconds unless paused on hover
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // Ensure video plays smoothly when slide 0 is active
  useEffect(() => {
    if (activeSlide === 0 && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [activeSlide]);

  // Content dictionary
  const t = {
    es: {
      nav: {
        home: 'Home',
        nosotros: 'NOSOTROS',
        especies: 'NUESTRAS ESPECIES',
        arboles: 'Árboles',
        palmeras: 'Palmeras',
        exportacion: 'Exportación',
        obras: 'OBRAS',
        servicios: 'SERVICIOS',
        medioambiente: 'CUIDANDO EL MEDIOAMBIENTE',
        contacto: 'CONTACTO'
      },
      heroSlides: [
        {
          id: 0,
          hasVideo: true,
          tagline: 'MOVEMOS NATURALEZA\nCREAMOS PAISAJE',
          title: 'NATIVE',
          subtitle: 'Contamos con arboles autóctonos y exóticos y palmeras de diferentes tamaños listos para ser trasplantados.',
          cta: 'QUIERO CONOCER MÁS',
          bg: '/assets/hero-slide-1.webp'
        },
        {
          id: 1,
          hasVideo: false,
          tagline: 'TRAYECTORIA Y EXPERIENCIA',
          title: 'MANTENIMIENTO INTEGRAL\nDE ESPACIOS VERDES',
          subtitle: 'Nuestro equipo esta altamente capacitado para realizar tareas de mantenimiento en parques, plazas, bulevares, barrios cerrados.',
          cta: 'QUIERO CONOCER MÁS',
          bg: '/assets/hero-slide-2.webp'
        },
        {
          id: 2,
          hasVideo: false,
          tagline: 'DE ARGENTINA AL RESTO DEL MUNDO',
          title: 'LÍDERES EN EXPORTACIÓN',
          subtitle: 'Llevamos a todas las latitudes especies únicas de la región, para ayudar a crear espacios de gran distinción y lujo.',
          cta: 'QUIERO CONOCER MÁS',
          bg: '/assets/hero-slide-3.webp'
        },
        {
          id: 3,
          hasVideo: false,
          tagline: 'PRODUCCIÓN DE ESPECIES',
          title: 'CONTAMOS CON UN GRAN\nVIVERO PROPIO',
          subtitle: 'Producimos más de 80.000 arboles y palmeras cada año, listos para ser plantados en jardines, barrios y grandes desarrollos, con la calidad que nos distingue.',
          cta: 'QUIERO CONOCER MÁS',
          bg: '/assets/hero-slide-4.webp'
        }
      ],
      services: {
        tag: 'QUÉ HACEMOS',
        heading: 'Nuestros servicios en Argentina',
        verMas: 'VER MÁS'
      },
      banner1: {
        quote: 'Somos los principales exportadores de árboles autóctonos y palmeras de Argentina, ofreciendo especies únicas a importantes clientes en Europa, Asia y Medio Oriente'
      },
      catalog: {
        tag: 'CATÁLOGO ONLINE Y COTIZADOR B2B',
        heading: 'Nuestras Especies',
        subtitle: 'Ejemplares de vivero propio, aclimatados y preparados para trasplante inmediato.',
        searchPlaceholder: 'Buscar por nombre común o científico...',
        filterAll: 'Todas las especies',
        filterNative: 'Árboles Autóctonos',
        filterExotic: 'Exóticos',
        filterPalm: 'Palmeras',
        addToQuote: 'Agregar a Cotización B2B',
        selectSize: 'Seleccionar porte:',
        inQuote: 'En la lista de cotización'
      },
      quoteDrawer: {
        title: 'Solicitud de Cotización B2B',
        subtitle: 'Armá tu pedido mayorista para obras, parquización o exportación:',
        empty: 'No has seleccionado ejemplares aún. Navegá el catálogo y sumá especies.',
        totalItems: 'Total de especies a cotizar:',
        whatsappBtn: 'Enviar Consulta por WhatsApp',
        close: 'Cerrar'
      },
      about: {
        tag: 'CONOCENOS',
        heading: 'Sobre nosotros',
        subTag: 'SOBRE',
        subTitle: 'Native Trees',
        p1: 'Somos una empresa argentina dedicada a la producción, parquización y mantenimiento de especies nativas de la región.',
        p2: 'Ofrecemos a nuestros clientes, tanto a nivel local como internacional, árboles autóctonos, exóticos y palmeras de gran calidad para generar conciencia sobre la importancia de los espacios verdes.',
        cta: 'QUIERO CONOCER MÁS',
        pillars: [
          { title: 'RESPONSABILIDAD\nAMBIENTAL', desc: 'Recuperamos cientos de especies de desmontes agrícolas autorizados' },
          { title: 'CALIDAD DE\nEXPORTACIÓN', desc: 'Nuestros árboles y palmeras ya están en más de 10 países de diferentes continentes' },
          { title: 'TRAYECTORIA\nY PRESTIGIO', desc: 'Contamos con más de 20 años de experiencia y un polo de producción propio' }
        ]
      },
      clients: {
        heading: 'Nos eligen'
      },
      contact: {
        tag: 'CONSULTÁ CON NUESTROS EXPERTOS',
        heading: 'Contactanos',
        subtitle: 'Damos vida a gran cantidad de espacios y los hacemos únicos',
        btnSubmit: 'QUIERO QUE ME CONTACTEN',
        officesTitle: 'Oficinas:',
        officesVal: 'Av. Benavidez 92, Benavidez, Provincia de Buenos Aires, Argentina',
        phones: [
          { area: 'Ventas - Interior del país', num: '+54 9 3777 27-0470' },
          { area: 'Ventas', num: '+54 9 11 3510-8014' },
          { area: 'Ventas', num: '+54 9 11 2657-2391' },
          { area: 'Logística', num: '+54 9 11 5420-6122' }
        ],
        email: 'info@nativetrees.com.ar'
      }
    },
    en: {
      nav: {
        home: 'Home',
        nosotros: 'ABOUT US',
        especies: 'OUR SPECIES',
        arboles: 'Trees',
        palmeras: 'Palms',
        exportacion: 'Export',
        obras: 'PROJECTS',
        servicios: 'SERVICES',
        medioambiente: 'SUSTAINABILITY',
        contacto: 'CONTACT'
      },
      heroSlides: [
        {
          id: 0,
          hasVideo: true,
          tagline: 'WE MOVE NATURE\nWE CREATE LANDSCAPES',
          title: 'NATIVE',
          subtitle: 'Supplying native, exotic trees and grand palms across all developmental stages, ready for immediate transplant.',
          cta: 'LEARN MORE',
          bg: '/assets/hero-slide-1.webp'
        },
        {
          id: 1,
          hasVideo: false,
          tagline: 'PRESTIGE & EXPERTISE',
          title: 'COMPREHENSIVE GREEN\nSPACES MAINTENANCE',
          subtitle: 'Our specialized crews deliver high-tier maintenance across public parks, private communities and master-planned developments.',
          cta: 'LEARN MORE',
          bg: '/assets/hero-slide-2.webp'
        },
        {
          id: 2,
          hasVideo: false,
          tagline: 'FROM ARGENTINA TO THE WORLD',
          title: 'LEADERS IN EXPORT',
          subtitle: 'Delivering exceptional regional botanical specimens to Europe, Asia, and the Middle East with certified phytosanitary standards.',
          cta: 'LEARN MORE',
          bg: '/assets/hero-slide-3.webp'
        },
        {
          id: 3,
          hasVideo: false,
          tagline: 'SPECIMEN PROPAGATION',
          title: 'EXTENSIVE ACCREDITED\nNURSERY FACILITIES',
          subtitle: 'Producing over 80,000 trees and palms yearly, nurtured specifically for master developments and luxury architecture.',
          cta: 'LEARN MORE',
          bg: '/assets/hero-slide-4.webp'
        }
      ],
      services: {
        tag: 'WHAT WE DO',
        heading: 'Our Services in Argentina',
        verMas: 'SEE MORE'
      },
      banner1: {
        quote: 'We are the leading exporters of native trees and palms from Argentina, offering unique specimens to prominent clients in Europe, Asia and the Middle East.'
      },
      catalog: {
        tag: 'ONLINE CATALOG & B2B QUOTATION ENGINE',
        heading: 'Our Available Species',
        subtitle: 'Estate-grown nursery specimens, hardened and pre-conditioned for high-survival transplant.',
        searchPlaceholder: 'Search by common or scientific name...',
        filterAll: 'All Species',
        filterNative: 'Native Trees',
        filterExotic: 'Exotics',
        filterPalm: 'Palms',
        addToQuote: 'Add to B2B Quote',
        selectSize: 'Select caliber/size:',
        inQuote: 'Added to Quote List'
      },
      quoteDrawer: {
        title: 'B2B Quotation Request',
        subtitle: 'Build your wholesale list for projects, estates or export containers:',
        empty: 'No specimens selected yet. Browse the catalog and add species.',
        totalItems: 'Total specimen lines in quote:',
        whatsappBtn: 'Send Request via WhatsApp',
        close: 'Close'
      },
      about: {
        tag: 'GET TO KNOW US',
        heading: 'About us',
        subTag: 'ABOUT',
        subTitle: 'Native Trees',
        p1: 'We are an Argentine enterprise dedicated to propagating, transplanting, and maintaining regional flora with over 20 years of botanical leadership.',
        p2: 'Supplying prominent domestic and global developments with mature specimens that foster environmental stewardship and distinctive architecture.',
        cta: 'LEARN MORE',
        pillars: [
          { title: 'ENVIRONMENTAL\nSTEWARDSHIP', desc: 'Rescuing hundreds of heritage trees from authorized agricultural clearings' },
          { title: 'EXPORT\nBENCHMARK', desc: 'Our specimens thrive in more than 10 countries across different continents' },
          { title: 'TWO DECADES\nOF PRESTIGE', desc: 'Over 20 years of experience and our own specialized nursery facility' }
        ]
      },
      clients: {
        heading: 'Trusted by'
      },
      contact: {
        tag: 'CONSULT WITH OUR EXPERTS',
        heading: 'Contact Us',
        subtitle: 'Breathing life into expansive environments, creating timeless landscapes',
        btnSubmit: 'REQUEST CONTACT',
        officesTitle: 'Offices:',
        officesVal: 'Av. Benavidez 92, Benavidez, Buenos Aires Province, Argentina',
        phones: [
          { area: 'Wholesale & Regional', num: '+54 9 3777 27-0470' },
          { area: 'Sales', num: '+54 9 11 3510-8014' },
          { area: 'Sales', num: '+54 9 11 2657-2391' },
          { area: 'Logistics', num: '+54 9 11 5420-6122' }
        ],
        email: 'info@nativetrees.com.ar'
      }
    }
  }[lang];

  // Filtering for the interactive catalog
  const filteredSpecies = SPECIES_DATA.filter((item) => {
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.name[lang].toLowerCase().includes(q) ||
      item.scientificName.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const addToCart = (species: SpeciesItem, size: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.species.id === species.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.species.id === species.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { species, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.species.id === id && item.size === size) {
            const next = item.quantity + delta;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const generateWhatsAppMessage = () => {
    const intro = lang === 'es'
      ? 'Hola Native Trees, quiero cotizar los siguientes ejemplares para mi proyecto:\n\n'
      : 'Hello Native Trees, I would like to request a quotation for the following specimens:\n\n';
    
    const itemsList = cart
      .map((i, idx) => `${idx + 1}. *${i.species.name[lang]}* (${i.species.scientificName}) - Porte: ${i.size} - Cantidad: ${i.quantity}`)
      .join('\n');
    
    const outro = lang === 'es'
      ? '\n\nPor favor confirmar disponibilidad y cotización.'
      : '\n\nPlease confirm availability and quotation details.';

    return encodeURIComponent(intro + itemsList + outro);
  };

  return (
    <div className="min-h-screen bg-white text-[#333333] font-raleway selection:bg-[#646945] selection:text-white">
      {/* 🧭 WP-IDENTICAL NAVBAR: Pegada exactamente al top (top-0) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 py-2 shadow-lg backdrop-blur-md'
            : 'bg-black/55 py-3 md:py-4'
        }`}
      >
        <div className="max-w-310 mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo identical to WP: logo-sticky.png */}
          <a href="#home" className="flex items-center shrink-0 transition hover:opacity-90">
            <Image
              src="/assets/logo-sticky.png"
              alt="Logo"
              width={75}
              height={75}
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-9 sm:h-11' : 'h-11 sm:h-14'
              }`}
              priority
            />
          </a>

          {/* WP Exact Navigation: Alineado a la derecha como en WP, centrado vertical perfecto */}
          <nav className="hidden lg:flex items-center flex-nowrap font-montserrat font-bold text-[12px] tracking-[0.03em] uppercase text-white whitespace-nowrap">
            <a
              href="#home"
              className="py-3 px-3 text-[#c4c3aa] hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.home}
            </a>
            <Link
              href="/nosotros"
              className="py-3 px-3 hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.nosotros}
            </Link>

            {/* Submenu "NUESTRAS ESPECIES" con caret */}
            <div
              className="relative group shrink-0 flex items-center"
              onMouseEnter={() => setSpeciesDropdownOpen(true)}
              onMouseLeave={() => setSpeciesDropdownOpen(false)}
            >
              <a
                href="#especies"
                className="py-3 px-3 hover:text-[#c4c3aa] transition-colors inline-flex items-center justify-center gap-1 cursor-pointer shrink-0 leading-none"
              >
                <span>{t.nav.especies}</span>
                <span className="text-[10px]">▾</span>
              </a>
              {speciesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-44 z-50">
                  <div className="bg-[#121510] border border-white/10 rounded-sm shadow-xl py-2 text-xs font-montserrat font-semibold normal-case">
                    <Link
                      href="/nuestras-especies/arboles"
                      onClick={() => setSpeciesDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-[#646945] hover:text-white text-stone-200 transition"
                    >
                      {t.nav.arboles}
                    </Link>
                    <Link
                      href="/nuestras-especies/palmeras"
                      onClick={() => setSpeciesDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-[#646945] hover:text-white text-stone-200 transition"
                    >
                      {t.nav.palmeras}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/exportacion"
              className="py-3 px-3 hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.exportacion}
            </Link>
            <Link
              href="/nuestras-obras"
              className="py-3 px-3 hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.obras}
            </Link>
            <Link
              href="/servicios"
              className="py-3 px-3 hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.servicios}
            </Link>
            <Link
              href="/cuidando-el-medioambiente"
              className="py-3 px-3 hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.medioambiente}
            </Link>
            <a
              href="#contacto"
              className="py-3 px-3 hover:text-[#c4c3aa] transition-colors shrink-0 flex items-center justify-center text-center leading-none"
            >
              {t.nav.contacto}
            </a>

            {/* Selector de idioma centrado con separador vertical idéntico a WP */}
            <div className="relative inline-flex items-center pl-3 ml-2 border-l border-white/30 shrink-0 leading-none">
              <button
                onClick={() => setLang('es')}
                className={`py-1 px-1.5 cursor-pointer transition-colors flex items-center justify-center text-center ${
                  lang === 'es' ? 'text-[#c4c3aa] font-bold' : 'text-white hover:text-[#c4c3aa]'
                }`}
              >
                ES
              </button>
              <span className="text-white/40 px-1">|</span>
              <button
                onClick={() => setLang('en')}
                className={`py-1 px-1.5 cursor-pointer transition-colors flex items-center justify-center text-center ${
                  lang === 'en' ? 'text-[#c4c3aa] font-bold' : 'text-white hover:text-[#c4c3aa]'
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Animated Hamburger Icon */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 transition"
              aria-label="Toggle navigation"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 transform origin-left ${
                    mobileMenuOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-white rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0 -translate-x-2' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 transform origin-left ${
                    mobileMenuOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Elegant Animated Mobile Menu Accordion / Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'max-h-125 opacity-100 border-t border-white/10' : 'max-h-0 opacity-0 border-t-0'
          } bg-black/95 backdrop-blur-xl`}
        >
          <div className="px-6 pt-5 pb-6 space-y-3.5 text-xs uppercase font-montserrat tracking-widest text-white">
            {[
              { href: '#home', label: t.nav.home, active: true },
              { href: '/nosotros', label: t.nav.nosotros },
              { href: '#especies', label: t.nav.especies },
              { href: '/exportacion', label: t.nav.exportacion },
              { href: '/nuestras-obras', label: t.nav.obras },
              { href: '/servicios', label: t.nav.servicios },
              { href: '/cuidando-el-medioambiente', label: t.nav.medioambiente },
              { href: '#contacto', label: t.nav.contacto },
            ].map((item, idx) => (
              <div
                key={item.href}
                className={mobileMenuOpen ? 'animate-menu-item' : ''}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 transition-colors ${
                      item.active ? 'text-[#c4c3aa] font-bold' : 'text-stone-300 hover:text-[#c4c3aa]'
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-stone-300 hover:text-[#c4c3aa] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div
              className={`pt-4 border-t border-white/10 flex items-center gap-3 ${
                mobileMenuOpen ? 'animate-menu-item' : ''
              }`}
              style={{ animationDelay: '360ms' }}
            >
              <span className="text-[11px] text-stone-400 normal-case tracking-normal">Idioma:</span>
              <button
                onClick={() => { setLang('es'); setMobileMenuOpen(false); }}
                className={`text-xs px-3 py-1 rounded transition ${
                  lang === 'es' ? 'bg-[#646945] text-white font-bold shadow' : 'text-stone-300 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => { setLang('en'); setMobileMenuOpen(false); }}
                className={`text-xs px-3 py-1 rounded transition ${
                  lang === 'en' ? 'bg-[#646945] text-white font-bold shadow' : 'text-stone-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🎬 HERO SLIDER: Reemplazado por video-hero-optimized.mp4 (11MB webm/mp4 comprimido sin pérdida) */}
      <section
        id="home"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        className="relative h-[95vh] min-h-155 w-full overflow-hidden bg-black flex items-center"
      >
        {t.heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Slide 0 uses local video-hero-optimized.mp4 with fallback thumbnail */}
            {slide.hasVideo ? (
              <div className="absolute inset-0 overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/hero-slide-1.webp"
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/video-hero-optimized.mp4" type="video/mp4" />
                </video>
              </div>
            ) : (
              <Image
                src={slide.bg}
                alt={slide.title}
                fill
                className="object-cover object-center scale-105 transition-transform duration-7000 ease-out"
                priority={idx === 1}
              />
            )}

            {/* Dark gradient overlay idéntico al Revslider de WordPress */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/60" />
          </div>
        ))}

        {/* Slide Foreground Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
          {activeSlide === 0 && (
            <div className="relative w-48 sm:w-64 h-16 sm:h-20 mb-3 animate-fade-in">
              <Image
                src="/assets/logo-native.png"
                alt="Native Trees Logo"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
          )}

          {/* Tagline (Raleway 500) */}
          <p className="font-raleway font-semibold text-xs sm:text-sm md:text-base tracking-[0.2em] text-[#d1d8a7] uppercase mb-3 drop-shadow whitespace-pre-line">
            {t.heroSlides[activeSlide].tagline}
          </p>

          {/* Slide Heading (Montserrat 700) */}
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.1] mb-5 max-w-4xl drop-shadow-lg whitespace-pre-line">
            {t.heroSlides[activeSlide].title}
          </h1>

          {/* Subtitle (Raleway 400) */}
          <p className="font-raleway font-normal text-sm sm:text-base md:text-lg text-stone-200 max-w-2xl leading-relaxed mb-8 drop-shadow">
            {t.heroSlides[activeSlide].subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#services"
              className="bg-[#646945] hover:bg-[#525738] text-white px-8 py-3.5 rounded-full font-montserrat font-bold text-xs tracking-[0.15em] uppercase transition transform hover:-translate-y-0.5 shadow-lg shadow-black/50"
            >
              {t.heroSlides[activeSlide].cta}
            </a>
          </div>
        </div>

        {/* Carousel Prev/Next Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? t.heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition"
          aria-label="Slide anterior"
        >
          &#10094;
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev === t.heroSlides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition"
          aria-label="Slide siguiente"
        >
          &#10095;
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {t.heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === i ? 'w-8 bg-[#c4c3aa]' : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 💼 SECTION 2: NUESTROS SERVICIOS EN ARGENTINA (Fiel a id="services" de WP) */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-montserrat font-bold text-xs tracking-[0.25em] text-[#646945] uppercase block mb-1">
            {t.services.tag}
          </span>
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#1a1a1a] uppercase">
            {t.services.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-montserrat font-bold text-sm text-[#1a1a1a] mb-3 leading-snug uppercase whitespace-pre-line">
                  {srv.title[lang]}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-raleway">
                  {srv.description[lang]}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100">
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#646945] font-montserrat hover:underline uppercase"
                >
                  <span>{t.services.verMas}</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌲 SECTION 3: NUESTRAS ESPECIES (Clon de id="lasespecies" con Hoverbox 3D) */}
      <section id="especies" className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-montserrat font-bold text-xs tracking-[0.25em] text-[#646945] uppercase block mb-1">
              EJEMPLARES DESTACADOS
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#1a1a1a] uppercase">
              Nuestras Especies
            </h2>
          </div>

          {/* Grilla idéntica a la Home original de Native Trees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SPECIES_CARDS.map((item) => (
              <div key={item.id} className="h-80 w-full hoverbox-card rounded-lg overflow-hidden shadow-sm">
                <div className="hoverbox-inner">
                  {/* Front */}
                  <div
                    className="hoverbox-front bg-cover bg-center p-6 text-white text-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
                    <div className="relative z-10">
                      <p className="text-xs font-serif italic text-stone-300 mb-1">
                        {item.scientific}
                      </p>
                      <h2 className="font-montserrat font-extrabold text-2xl uppercase tracking-wide">
                        {item.name}
                      </h2>
                    </div>
                  </div>

                  {/* Back on Hover */}
                  <div
                    className="hoverbox-back bg-cover bg-center p-6 text-white text-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/75" />
                    <div className="relative z-10 space-y-4">
                      <h2 className="font-montserrat font-bold text-xl uppercase tracking-wide">
                        {item.name}
                      </h2>
                      <div className="flex flex-col gap-2">
                        <Link
                          href={item.link}
                          className="inline-block bg-white text-zinc-900 hover:bg-[#646945] hover:text-white px-5 py-2 rounded-full font-montserrat font-bold text-xs tracking-wider uppercase transition"
                        >
                          VER INFO
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Links directos a Árboles y Palmeras como en el home original */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/nuestras-especies/arboles"
              className="relative h-44 rounded-lg overflow-hidden group flex items-center justify-center text-white"
            >
              <Image
                src="/assets/hero-slide-3.webp"
                alt="Árboles"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
              <div className="relative z-10 text-center">
                <span className="font-montserrat font-extrabold text-2xl uppercase tracking-widest block">
                  ÁRBOLES
                </span>
                <span className="text-xs text-[#c4c3aa] font-montserrat font-bold uppercase tracking-wider">
                  Ver catálogo completo &rarr;
                </span>
              </div>
            </Link>

            <Link
              href="/nuestras-especies/palmeras"
              className="relative h-44 rounded-lg overflow-hidden group flex items-center justify-center text-white"
            >
              <Image
                src="/assets/hero-slide-4.webp"
                alt="Palmeras"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
              <div className="relative z-10 text-center">
                <span className="font-montserrat font-extrabold text-2xl uppercase tracking-widest block">
                  PALMERAS
                </span>
                <span className="text-xs text-[#c4c3aa] font-montserrat font-bold uppercase tracking-wider">
                  Ver catálogo completo &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 🌾 SECTION 4: BANNER 1 PARALLAX ZOOM & TRANSLATE (id="banner1" de WP) */}
      <section
        ref={bannerRef}
        id="banner1"
        className="relative py-32 md:py-36 px-4 text-center text-white overflow-hidden"
      >
        {/* Capa de imagen con efecto de Zoom + Translate al scrollear */}
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url('/assets/native.webp')`,
            transform: `scale(${bannerTransform.scale}) translateY(${bannerTransform.translateY}px)`,
          }}
        />
        {/* Overlay mucho más suave para que la foto resalte luminosa como en la original */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-montserrat font-extrabold text-xl sm:text-2xl md:text-4xl leading-snug tracking-wide drop-shadow-md">
            {t.banner1.quote}
          </p>
        </div>
      </section>

      {/* 🌿 SECTION 5: CONOCENOS / SOBRE NOSOTROS (id="nosotros" & id="native" de WP) */}
      <section id="nosotros" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-montserrat font-bold text-xs tracking-[0.25em] text-[#646945] uppercase block mb-1">
            {t.about.tag}
          </span>
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#1a1a1a] uppercase">
            {t.about.heading}
          </h2>
        </div>

        {/* 3 Pilares horizontales idénticos a WP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {t.about.pillars.map((pillar, i) => (
            <div key={i} className="text-center p-8 bg-stone-50 border border-stone-200 rounded-lg">
              <h3 className="font-montserrat font-extrabold text-lg text-[#1a1a1a] uppercase mb-3 whitespace-pre-line">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed font-raleway">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sub-sección id="native" (Diseño fiel al original: limpio sobre fondo blanco) */}
        <div id="native" className="pt-12 text-center max-w-4xl mx-auto">
          <span className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.25em] text-[#555] uppercase block mb-3">
            {t.about.subTag}
          </span>
          <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1a1a1a] uppercase tracking-tight mb-8">
            {t.about.subTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#555555] font-raleway leading-relaxed mb-4 max-w-2xl mx-auto">
            {t.about.p1}
          </p>
          <p className="text-sm sm:text-base text-[#666666] font-raleway leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.about.p2}
          </p>
          <Link
            href="/nosotros"
            className="inline-block bg-[#646945] hover:bg-[#525738] text-white px-10 py-3.5 rounded-full font-montserrat font-bold text-xs tracking-[0.15em] uppercase transition shadow-sm"
          >
            {t.about.cta}
          </Link>
        </div>
      </section>

      {/* 🎠 SECTION 6: NOS ELIGEN - CARROUSEL ANIMADO CON LOGOS (Fondo blanco, título grande) */}
      <section id="clientes" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-[#1a1a1a] tracking-tight">
            {t.clients.heading}
          </h2>
        </div>

        {/* Marquee carrusel animado infinito */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8">
            {/* Repeat list twice for seamless infinite scroll */}
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((c, i) => (
              <div
                key={i}
                className="h-16 w-36 sm:w-40 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 flex items-center justify-center p-1 shrink-0"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  width={150}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 SECTION 7: CONTACTANOS (Fondo verde oliva #646945 / #5c623d con inputs blancos idéntico al original) */}
      <section id="contacto" className="py-24 bg-[#5f6542] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.25em] text-white/90 uppercase block mb-3">
              {t.contact.tag}
            </span>
            <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
              {t.contact.heading}
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-raleway font-normal max-w-xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Formulario exacto a la captura original */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(lang === 'es' ? '¡Gracias! Nos pondremos en contacto a la brevedad.' : 'Thank you! We will get in touch shortly.');
            }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder={lang === 'es' ? 'Nombre' : 'Full Name'}
                className="w-full px-5 py-3.5 bg-white text-stone-800 placeholder-stone-500 rounded-none text-sm font-raleway focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                required
                placeholder="Mail"
                className="w-full px-5 py-3.5 bg-white text-stone-800 placeholder-stone-500 rounded-none text-sm font-raleway focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder={lang === 'es' ? 'Teléfono' : 'Phone'}
                className="w-full px-5 py-3.5 bg-white text-stone-800 placeholder-stone-500 rounded-none text-sm font-raleway focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                placeholder={lang === 'es' ? 'Empresa' : 'Company'}
                className="w-full px-5 py-3.5 bg-white text-stone-800 placeholder-stone-500 rounded-none text-sm font-raleway focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <textarea
              rows={6}
              required
              placeholder={lang === 'es' ? 'Mensaje...' : 'Message...'}
              className="w-full px-5 py-3.5 bg-white text-stone-800 placeholder-stone-500 rounded-none text-sm font-raleway focus:outline-none focus:ring-2 focus:ring-white resize-y"
            ></textarea>
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="inline-block bg-white hover:bg-stone-100 text-[#5f6542] px-10 py-3.5 rounded-full font-montserrat font-extrabold text-xs tracking-[0.15em] uppercase transition shadow-md"
              >
                {t.contact.btnSubmit}
              </button>
            </div>
          </form>

          {/* Bloque moderno de Teléfonos y Canales de Contacto */}
          <div className="mt-16 pt-10 border-t border-white/20">
            <div className="text-center mb-8">
              <span className="font-montserrat font-bold text-[11px] tracking-[0.25em] text-white/70 uppercase block mb-1">
                {lang === 'es' ? 'Atención Inmediata' : 'Immediate Support'}
              </span>
              <h3 className="font-montserrat font-bold text-lg sm:text-xl text-white">
                {lang === 'es' ? 'Líneas directas por WhatsApp' : 'Direct WhatsApp lines'}
              </h3>
            </div>

            {/* Grid de tarjetas para los teléfonos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.contact.phones.map((p, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${p.num.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-white text-white hover:text-[#5f6542] backdrop-blur-md border border-white/20 hover:border-white p-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-montserrat font-bold tracking-wider uppercase opacity-80 group-hover:opacity-90">
                      {p.area}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 text-emerald-300 group-hover:text-white flex items-center justify-center text-xs transition-colors">
                      💬
                    </span>
                  </div>
                  <div className="font-montserrat font-extrabold text-sm tracking-tight flex items-center justify-between">
                    <span>{p.num}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Fila inferior: Oficinas & Email */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80 font-raleway text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span>
                  <strong className="font-montserrat text-white font-semibold">{t.contact.officesTitle}</strong>{' '}
                  {t.contact.officesVal}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">✉️</span>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="font-montserrat font-semibold text-white underline underline-offset-4 hover:text-white/80 transition"
                >
                  {t.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#121510] text-stone-300 py-10 border-t border-stone-800 text-center text-xs font-raleway">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <Image src="/assets/logo-sticky.png" alt="Native Trees" width={40} height={40} className="object-contain" />
          <p className="text-stone-400">
            Native Trees © Todos los derechos reservados • Desarrollado con Next.js App Router
          </p>
        </div>
      </footer>

      {/* 📋 MODAL DRAWER: COTIZADOR B2B (Anzuelo Plan Premium USD $1,550) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            <div className="p-6 bg-[#141712] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#c4c3aa] uppercase">
                  PLAN PREMIUM B2B
                </span>
                <h3 className="text-lg font-montserrat font-extrabold text-white uppercase">
                  {t.quoteDrawer.title}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-stone-400 hover:text-white text-2xl font-light"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <p className="text-xs text-stone-500 mb-2 font-raleway">
                {t.quoteDrawer.subtitle}
              </p>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-xl mb-3 text-stone-400">
                    🌿
                  </div>
                  <p className="text-xs font-raleway">{t.quoteDrawer.empty}</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.species.id}-${item.size}`}
                    className="flex gap-3 items-center bg-stone-50 p-3 rounded-lg border border-stone-200"
                  >
                    <div className="relative w-14 h-14 rounded overflow-hidden shrink-0 bg-stone-200">
                      <Image
                        src={item.species.image}
                        alt={item.species.name[lang]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-montserrat font-bold text-xs text-stone-900 truncate uppercase">
                        {item.species.name[lang]}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate font-raleway">
                        Porte: {item.size}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.species.id, item.size, -1)}
                          className="w-5 h-5 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.species.id, item.size, 1)}
                          className="w-5 h-5 rounded bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.species.id, item.size, -item.quantity)}
                      className="text-stone-400 hover:text-red-500 text-xs p-1"
                    >
                      🗑
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600 font-semibold font-raleway">{t.quoteDrawer.totalItems}</span>
                <span className="font-montserrat font-black text-stone-900 text-sm">
                  {cart.reduce((a, b) => a + b.quantity, 0)} ejemplares
                </span>
              </div>

              <a
                href={cart.length > 0 ? `https://wa.me/5491135108014?text=${generateWhatsAppMessage()}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (cart.length === 0) e.preventDefault();
                }}
                className={`w-full py-3 rounded-full text-xs font-montserrat font-bold tracking-wider uppercase text-white text-center flex items-center justify-center gap-2 transition ${
                  cart.length > 0
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md'
                    : 'bg-stone-300 cursor-not-allowed'
                }`}
              >
                <span>💬 {t.quoteDrawer.whatsappBtn}</span>
              </a>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 font-semibold font-montserrat uppercase"
              >
                {t.quoteDrawer.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
