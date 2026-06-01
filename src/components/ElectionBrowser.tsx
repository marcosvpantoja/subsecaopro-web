import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowLeft, RotateCcw, Lock, ShieldCheck, CheckCircle2, Loader2, Vote } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Candidate = {
  id: string;
  name: string;
  slate: string;
  number: string;
  bio: string;
  color: string;
};

const candidates: Candidate[] = [
  { id: "c1", name: "Dra. Helena Ribeiro", slate: "Chapa 1 — Renovação OAB", number: "10", bio: "15 anos como advogada civil. Foco em modernização e transparência.", color: "from-blue-500 to-indigo-700" },
  { id: "c2", name: "Dr. Paulo Andrade", slate: "Chapa 2 — Tradição e Diálogo", number: "20", bio: "Ex-conselheiro estadual. Defende valorização da advocacia local.", color: "from-emerald-500 to-teal-700" },
  { id: "c3", name: "Dra. Mariana Soares", slate: "Chapa 3 — Advocacia Independente", number: "30", bio: "Especialista em direito digital. Pauta jovem e tecnologia.", color: "from-rose-500 to-pink-700" },
];

type Step = "loading" | "vote" | "confirm" | "done";

export function ElectionBrowser({ open, onOpenChange, onVoted }: { open: boolean; onOpenChange: (v: boolean) => void; onVoted?: () => void }) {
  const [step, setStep] = useState<Step>("loading");
  const [selected, setSelected] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Reset and simulate page load when opening
  const handleOpen = (v: boolean) => {
    onOpenChange(v);
    if (v) {
      setStep("loading");
      setSelected(null);
      setProgress(0);
      let p = 0;
      const id = setInterval(() => {
        p += 18 + Math.random() * 14;
        if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setStep("vote"), 200); }
        setProgress(p);
      }, 140);
    }
  };

  const cast = () => {
    setStep("done");
    toast.success("Voto registrado com sucesso!");
    onVoted?.();
  };

  const reload = () => {
    setStep("loading");
    setSelected(null);
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 25;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(() => setStep("vote"), 150); }
      setProgress(p);
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-sm rounded-3xl p-0 overflow-hidden border-0 shadow-2xl gap-0 [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">Eleições SubseçãoPRO 2026</DialogTitle>

        {/* Browser chrome */}
        <div className="bg-slate-100 border-b border-slate-200">
          <div className="flex items-center gap-1 px-3 pt-2.5 pb-1.5">
            <button onClick={() => onOpenChange(false)} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 active:scale-90 transition">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={reload} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 active:scale-90 transition">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <div className="flex-1 flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-slate-200 mx-1 min-w-0">
              <Lock className="w-3 h-3 text-success shrink-0" />
              <span className="text-[11px] text-slate-700 truncate font-medium">votacao.oab-cidade-exemplo.org.br/2026</span>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 active:scale-90 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Loading bar */}
          <div className="h-0.5 bg-slate-200">
            <div className={cn("h-full bg-primary transition-all", step !== "loading" && "opacity-0")} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Page content */}
        <div className="bg-white min-h-[500px]">
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 className="w-7 h-7 animate-spin mb-2" />
              <p className="text-xs">Carregando portal de votação...</p>
            </div>
          )}

          {step === "vote" && (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-primary to-indigo-900 text-white px-5 py-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider opacity-80 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Sistema oficial • Eleições 2026
                </div>
                <h2 className="font-bold text-lg leading-tight mt-1">Eleições SubseçãoPRO</h2>
                <p className="text-xs opacity-90 mt-0.5">Triênio 2026–2028 • Escolha sua chapa</p>
              </div>
              <div className="p-4 space-y-2.5">
                {candidates.map((c) => {
                  const isSel = selected === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelected(c.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition active:scale-[0.99]",
                        isSel ? "border-primary bg-primary-soft" : "border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm", c.color)}>
                        {c.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                        <p className="text-[11px] text-primary font-medium">{c.slate}</p>
                        <p className="text-[10px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{c.bio}</p>
                      </div>
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", isSel ? "border-primary bg-primary" : "border-slate-300")}>
                        {isSel && <CheckCircle2 className="w-5 h-5 text-white -m-0.5" />}
                      </div>
                    </button>
                  );
                })}

                <button
                  disabled={!selected}
                  onClick={() => setStep("confirm")}
                  className="w-full mt-3 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm active:scale-[0.98] disabled:opacity-40 hover:bg-primary/90 transition flex items-center justify-center gap-2"
                >
                  <Vote className="w-4 h-4" /> Confirmar voto
                </button>
                <p className="text-[10px] text-center text-muted-foreground pt-1 leading-relaxed">
                  🔒 Voto secreto e auditável. Conexão criptografada.
                </p>
              </div>
            </div>
          )}

          {step === "confirm" && selected && (
            <div className="p-5 animate-fade-in">
              <button onClick={() => setStep("vote")} className="text-xs text-primary font-semibold mb-3 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Voltar
              </button>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <p className="text-xs font-semibold text-amber-900">⚠️ Confirme seu voto</p>
                <p className="text-[11px] text-amber-800 mt-0.5">Esta ação não poderá ser desfeita.</p>
              </div>
              {(() => {
                const c = candidates.find((x) => x.id === selected)!;
                return (
                  <div className="bg-surface border border-slate-200 rounded-2xl p-4 text-center">
                    <div className={cn("w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br text-white flex items-center justify-center font-bold text-2xl shadow-md", c.color)}>
                      {c.number}
                    </div>
                    <p className="font-bold text-slate-900 mt-2">{c.name}</p>
                    <p className="text-xs text-primary font-medium">{c.slate}</p>
                  </div>
                );
              })()}
              <div className="flex gap-2 mt-4">
                <button onClick={() => setStep("vote")} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 active:scale-[0.98]">
                  Cancelar
                </button>
                <button onClick={cast} className="flex-1 py-3 rounded-xl bg-success text-white text-sm font-semibold shadow-sm active:scale-[0.98]">
                  Confirmar
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="p-6 text-center animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-full bg-success/15 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h2 className="font-bold text-lg text-slate-900">Voto registrado!</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Obrigado por participar das eleições da SubseçãoPRO.
              </p>
              <div className="bg-surface border border-slate-200 rounded-xl p-3 mt-4 text-left">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Protocolo</p>
                <p className="font-mono text-xs text-slate-800 mt-1">VAL-2026-{Math.random().toString(36).slice(2, 10).toUpperCase()}</p>
              </div>
              <button onClick={() => onOpenChange(false)} className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                Fechar
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}