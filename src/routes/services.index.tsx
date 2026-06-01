import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, BookOpen, Handshake, Landmark, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/services/")({ component: Services });

const services = [
  { slug: "assistencia", icon: HandHeart, title: "Assistência Jurídica Gratuita", desc: "Atendimento gratuito para cidadãos de baixa renda", color: "from-emerald-500 to-teal-600" },
  { slug: "orientacoes", icon: BookOpen, title: "Orientações Legais", desc: "Artigos práticos sobre seus direitos", color: "from-blue-500 to-indigo-600" },
  { slug: "parceiro", icon: Handshake, title: "Seja um Parceiro", desc: "Ofereça benefícios para advogados inscritos", color: "from-amber-500 to-orange-600" },
  { slug: "sobre", icon: Landmark, title: "Sobre a SubseçãoPRO", desc: "Conheça a história e a diretoria", color: "from-slate-600 to-slate-800" },
] as const;

function Services() {
  return (
    <div className="pb-6">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900">Serviços da SubseçãoPRO</h1>
        <p className="text-xs text-muted-foreground mt-0.5">A subseção a serviço da sociedade.</p>
      </div>
      <div className="px-4 mt-3 space-y-2.5">
        {services.map((s) => {
          const Icon = s.icon;
          if (s.slug === "sobre") {
            return (
              <Link key={s.slug} to="/about" className="block bg-white border border-slate-100 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition">
                <CardInner Icon={Icon} title={s.title} desc={s.desc} color={s.color} />
              </Link>
            );
          }
          return (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block bg-white border border-slate-100 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition">
              <CardInner Icon={Icon} title={s.title} desc={s.desc} color={s.color} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CardInner({ Icon, title, desc, color }: { Icon: any; title: string; desc: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center shadow-sm`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-sm text-slate-900">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </div>
  );
}