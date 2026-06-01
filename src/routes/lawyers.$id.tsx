import { createFileRoute, Link } from "@tanstack/react-router";
import { lawyers } from "@/lib/mockData";
import { ArrowLeft, MapPin, Clock, Wifi, MessageCircle, Mail, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lawyers/$id")({ component: LawyerProfile });

function LawyerProfile() {
  const { id } = Route.useParams();
  const l = lawyers.find((x) => x.id === id);
  if (!l) return <div className="p-6 text-center text-sm text-muted-foreground">Advogado não encontrado.</div>;

  return (
    <div className="pb-6">
      <div className={`relative h-32 bg-gradient-to-br ${l.color}`}>
        <Link to="/lawyers" className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center active:scale-95">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
      <div className="px-4 -mt-10 relative">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${l.color} border-4 border-white text-white flex items-center justify-center text-xl font-bold shadow-md`}>
          {l.initials}
        </div>
        <h1 className="mt-2 font-bold text-lg text-slate-900">{l.name}</h1>
        <p className="text-xs text-muted-foreground">{l.oab} • {l.city}/SP</p>
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("w-3.5 h-3.5", i < Math.round(l.rating) ? "fill-accent text-accent" : "text-slate-300")} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{l.rating.toFixed(1)} • 124 avaliações</span>
        </div>

        <p className="mt-3 text-sm text-slate-700 leading-relaxed">{l.bio}</p>

        <div className="mt-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1.5">Áreas de atuação</p>
          <div className="flex flex-wrap gap-1.5">
            {l.specialties.map((s) => (
              <span key={s} className="px-2 py-1 rounded-lg text-xs font-medium bg-primary-soft text-primary">{s}</span>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-surface rounded-2xl p-3 border border-slate-100 space-y-2.5 text-sm">
          <Row icon={<MapPin className="w-4 h-4 text-primary" />} label="Endereço" value={l.address} />
          <Row icon={<Clock className="w-4 h-4 text-primary" />} label="Disponibilidade" value={l.availability} />
          <Row icon={<Wifi className="w-4 h-4 text-primary" />} label="Atendimento online" value={l.online ? "Sim" : "Não"} />
        </div>

        <div className="mt-4 space-y-2">
          <a href={`https://wa.me/55${l.whatsapp}`} target="_blank" rel="noreferrer" className="block w-full text-center py-3 rounded-xl bg-success text-white font-semibold text-sm shadow-sm active:scale-[0.98]">
            <MessageCircle className="w-4 h-4 inline mr-1" /> Entrar em contato via WhatsApp
          </a>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(l.email);
              toast.success("E-mail copiado!");
            }}
            className="block w-full text-center py-3 rounded-xl bg-white border border-slate-200 font-semibold text-sm text-slate-700 active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 inline mr-1" /> Copiar e-mail
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{label}</p>
        <p className="text-sm text-slate-800">{value}</p>
      </div>
    </div>
  );
}