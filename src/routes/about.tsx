import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Globe, Settings, ChevronRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="pb-6">
      <div className="px-4 pt-6 text-center">
        <Logo className="w-20 h-20 mx-auto" />
        <h1 className="mt-3 text-xl font-bold text-slate-900">SubseçãoPRO</h1>
        <p className="text-xs text-muted-foreground">Plataforma digital da subseção</p>
        <p className="text-xs text-muted-foreground mt-1">Servindo à advocacia e à sociedade desde 1987</p>
      </div>

      <div className="px-4 mt-5">
        <div className="bg-surface rounded-2xl border border-slate-100 p-4">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-primary">Missão</p>
          <p className="text-sm text-slate-800 mt-1 leading-relaxed">
            Defender a advocacia, a Constituição e o estado democrático de direito.
          </p>
        </div>
      </div>

      <div className="px-4 mt-3 space-y-2">
        <Item icon={<MapPin className="w-4 h-4" />} title="Endereço" value="Rua Exemplo, 100 — Centro — Cidade Exemplo/SP" />
        <Item icon={<Phone className="w-4 h-4" />} title="Telefone" value="(19) 3849-9999" />
        <Item icon={<Mail className="w-4 h-4" />} title="E-mail" value="contato@subsecao-exemplo.org.br" />
        <Item icon={<Clock className="w-4 h-4" />} title="Horário" value="Segunda a sexta, 9h–17h" />
      </div>

      <div className="px-4 mt-4">
        <div className="h-32 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 border border-slate-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(transparent 49%, #94a3b8 50%, transparent 51%), linear-gradient(90deg, transparent 49%, #94a3b8 50%, transparent 51%)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Diretoria</h2>
        <div className="space-y-2">
          {[
            { role: "Presidente", name: "Dr. Eduardo Marques Teixeira", color: "from-blue-400 to-blue-600" },
            { role: "Vice-Presidente", name: "Dra. Lúcia Pereira Fonseca", color: "from-rose-400 to-rose-600" },
            { role: "Secretária-Geral", name: "Dra. Mariana Castilho", color: "from-emerald-400 to-emerald-600" },
          ].map((d) => (
            <div key={d.role} className="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${d.color} text-white flex items-center justify-center font-bold text-xs`}>
                {d.name.split(" ").slice(-2).map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{d.role}</p>
                <p className="text-sm font-medium text-slate-800">{d.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5 grid grid-cols-3 gap-2">
        <SocialBtn icon={<Instagram className="w-4 h-4" />} label="Instagram" href="https://instagram.com/oabcidadeexemplo" />
        <SocialBtn icon={<Facebook className="w-4 h-4" />} label="Facebook" href="https://facebook.com/oabcidadeexemplo" />
        <SocialBtn icon={<Globe className="w-4 h-4" />} label="Site" href="https://www.oabsp.org.br" />
      </div>

      <div className="px-4 mt-6">
        <Link
          to="/configuracoes"
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-primary-soft/40 transition active:scale-[0.99]"
        >
          <Settings className="w-4 h-4" />
          <span className="flex-1 text-left">Configurações do App</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-center text-[10px] text-muted-foreground mt-4">SubseçãoPRO v1.0</p>
    </div>
  );
}

function Item({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-3 flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">{title}</p>
        <p className="text-sm text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function SocialBtn({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 rounded-xl bg-surface border border-slate-100 active:scale-95 hover:border-primary/40 transition">
      <div className="text-primary">{icon}</div>
      <span className="text-[10px] font-medium text-slate-700">{label}</span>
    </a>
  );
}