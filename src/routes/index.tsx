import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { sponsors, posts } from "@/lib/mockData";
import { useMode } from "@/lib/mode";
import { Heart, Share2, Search, Bot, HandHeart, Handshake, DoorOpen, CalendarDays, Ticket, ListChecks, Bookmark, Vote, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ElectionBrowser } from "@/components/ElectionBrowser";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SubseçãoPRO" },
      { name: "description", content: "Início — comunicados, parceiros e atalhos da SubseçãoPRO." },
    ],
  }),
  component: Home,
});

function Home() {
  const { mode, user } = useMode();
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const [electionOpen, setElectionOpen] = useState(false);
  const [voted, setVoted] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => setLiked((p) => ({ ...p, [id]: !p[id] }));
  const toggleSave = (id: string) => {
    setSaved((p) => {
      const nv = !p[id];
      toast.success(nv ? "Salvo nos favoritos" : "Removido dos favoritos");
      return { ...p, [id]: nv };
    });
  };
  const share = (caption: string) => {
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share) {
      (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({ title: "SubseçãoPRO", text: caption }).catch(() => undefined);
    } else {
      toast.success("Link copiado para compartilhar");
    }
  };

  const scrollToSponsor = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) {
      el.scrollTo({ left: child.offsetLeft - el.offsetLeft - 16, behavior: "smooth" });
    }
  };

  // Auto-rotate sponsors
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const next = (active + 1) % sponsors.length;
      scrollToSponsor(next);
    }, 4500);
    return () => clearInterval(id);
  }, [active]);

  const handleVoteClick = () => {
    if (voted) {
      toast.info("Você já votou nesta eleição.");
      return;
    }
    setElectionOpen(true);
  };

  // mark as voted when the browser closes after success — we infer from a toast pattern
  // instead, expose via onOpenChange + a flag

  type Shortcut = { to: string; params?: Record<string, string>; icon: typeof Search; label: string };
  const publicShortcuts: Shortcut[] = [
    { to: "/lawyers", icon: Search, label: "Encontrar Advogado" },
    { to: "/ai", icon: Bot, label: "Falar com IA" },
    { to: "/services/$slug", params: { slug: "assistencia" }, icon: HandHeart, label: "Assistência Gratuita" },
    { to: "/services/$slug", params: { slug: "parceiro" }, icon: Handshake, label: "Seja um Parceiro" },
  ];
  const lawyerShortcuts: Shortcut[] = [
    { to: "/rooms", icon: DoorOpen, label: "Reservar Sala" },
    { to: "/reservations", icon: CalendarDays, label: "Minhas Reservas" },
    { to: "/club", icon: Ticket, label: "Meus Cupons" },
    { to: "/profile", icon: ListChecks, label: "Histórico" },
  ];
  const shortcuts = mode === "lawyer" ? lawyerShortcuts : publicShortcuts;

  return (
    <div className="space-y-5 pb-4">
      {/* Greeting */}
      <section className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900 leading-tight">
          {mode === "lawyer" ? `Olá, ${user?.name.split(" ").slice(0, 2).join(" ") ?? "Doutor"} 👋` : "Bem-vindo à SubseçãoPRO"}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {mode === "lawyer" ? "Tudo pronto para hoje." : "Sua subseção, na palma da mão."}
        </p>
      </section>

      {/* Banner carousel */}
      <section className="px-4">
        <div
          ref={carouselRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / (el.clientWidth - 32));
            setActive(idx);
          }}
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => { setTimeout(() => { pausedRef.current = false; }, 3000); }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-3 -mx-4 px-4 scroll-smooth"
        >
          {sponsors.map((b) => (
            <div key={b.id} className="snap-center shrink-0 w-[88%]">
              <Link
                to={b.to as never}
                params={(b.params ?? {}) as never}
                className="block relative h-40 rounded-2xl text-white shadow-md overflow-hidden active:scale-[0.99] transition"
              >
                <img src={b.photo} alt={b.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${b.color}`} />
                <div className="relative p-4">
                  <p className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">Patrocinador</p>
                  <h3 className="font-bold text-lg leading-tight mt-1 drop-shadow">{b.title}</h3>
                  <p className="text-xs opacity-95 mt-1 max-w-[80%]">{b.subtitle}</p>
                </div>
                <span className="absolute bottom-3 left-4 px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-semibold shadow">
                  {b.cta}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-2">
          {sponsors.map((_, i) => (
            <button
              key={i}
              onClick={() => { pausedRef.current = true; scrollToSponsor(i); setTimeout(() => { pausedRef.current = false; }, 4000); }}
              aria-label={`Ir para banner ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="group relative h-6 px-1 flex items-center justify-center focus-visible:outline-none"
            >
              <span className={`block h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-primary" : "w-1.5 bg-slate-300 group-hover:bg-slate-400"}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Quick shortcuts */}
      <section className="px-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Atalhos rápidos</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {shortcuts.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                to={s.to as never}
                params={(s.params ?? {}) as never}
                className="bg-surface rounded-2xl p-3 border border-slate-100 active:scale-[0.98] transition shadow-sm hover:border-primary/30"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-slate-800 leading-tight">{s.label}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Feed */}
      <section className="px-4">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-700">Feed institucional</h2>
          <span className="text-[10px] text-muted-foreground">@oabcidadeexemplo</span>
        </div>
        <div className="space-y-3">
          {/* Election spotlight post */}
          <article className="bg-white rounded-2xl border-2 border-primary/30 shadow-md overflow-hidden relative">
            <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[9px] font-bold uppercase tracking-wider shadow">
              Em destaque
            </div>
            <header className="flex items-center gap-2 px-3 py-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-800 text-white flex items-center justify-center">
                <Vote className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900">Comissão Eleitoral OAB</div>
                <div className="text-[10px] text-muted-foreground">Encerra em 7 dias</div>
              </div>
            </header>
            <div className="relative h-44 bg-gradient-to-br from-primary via-indigo-800 to-indigo-950 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&auto=format&fit=crop"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-semibold">Eleições 2026</p>
                <h3 className="font-bold text-2xl mt-1 drop-shadow">SubseçãoPRO</h3>
                <p className="text-xs opacity-90 mt-1">Triênio 2026–2028 • 3 chapas concorrendo</p>
              </div>
            </div>
            <div className="px-3 py-3">
              <p className="text-sm text-slate-700 leading-snug mb-3">
                🗳️ <span className="font-semibold">A votação está aberta.</span> Sua participação fortalece a advocacia local. Vote pelo app de forma segura e auditável.
              </p>
              <button
                onClick={handleVoteClick}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm shadow-sm active:scale-[0.98] transition",
                  voted ? "bg-success/15 text-success" : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {voted ? <>✅ Voto registrado</> : <><Vote className="w-4 h-4" /> Votar agora <ChevronRight className="w-4 h-4" /></>}
              </button>
              {mode !== "lawyer" && !voted && (
                <p className="text-[10px] text-center text-muted-foreground mt-2">É necessário estar logado como advogado.</p>
              )}
            </div>
          </article>

          {posts.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <header className="flex items-center gap-2 px-3 py-2.5">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">SP</div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-slate-900">SubseçãoPRO</div>
                  <div className="text-[10px] text-muted-foreground">{p.date}</div>
                </div>
              </header>
              <button type="button" aria-label={`Curtir foto: ${p.caption.slice(0, 60)}`} onDoubleClick={() => toggleLike(p.id)} className="block w-full relative h-48 bg-slate-100">
                <img src={p.photo} alt={p.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                {liked[p.id] && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Heart className="w-20 h-20 fill-rose-500 text-rose-500 drop-shadow-lg animate-fade-in" />
                  </span>
                )}
              </button>
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <div className="flex items-center gap-3">
                    <button aria-label={liked[p.id] ? "Remover curtida" : "Curtir post"} aria-pressed={!!liked[p.id]} onClick={() => toggleLike(p.id)} className={cn("min-w-11 min-h-11 -ml-2 flex items-center justify-center rounded-full transition active:scale-90", liked[p.id] && "text-rose-500")}>
                      <Heart className={cn("w-5 h-5", liked[p.id] && "fill-rose-500")} aria-hidden="true" />
                    </button>
                    <button aria-label="Compartilhar post" onClick={() => share(p.caption)} className="min-w-11 min-h-11 flex items-center justify-center rounded-full transition active:scale-90 hover:text-primary">
                      <Share2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                  <button aria-label={saved[p.id] ? "Remover dos salvos" : "Salvar post"} aria-pressed={!!saved[p.id]} onClick={() => toggleSave(p.id)} className={cn("min-w-11 min-h-11 -mr-2 flex items-center justify-center rounded-full transition active:scale-90", saved[p.id] && "text-primary")}>
                    <Bookmark className={cn("w-5 h-5", saved[p.id] && "fill-primary")} aria-hidden="true" />
                  </button>
                </div>
                <p className="text-xs font-semibold text-slate-900">{(p.likes + (liked[p.id] ? 1 : 0)).toLocaleString("pt-BR")} curtidas</p>
                <p className="text-sm text-slate-700 leading-snug mt-1">{p.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ElectionBrowser
        open={electionOpen}
        onOpenChange={setElectionOpen}
        onVoted={() => setVoted(true)}
      />
    </div>
  );
}
