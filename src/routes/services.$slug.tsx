import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { articles } from "@/lib/mockData";
import { ArrowLeft, MessageCircle, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/services/$slug")({ component: ServiceDetail });

function ServiceDetail() {
  const { slug } = Route.useParams();
  const title =
    slug === "assistencia" ? "Assistência Jurídica Gratuita" :
    slug === "orientacoes" ? "Orientações Legais" :
    slug === "parceiro" ? "Seja um Parceiro" :
    slug.startsWith("artigo-") ? "Artigo" : "Detalhes";

  return (
    <div className="pb-6">
      <div className="px-4 pt-4 flex items-center gap-2">
        <Link to="/services" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center active:scale-95">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-bold text-base text-slate-900">{title}</h1>
      </div>

      <div className="px-4 mt-4">
        {slug === "assistencia" && <Assistencia />}
        {slug === "orientacoes" && <Orientacoes />}
        {slug === "parceiro" && <Parceiro />}
        {slug.startsWith("artigo-") && <Artigo slug={slug.replace("artigo-", "")} />}
      </div>
    </div>
  );
}

function Assistencia() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-700 leading-relaxed">
        A SubseçãoPRO oferece atendimento jurídico gratuito para cidadãos de baixa renda. O serviço é prestado por advogados voluntários cadastrados na subseção.
      </p>
      <div className="bg-surface rounded-2xl border border-slate-100 p-4 space-y-2.5 text-sm">
        <Field title="Requisitos" value="RG, CPF, comprovante de renda e de residência" />
        <Field title="Horário" value="Terças e quintas, 14h–17h" />
        <Field title="Local" value="Sede da SubseçãoPRO — Rua Exemplo, 100" />
      </div>
      <a href="https://wa.me/5519999999999" target="_blank" rel="noreferrer" className="block text-center py-3 rounded-xl bg-success text-white font-semibold text-sm active:scale-[0.98]">
        <MessageCircle className="w-4 h-4 inline mr-1" /> Solicitar atendimento via WhatsApp
      </a>
    </div>
  );
}

function Orientacoes() {
  return (
    <div className="space-y-2">
      {articles.map((a) => (
        <Link key={a.slug} to="/services/$slug" params={{ slug: `artigo-${a.slug}` }} className="block bg-white border border-slate-100 rounded-2xl p-3 active:scale-[0.98]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-xl">{a.icon}</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900 leading-tight">{a.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{a.summary}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 mt-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function Artigo({ slug }: { slug: string }) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return <p className="text-sm text-muted-foreground">Artigo não encontrado.</p>;
  return (
    <article className="space-y-3">
      <div className="text-4xl">{a.icon}</div>
      <h2 className="text-lg font-bold text-slate-900 leading-tight">{a.title}</h2>
      <p className="text-sm text-slate-700 leading-relaxed">{a.summary}</p>
      <p className="text-sm text-slate-700 leading-relaxed">
        Conhecer seus direitos é o primeiro passo para garanti-los. Este guia rápido reúne as informações essenciais que todo cidadão precisa saber sobre o tema, com linguagem acessível e exemplos práticos do dia a dia.
      </p>
      <p className="text-sm text-slate-700 leading-relaxed">
        Caso a situação envolva valores significativos, prazos legais ou risco de perda de direitos, recomendamos fortemente buscar a orientação de um advogado especializado. A SubseçãoPRO mantém um diretório de profissionais inscritos para te auxiliar.
      </p>
      <p className="text-sm text-slate-700 leading-relaxed">
        Lembre-se: cada caso é único. As informações deste artigo têm caráter educativo e não substituem o atendimento profissional personalizado.
      </p>
      <Link to="/lawyers" className="block text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98]">
        Encontrar um advogado
      </Link>
    </article>
  );
}

function Parceiro() {
  const [form, setForm] = useState({ company: "", sector: "", phone: "", email: "" });
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-base text-slate-900">Ofereça benefícios para advogados inscritos</h2>
        <p className="text-xs text-muted-foreground mt-1">Seja parceiro do Clube SubseçãoPRO</p>
      </div>
      <div className="bg-surface rounded-2xl border border-slate-100 p-3 text-sm text-slate-700 space-y-1">
        <p>• Exposição para advogados inscritos</p>
        <p>• Banner no app (planos Regional e Capital)</p>
        <p>• Divulgação nas redes sociais da SubseçãoPRO</p>
        <p>• Relatório de uso dos cupons</p>
      </div>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Categorias aceitas</p>
      <div className="flex flex-wrap gap-1.5">
        {["Saúde", "Educação", "Alimentação", "Tecnologia", "Serviços"].map((c) => (
          <span key={c} className="px-2 py-1 rounded-full text-xs bg-white border border-slate-200 text-slate-700">{c}</span>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Proposta enviada! Entraremos em contato em até 2 dias úteis.");
          setForm({ company: "", sector: "", phone: "", email: "" });
        }}
        className="space-y-2"
      >
        <Input label="Nome da empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        <Input label="Setor" value={form.sector} onChange={(v) => setForm({ ...form, sector: v })} />
        <Input label="Telefone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Input label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98]">
          Enviar proposta de parceria
        </button>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  const valid = value.length > 0;
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
          valid ? "border-success focus:ring-success/20" : "border-slate-200 focus:ring-primary/20 focus:border-primary"
        }`}
      />
    </label>
  );
}

function Field({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{title}</p>
      <p className="text-sm text-slate-800">{value}</p>
    </div>
  );
}