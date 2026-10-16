import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Heart, MapPinned, Footprints, Compass } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import PropertyCard from '@/components/PropertyCard';
import { properti, kawasan, tentang } from '@/lib/data';

// Pintu masuk berdasarkan suasana — mencocokkan tag suasana di tiap listing.
const LIFESTYLE = [
  { label: 'Untuk keluarga', emoji: '👨‍👩‍👧', href: '/properti?q=keluarga' },
  { label: 'Dekat kampus', emoji: '🎓', href: '/properti?q=kampus' },
  { label: 'Masa pensiun', emoji: '🌿', href: '/properti?q=pensiun' },
  { label: 'Udara sejuk', emoji: '⛰️', href: '/properti?q=sejuk' },
  { label: 'Dekat pantai', emoji: '🌊', href: '/properti?q=pantai' },
  { label: 'Berkebun', emoji: '🥬', href: '/properti?q=berkebun' },
];
const WHY = [MapPinned, Compass, Footprints];
const TAHAP = [
  { t: 'Keluarga', q: 'keluarga', isi: 'Jalan buntu, sekolah yang terjangkau jalan kaki, dan ruang untuk tumbuh.' },
  { t: 'Mahasiswa', q: 'kampus', isi: 'Kamar dekat kampus dengan pengelola yang tinggal di lokasi.' },
  { t: 'Pensiun', q: 'pensiun', isi: 'Satu lantai, pintu lebar, dan ritme kawasan yang pelan.' },
];

