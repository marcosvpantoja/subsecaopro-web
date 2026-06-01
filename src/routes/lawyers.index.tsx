import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { lawyers } from "@/lib/mockData";
import { useMode } from "@/lib/mode";
import { Search, MessageCircle, Video, MapPin, Clock, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lawyers/")({ component: Lawyers });

const areas = ["Todos", "Trabalhista", "Civil", "Família", "Penal", "Tributário", "Empresarial", "Imobiliário", "Digital"];
const neighborhoods = ["Todos", "Centro", "Maria Antônia", "Nova Veneza", "Matão", "Picerno", "Parque Bandeirantes", "Jardim Bordon", "Macieira", "Residencial Real Parque", "Jardim Bandeirantes"];
const modes = ["Todos", "Presencial", "Online"];

function Lawyers() {
  const { mode } = useMode();
  const [q, setQ] = useState("");
  const [area, setArea] = useState("Todos");
  const [neighborhood, setNeighborhood] = useState("Todos");
  const [att, setAtt] = useState("Todos");
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(() => {
    return lawyers.filter((l) => {
      const matchQ = q === "" || l.name.toLowerCase().includes(q.toLowerCase()) || l.specialties.some((s) => s.toLowerCase().includes(q.toLowerCase())) || l.city.toLowerCase().includes(q.toLowerCase());
      const matchArea = area === "Todos" || l.specialties.includes(area);
      const matchNeighborhood = neighborhood === "Todos" || l.city === neighborhood;
      const matchAtt = att === "Todos" || (att === "Online" ? l.online : true);
      return matchQ && matchArea && matchNeighborhood && matchAtt;
    });
  }, [q, area, neighborhood, att]);

  const activeCount = (area !== "Todos" ? 1 : 0) + (att !== "Todos" ? 1 : 0) + (neighborhood !== "Todos" ? 1 : 0);

  return (
    <div className="pb-6">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900">Encontre um Advogado</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {mode === "lawyer" ? "Diretório completo de inscritos na SubseçãoPRO" : "Todos os perfis são de inscritos na SubseçãoPRO"}
        </p>
      </div>

      <div className="px-4 mt-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nome, especialidade ou bairro..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface border border-slate-200 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="px-4 mt-3 flex items-center justify-between">
        <button
          onClick={() => setShowFilters((s) => !s)}
          aria-expanded={showFilters}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 active:scale-95 transition"
        >
          {showFilters ? <X className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
          {showFilters ? "Esconder filtros" : "Mostrar filtros"}
          {!showFilters && activeCount > 0 && (
            <span className="ml-0.5 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{activeCount}</span>
          )}
        </button>
        {activeCount > 0 && (
          <button
            onClick={() => { setArea("Todos"); setAtt("Todos"); setNeighborhood("Todos"); }}
            className="text-xs text-muted-foreground hover:text-primary font-medium"
          >
            Limpar
          </button>
        )}
      </div>

      {showFilters && (
        <div className="animate-fade-in">
          <Pills label="Área" items={areas} value={area} onChange={setArea} />
          <Pills label="Atendimento" items={modes} value={att} onChange={setAtt} />
          <Pills label="Bairro" items={neighborhoods} value={neighborhood} onChange={setNeighborhood} />
        </div>
      )}

      <div className="px-4 mt-3 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-sm text-muted-foreground">
            <div className="text-4xl mb-2">🔎</div>
            Nenhum advogado encontrado.
          </div>
        ) : (
          filtered.map((l) => (
            <div key={l.id} className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm flex gap-3">
              <div className="relative shrink-0">
                <img
                  src={l.photo}
                  alt={l.name}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-900 truncate">{l.name}</h3>
                <p className="text-[11px] text-muted-foreground">{l.oab} • {l.city}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {l.specialties.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">{s}</span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">{l.bio}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {l.online && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success">
                      <Video className="w-3 h-3" /> Atende online
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {l.availability}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {l.address}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <a aria-label={`Conversar com ${l.name} no WhatsApp`} href={`https://wa.me/55${l.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 min-h-9 py-2 rounded-lg bg-success text-white text-xs font-semibold active:scale-95">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <Link aria-label={`Ver perfil de ${l.name}`} to="/lawyers/$id" params={{ id: l.id }} className="flex-1 text-center min-h-9 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 active:scale-95">
                    Ver Perfil
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Pills({ label, items, value, onChange }: { label: string; items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-3">
      <p className="px-4 text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">{label}</p>
      <div className="flex gap-1.5 px-4 overflow-x-auto no-scrollbar">
        {items.map((i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition",
              value === i ? "bg-primary text-primary-foreground border-primary" : "bg-white text-slate-600 border-slate-200"
            )}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}