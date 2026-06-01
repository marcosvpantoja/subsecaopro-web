import { createFileRoute, Link } from "@tanstack/react-router";
import { rooms } from "@/lib/mockData";
import { ListChecks, Users, CheckCircle2, Circle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/rooms/")({ component: Rooms });

function Rooms() {
  return (
    <div className="pb-6">
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Salas da Subseção</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Reserve com poucos toques.</p>
        </div>
        <Link to="/reservations" className="flex items-center gap-1 px-3 py-2 rounded-full bg-surface border border-slate-200 text-xs font-medium text-slate-700 active:scale-95">
          <ListChecks className="w-3.5 h-3.5" /> Minhas
        </Link>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {rooms.map((r) => (
          <Link key={r.id} to="/rooms/$id" params={{ id: r.id }} className="block bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden active:scale-[0.99] transition">
            <div className={`h-24 bg-gradient-to-br ${r.color} relative`}>
              <StatusBadge status={r.status} />
              <div className="absolute bottom-2 left-3 text-white">
                <div className="text-[10px] opacity-80 uppercase tracking-wide">Sala</div>
                <div className="text-sm font-bold">{r.name}</div>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-slate-600">{r.description}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.capacity} pessoas</span>
                <span>•</span>
                <span>{r.features.slice(0, 2).join(" • ")}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">
                  {r.free ? "Gratuito" : `R$ ${r.pricePerHour.toFixed(0)}/hora`}
                </span>
                {r.status === "request" ? (
                  <span className="text-xs font-medium text-accent-foreground bg-accent/30 px-2 py-1 rounded-full">Solicitar via secretaria</span>
                ) : (
                  <span className="text-xs font-semibold text-primary">Reservar →</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "available" | "occupied" | "request" }) {
  const map = {
    available: { icon: <CheckCircle2 className="w-3 h-3" />, label: "Disponível", color: "bg-success" },
    occupied: { icon: <Circle className="w-3 h-3 fill-current" />, label: "Ocupada", color: "bg-danger" },
    request: { icon: <AlertCircle className="w-3 h-3" />, label: "Sob solicitação", color: "bg-accent text-accent-foreground" },
  } as const;
  const s = map[status];
  return (
    <span className={`absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${s.color}`}>
      {s.icon} {s.label}
    </span>
  );
}