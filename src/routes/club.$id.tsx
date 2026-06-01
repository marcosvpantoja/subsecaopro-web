import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { partners } from "@/lib/mockData";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/club/$id")({ component: PartnerDetail });

function PartnerDetail() {
  const { id } = Route.useParams();
  const p = partners.find((x) => x.id === id);
  const [generated, setGenerated] = useState(false);
  if (!p) return <div className="p-6 text-sm">Parceiro não encontrado.</div>;
  const code = `OABVAL-${p.name.slice(0, 3).toUpperCase()}-2026-K7X3`;

  return (
    <div className="pb-6">
      <div className={`relative h-32 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
        <Link to="/club" className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></Link>
        <div className="text-white text-5xl font-bold drop-shadow">{p.name[0]}</div>
      </div>
      <div className="px-4 mt-4">
        <h1 className="text-lg font-bold text-slate-900">{p.name}</h1>
        <p className="text-xs text-muted-foreground">{p.category}</p>
        <div className="inline-flex mt-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-bold">{p.discount} de desconto</div>
        <p className="mt-3 text-sm text-slate-700">{p.description}</p>

        <div className="mt-4 bg-surface rounded-2xl border border-slate-100 p-3 space-y-1 text-xs text-slate-700">
          <p>• Válido para inscritos ativos na SubseçãoPRO</p>
          <p>• Apresentar QR Code ou código no estabelecimento</p>
          <p>• Limitado a 1 uso por mês por CPF</p>
          <p className="mt-1 text-muted-foreground">Validade: {p.validity}</p>
        </div>

        {!generated ? (
          <button onClick={() => setGenerated(true)} className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98]">
            🎟️ Gerar Cupom
          </button>
        ) : (
          <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 text-center animate-slide-up shadow-sm">
            <div className="text-2xl mb-1">🎉</div>
            <p className="text-xs text-muted-foreground">Cupom gerado com sucesso</p>
            <div className="w-32 h-32 mx-auto my-3 bg-white border-2 border-slate-200 rounded-xl p-1.5 grid grid-cols-10 gap-px">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className={Math.random() > 0.45 ? "bg-slate-900" : "bg-white"} />
              ))}
            </div>
            <p className="font-mono text-sm font-bold text-slate-900">{code}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => { navigator.clipboard?.writeText(code); toast.success("Código copiado!"); }} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98]"><Copy className="w-3.5 h-3.5 inline mr-1" />Copiar</button>
              <button onClick={() => {
                const data = { title: `Cupom ${p.name}`, text: `${p.discount} OFF em ${p.name} — código ${code}` };
                const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
                if (nav.share) nav.share(data).catch(() => undefined);
                else { navigator.clipboard?.writeText(`${data.title} — ${data.text}`); toast.success("Link copiado para compartilhar"); }
              }} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 active:scale-[0.98]"><Share2 className="w-3.5 h-3.5 inline mr-1" />Compartilhar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}