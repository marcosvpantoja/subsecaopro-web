import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { lawyers } from "@/lib/mockData";
import { Sparkles, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/ai")({ component: AIChat });

type Msg = { role: "ai" | "user"; text: string; cards?: boolean };

const initial: Msg[] = [
  { role: "ai", text: "Olá! Sou a assistente jurídica da SubseçãoPRO. Para te ajudar melhor, me conta: qual é o seu problema ou situação que precisa de ajuda jurídica?" },
  { role: "user", text: "Fui demitido sem justa causa há 3 meses e meu empregador não pagou o FGTS nem o seguro-desemprego." },
  { role: "ai", text: "Entendi. Sua situação envolve direitos trabalhistas, especificamente rescisão de contrato e obrigações do empregador.\n\n📋 Área do Direito: Direito Trabalhista\n⏰ Prazo para agir: Até 2 anos após a rescisão para ingressar com ação na Justiça do Trabalho.\n\nDireitos possivelmente violados:\n• Saque do FGTS com multa de 40%\n• Seguro-desemprego\n• Aviso prévio indenizado\n• Verbas rescisórias (férias + 13º proporcionais)\n\nRecomendo consultar um advogado trabalhista o quanto antes. Veja profissionais especializados:", cards: true },
];

function AIChat() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");
  const trab = lawyers.filter((l) => l.specialties.includes("Trabalhista"));

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }, { role: "ai", text: "Obrigada pela sua mensagem. Estou analisando os detalhes para te orientar — em uma versão real, vou indicar a área do Direito, os prazos e os profissionais ideais para o seu caso." }]);
    setText("");
    toast.success("Mensagem enviada");
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)] -mb-28">
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
              IA de Triagem Jurídica
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-bold">BETA</span>
            </h1>
            <p className="text-[10px] text-muted-foreground">Triagem inicial — não substitui um advogado</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar px-3 py-3 space-y-2.5 bg-surface">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex gap-2 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>Esta IA não substitui um advogado. Oferece apenas orientação inicial para ajudá-lo a encontrar o profissional certo.</p>
        </div>

        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug whitespace-pre-line ${
              m.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-white border border-slate-100 text-slate-800 rounded-bl-md"
            }`}>
              {m.text}
              {m.cards && (
                <div className="mt-2 space-y-2">
                  {trab.map((l) => (
                    <Link key={l.id} to="/lawyers/$id" params={{ id: l.id }} className="flex items-center gap-2 p-2 rounded-xl bg-surface border border-slate-200">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${l.color} text-white flex items-center justify-center text-xs font-bold`}>{l.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">{l.name}</p>
                        <p className="text-[10px] text-muted-foreground">{l.oab}</p>
                      </div>
                    </Link>
                  ))}
                  <Link to="/lawyers" className="block text-center text-xs font-semibold text-primary py-1.5">Ver todos os trabalhistas →</Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-white p-2 pb-[calc(env(safe-area-inset-bottom)+5rem)] flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Digite sua dúvida jurídica..."
          className="flex-1 px-3 py-2.5 rounded-full bg-surface border border-slate-200 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button onClick={send} className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-95 shadow-sm">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}