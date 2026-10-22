import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121510] text-white flex flex-col justify-between selection:bg-[#646945] selection:text-white font-sans">
      {/* Top Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo-sticky.png"
            alt="Native Trees Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-montserrat font-extrabold tracking-widest text-base text-white">NATIVE</span>
            <span className="text-[9px] tracking-[0.28em] text-[#8e9668] -mt-1 font-semibold">TREES</span>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs font-montserrat font-bold tracking-wider text-stone-300 hover:text-white uppercase transition border border-white/20 px-4 py-2 rounded-full hover:bg-white/10"
        >
          Volver al Inicio
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#646945]/30 border border-[#c4c3aa]/40 text-[#c4c3aa] flex items-center justify-center text-2xl mb-6 shadow-inner animate-pulse">
          🌱
        </div>

        <span className="text-xs font-montserrat font-bold tracking-[0.25em] text-[#c4c3aa] uppercase mb-3 bg-[#646945]/20 px-3.5 py-1 rounded-full border border-[#c4c3aa]/20">
          MIGRACIÓN EN CURSO
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-extrabold tracking-tight text-white uppercase mb-4 leading-tight">
          Próximamente
        </h1>

        <p className="text-base sm:text-lg text-stone-300 font-raleway font-normal max-w-xl mb-10 leading-relaxed">
          Esta sección está siendo reconstruida y optimizada en la nueva arquitectura de <strong>Next.js + Payload CMS</strong> para ofrecer una navegación instantánea, catálogo bilingüe y máxima resolución en fotos de ejemplares.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-[#646945] hover:bg-[#525738] text-white px-8 py-3.5 rounded-full font-montserrat font-bold text-xs tracking-[0.15em] uppercase transition transform hover:-translate-y-0.5 shadow-lg shadow-black/50"
          >
            EXPLORAR LA HOME DEMO
          </Link>
          <a
            href="https://wa.me/5491135108014"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-6 py-3.5 rounded-full font-montserrat font-semibold text-xs tracking-wider uppercase transition"
          >
            CONSULTAS POR WHATSAPP
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-stone-400 font-raleway border-t border-white/10">
        Native Trees © Todos los derechos reservados • Desarrollado con Next.js App Router
      </footer>
    </div>
  );
}
