import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { rooms } from "@/lib/mockData";
import { ArrowLeft, Users, Check, Copy, Clock } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rooms/$id")({ component: RoomBooking });

const hours = ["08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h"];
const occupied = new Set(["09h", "12h", "16h"]);

function RoomBooking() {
  const { id } = Route.useParams();
  const r = rooms.find((x) => x.id === id);
  const nav = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(5);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [step, setStep] = useState<"select" | "checkout" | "pix" | "done">("select");
  const [method, setMethod] = useState<"pix" | "card" | null>(null);

  if (!r) return <div className="p-6 text-center text-sm">Sala não encontrada.</div>;

  if (r.status === "request") {
    return (
      <div className="pb-6">
        <Header backTo="/rooms" title={r.name} />
        <div className="px-4 space-y-3">
          <div className={`h-32 rounded-2xl bg-gradient-to-br ${r.color}`} />
          <p className="text-sm text-slate-700">{r.description}. Para auditório, a reserva é mediante solicitação à secretaria.</p>
          <button onClick={() => toast.success("Solicitação enviada à secretaria!")} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98]">
            Solicitar via secretaria
          </button>
        </div>
      </div>
    );
  }

  const hoursCount = selectedHours.length;
  const subtotal = r.free ? 0 : r.pricePerHour * hoursCount;
  const fee = subtotal * 0.04;
  const total = subtotal + fee;

  const toggleHour = (h: string) => {
    if (occupied.has(h)) return;
    setSelectedHours((cur) => {
      if (cur.includes(h)) return cur.filter((x) => x !== h);
      if (cur.length >= 4) {
        toast.error("Máximo 4 horas por reserva");
        return cur;
      }
      return [...cur, h].sort();
    });
  };

  const proceed = () => {
    if (!selectedDay || selectedHours.length === 0) {
      toast.error("Selecione data e horário");
      return;
    }
    if (r.free) {
      setStep("done");
    } else {
      setStep("checkout");
    }
  };

  return (
    <div className="pb-6">
      <Header backTo="/rooms" title={r.name} />

      <div className="px-4">
        <div className={`h-28 rounded-2xl bg-gradient-to-br ${r.color} relative overflow-hidden`}>
          <div className="absolute bottom-2 left-3 text-white">
            <div className="text-xs opacity-80 flex items-center gap-1"><Users className="w-3 h-3" /> {r.capacity} pessoas</div>
            <div className="text-base font-bold">{r.free ? "Gratuito" : `R$ ${r.pricePerHour}/hora`}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {r.features.map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary-soft text-primary">{f}</span>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Escolha a data</h2>
        <div className="bg-surface rounded-2xl p-3 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-900">Junho 2026</span>
            <span className="text-xs text-muted-foreground">Hoje: 02</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-1">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const unavailable = [1, 7, 8, 14, 15, 21, 22, 28, 29].includes(day);
              const selected = selectedDay === day;
              return (
                <button
                  key={day}
                  disabled={unavailable}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square rounded-lg text-xs font-medium transition",
                    selected ? "bg-primary text-primary-foreground" :
                    unavailable ? "text-slate-300" : "bg-white text-primary hover:bg-primary-soft border border-slate-100"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Escolha o horário</h2>
        <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1"><Clock className="w-3 h-3" /> Máx. 4h por reserva • Antecedência mín. 2h</p>
        <div className="grid grid-cols-4 gap-1.5">
          {hours.map((h) => {
            const occ = occupied.has(h);
            const sel = selectedHours.includes(h);
            return (
              <button
                key={h}
                onClick={() => toggleHour(h)}
                disabled={occ}
                className={cn(
                  "py-2 rounded-lg text-xs font-medium border transition",
                  occ ? "bg-slate-100 text-slate-400 border-slate-200" :
                  sel ? "bg-primary text-primary-foreground border-primary" :
                  "bg-white text-slate-700 border-slate-200 hover:border-primary"
                )}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-5">
        <button onClick={proceed} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] shadow-sm">
          {r.free ? "Confirmar reserva (gratuito)" : `Continuar • R$ ${total.toFixed(2)}`}
        </button>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={step === "checkout"} onOpenChange={(o) => !o && setStep("select")}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Resumo da reserva</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <Row k="Sala" v={r.name} />
            <Row k="Data" v={`0${selectedDay}/06/2026`} />
            <Row k="Horário" v={`${selectedHours[0]} – ${selectedHours[selectedHours.length - 1]} (${hoursCount}h)`} />
            <div className="border-t border-slate-100 my-2" />
            <Row k="Subtotal" v={`R$ ${subtotal.toFixed(2)}`} />
            <Row k="Taxa de serviço (4%)" v={`R$ ${fee.toFixed(2)}`} />
            <Row k="Total" v={`R$ ${total.toFixed(2)}`} bold />
          </div>
          <div className="space-y-2 mt-2">
            <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Método de pagamento</p>
            <button onClick={() => setMethod("pix")} className={cn("w-full p-3 rounded-xl border text-sm flex items-center justify-between active:scale-[0.98]", method === "pix" ? "border-primary bg-primary-soft" : "border-slate-200")}>
              <span>💠 PIX — pagamento imediato</span>
              {method === "pix" && <Check className="w-4 h-4 text-primary" />}
            </button>
            <button onClick={() => setMethod("card")} className={cn("w-full p-3 rounded-xl border text-sm flex items-center justify-between active:scale-[0.98]", method === "card" ? "border-primary bg-primary-soft" : "border-slate-200")}>
              <span>💳 Cartão de crédito — parcelamento</span>
              {method === "card" && <Check className="w-4 h-4 text-primary" />}
            </button>
            <button
              disabled={!method}
              onClick={() => method === "pix" ? setStep("pix") : (toast.success("Pagamento aprovado!") || setStep("done"))}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50"
            >
              Confirmar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIX Dialog */}
      <Dialog open={step === "pix"} onOpenChange={(o) => !o && setStep("checkout")}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Pagamento via PIX</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-3">
            <QRPlaceholder />
            <p className="text-xs text-muted-foreground">Escaneie o QR Code ou copie o código</p>
            <div className="bg-surface rounded-lg p-2 flex items-center justify-between text-xs">
              <span className="truncate font-mono">00020126580014BR.GOV.BCB.PIX...{total.toFixed(0)}</span>
              <button onClick={() => { navigator.clipboard?.writeText("00020126..."); toast.success("Código PIX copiado!"); }} className="ml-2 text-primary"><Copy className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-accent-foreground">⏱ Expira em 10:00</p>
            <button
              onClick={() => { toast.success("Reserva confirmada! Você receberá uma notificação."); setStep("done"); }}
              className="w-full py-3 rounded-xl bg-success text-white font-semibold text-sm active:scale-[0.98]"
            >
              Já efetuei o pagamento
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Done dialog */}
      <Dialog open={step === "done"} onOpenChange={(o) => !o && nav({ to: "/reservations" })}>
        <DialogContent className="max-w-sm rounded-2xl text-center">
          <div className="py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-success text-white flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="mt-3 text-lg font-bold text-slate-900">Reserva confirmada!</h3>
            <p className="text-sm text-muted-foreground mt-1">{r.free ? "Coworking reservado." : "Você receberá uma notificação com os detalhes."}</p>
            <button onClick={() => nav({ to: "/reservations" })} className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
              Ver minhas reservas
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Header({ backTo, title }: { backTo: string; title: string }) {
  return (
    <div className="px-4 pt-4 pb-3 flex items-center gap-2">
      <Link to={backTo} className="w-9 h-9 rounded-full bg-surface flex items-center justify-center active:scale-95">
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <h1 className="font-bold text-base text-slate-900 truncate">{title}</h1>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={cn("text-slate-900", bold && "font-bold")}>{v}</span>
    </div>
  );
}

function QRPlaceholder() {
  return (
    <div className="w-40 h-40 mx-auto bg-white border-2 border-slate-200 rounded-xl p-2 grid grid-cols-12 gap-px">
      {Array.from({ length: 144 }).map((_, i) => (
        <div key={i} className={Math.random() > 0.45 ? "bg-slate-900" : "bg-white"} />
      ))}
    </div>
  );
}