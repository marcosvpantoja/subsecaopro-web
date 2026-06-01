import { createFileRoute, Link } from "@tanstack/react-router";
import { myReservations } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reservations")({ component: Reservations });

function Reservations() {
  return (
    <div className="pb-6">
      <div className="px-4 pt-4 flex items-center gap-2">
        <Link to="/rooms" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></Link>
        <h1 className="font-bold text-base text-slate-900">Minhas Reservas</h1>
      </div>
      <div className="px-4 mt-3 space-y-2">
        {myReservations.map((r) => {
          const map = { confirmed: { label: "Confirmada", icon: "✅", color: "bg-success/15 text-success" }, cancelled: { label: "Cancelada", icon: "❌", color: "bg-danger/15 text-danger" }, pending: { label: "Aguardando pagamento", icon: "⏳", color: "bg-accent/30 text-accent-foreground" } } as const;
          const s = map[r.status];
          return (
            <div key={r.id} className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{r.roomName}</p>
                  <p className="text-xs text-muted-foreground">{r.date} • {r.time}</p>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", s.color)}>{s.icon} {s.label}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-700">{r.amount > 0 ? `R$ ${r.amount.toFixed(2)}` : "Gratuito"}</span>
                {r.status !== "cancelled" && (
                  <button onClick={() => { if (confirm("Cancelar esta reserva?")) toast.success("Reserva cancelada"); }} className="text-xs font-medium text-danger active:scale-95">Cancelar</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}