export default function HomePage() {
  const featured = properti.filter((p) => p.featured).slice(0, 3);
  const jumlah = (slug) => properti.filter((p) => p.kawasan === slug).length;
  const cocok = (q) => properti.filter((p) => p.suasana.join(' ').toLowerCase().includes(q)).length;

  return (
    <main className="relative z-10">
      {/* Hero — warm, lifestyle */}
      <section className="px-4 pt-8 pb-8 sm:px-6 md:pt-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest">
              <Heart size={14} className="fill-forest" aria-hidden="true" /> Kawasan dulu, rumah kemudian
            </span>
            <h1 className="mt-5 font-display text-[2.75rem] font-bold leading-[1.03] text-ink sm:text-5xl md:mt-6 md:text-7xl">
              Pulang ke tempat yang terasa seperti <span className="text-forest">rumah</span>.
            </h1>
            <p className="mt-4 max-w-md text-base text-muted sm:text-lg md:mt-5">Siapa yang akan tinggal, dan mereka perlu dekat dengan apa? Mulai dari suasananya.</p>
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
              {LIFESTYLE.map((l) => (
                <Link key={l.label} href={l.href} className="flex min-h-11 items-center gap-2 rounded-full border-2 border-ink/10 bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-forest hover:text-forest sm:px-4 sm:py-2.5">
                  <span aria-hidden="true">{l.emoji}</span> {l.label}
                </Link>
              ))}
            </div>
            <Link href="/properti" className="mt-4 inline-flex items-center gap-1 py-2 text-sm font-bold text-forest hover:underline sm:mt-6">atau jelajahi semua properti <ArrowRight size={15} /></Link>
          </div>

          {/* Kolase foto: potongan pas 3:4 dan kotak, dipilih supaya tidak mengulang foto kawasan dan listing di bawahnya. */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] rounded-tr-lg sm:rounded-[2.5rem] sm:rounded-tr-lg">
                <Image src="/images/properti/hero-ruang-tamu-terang.webp" alt="" fill priority sizes="(max-width:1024px) 50vw, 30vw" className="object-cover" />
              </div>
              <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] rounded-bl-lg">
                  <Image src="/images/properti/hero-kamar-studio.webp" alt="" fill sizes="(max-width:1024px) 50vw, 30vw" className="object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[2rem] rounded-tr-lg">
                  <Image src="/images/properti/hero-rumah-modern.webp" alt="" fill sizes="(max-width:1024px) 50vw, 30vw" className="object-cover" />
                </div>
              </div>
            </div>
            <Link href="/kawasan" className="absolute -bottom-3 left-6 flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-forest-soft sm:left-8">
              <MapPinned size={15} aria-hidden="true" /> {kawasan.length} panduan kawasan
            </Link>
          </div>
        </div>
      </section>

      {/* Telusuri kawasan */}
      <section className="px-4 pb-12 pt-14 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Telusuri kawasan</h2>
                <p className="mt-2 text-muted">Suasana, waktu tempuh, kisaran harga — dan kekurangannya.</p>
              </div>
              <Link href="/kawasan" className="hidden items-center gap-1 py-2 text-sm font-bold text-forest hover:underline sm:inline-flex">Semua panduan <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
            {kawasan.map((k, i) => (
              <Reveal key={k.slug} delay={(i % 4) * 0.07}>
                <Link href={`/kawasan/${k.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:aspect-[3/4] sm:rounded-[1.75rem]">
                  <Image src={k.foto} alt="" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 text-white sm:gap-3 sm:p-5">
                    <div className="min-w-0"><p className="font-display text-xl font-bold sm:text-2xl">{k.nama}</p><p className="text-xs text-white/90 sm:text-sm">{k.kota} · {jumlah(k.slug)} listing</p><p className="mt-1 hidden text-xs text-white/90 sm:block">{k.cocok.join(' · ')}</p></div>
                    <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-forest sm:grid"><ArrowUpRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link href="/kawasan" className="mt-4 inline-flex items-center gap-1 py-2 text-sm font-bold text-forest hover:underline sm:hidden">Semua panduan kawasan <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      {/* Featured */}
      <section className="tunda-render px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Satu untuk tiap tahap hidup</h2></Reveal>
          <ul className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3" aria-label="Listing pilihan">
            {featured.map((p) => <li key={p.id} className="w-[80%] shrink-0 snap-start sm:w-auto"><PropertyCard item={p} /></li>)}
          </ul>
        </div>
      </section>

      {/* Why — warm band */}
      <section className="tunda-render px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-forest px-6 py-10 text-white sm:rounded-[2.5rem] md:px-14 md:py-14">
          <Reveal><h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">{tentang.judul}.</h2></Reveal>
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3 md:gap-8">
            {tentang.nilai.map(([judul, isi], i) => {
              const Ikon = WHY[i % WHY.length];
              return (
              <Reveal key={judul} delay={i * 0.1}>
                <div className="flex gap-4 md:block">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 md:h-12 md:w-12"><Ikon size={22} aria-hidden="true" /></span>
                  <div>
                    <h3 className="font-display text-xl font-bold md:mt-4">{judul}</h3>
                    <p className="mt-1 text-white/90 md:mt-1.5">{isi}</p>
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tahap hidup */}
      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Siapa yang akan tinggal?</h2></Reveal>
          <div className="mt-6 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-6">
            {TAHAP.map((t, i) => (
              <Reveal key={t.t} delay={i * 0.1}>
                <Link href={`/properti?q=${t.q}`} className="group flex h-full gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:flex-col md:gap-0 md:rounded-[1.75rem] md:p-7">
                  <span className="text-3xl leading-none" aria-hidden="true">{['🏡', '🎓', '🌿'][i]}</span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-display text-xl font-bold text-ink group-hover:text-forest md:mt-3 md:text-2xl">{t.t}</span>
                    <span className="mt-1 flex-1 text-ink/80 md:mt-2">{t.isi}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-forest md:mt-5">{cocok(t.q)} listing cocok <ArrowRight size={15} /></span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border-2 border-forest/15 bg-sand px-6 py-10 text-center sm:rounded-[2.5rem] sm:px-8 md:py-16">
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl">Punya rumah untuk dijual atau disewa? Ceritakan juga kawasannya.</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/80">Kami menulis panduan kawasan untuk setiap listing baru — termasuk hal-hal yang biasanya baru ketahuan setelah pindah.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8">
              <Link href="/kontak?topik=jual" className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 font-bold text-white transition hover:bg-forest-soft">Ajukan listing <ArrowRight size={16} /></Link>
              <Link href="/properti" className="rounded-full border-2 border-ink/15 bg-white px-7 py-3.5 font-bold text-ink transition hover:border-forest hover:text-forest">Jelajahi properti</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
