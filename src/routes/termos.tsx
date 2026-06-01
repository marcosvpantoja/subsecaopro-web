import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/termos")({ component: Terms });

function Terms() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pb-12">
      <div className="sticky top-[57px] z-10 bg-background/95 backdrop-blur border-b border-slate-100 px-4 py-3 flex items-center gap-2">
        <Link to="/configuracoes" className="w-9 h-9 -ml-2 rounded-full hover:bg-slate-100 flex items-center justify-center active:scale-95">
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <h1 className="text-base font-bold text-slate-900">Termos de Uso</h1>
      </div>

      <article className="px-5 pt-5 text-sm leading-relaxed text-slate-700 space-y-5">
        <header>
          <h2 className="text-lg font-bold text-slate-900">Termos de Uso — SubseçãoPRO</h2>
          <p className="text-xs text-muted-foreground mt-1">Última atualização: maio de 2026</p>
        </header>

        <Section n="1" title="Aceitação dos Termos">
          Ao utilizar o aplicativo SubseçãoPRO, você concorda com estes Termos de Uso. Caso não concorde, não utilize o app.
        </Section>
        <Section n="2" title="Sobre o Serviço">
          O SubseçãoPRO é uma plataforma digital que oferece serviços de comunicação, agendamento de salas, busca de advogados e benefícios exclusivos para advogados inscritos em subseções da OAB.
        </Section>
        <Section n="3" title="Acesso e Cadastro">
          O acesso completo ao app é restrito a advogados com inscrição ativa na subseção contratante. Cidadãos podem acessar áreas públicas sem cadastro.
        </Section>
        <Section n="4" title="Uso Adequado">
          É proibido utilizar o app para fins ilícitos, disseminar informações falsas ou prejudicar outros usuários.
        </Section>
        <Section n="5" title="Reservas e Pagamentos">
          Reservas de salas estão sujeitas à disponibilidade. Cancelamentos devem ser realizados com antecedência mínima de 2 horas. A taxa de serviço (3–5%) é não reembolsável.
        </Section>
        <Section n="6" title="Propriedade Intelectual">
          Todo o conteúdo do app é de propriedade do SubseçãoPRO ou das subseções licenciadas. Reprodução não autorizada é proibida.
        </Section>
        <Section n="7" title="Limitação de Responsabilidade">
          A IA de Triagem Jurídica é meramente orientativa e não substitui a consulta a um advogado habilitado.
        </Section>
        <Section n="8" title="Alterações">
          Estes termos podem ser atualizados a qualquer momento. Notificaremos os usuários sobre mudanças relevantes.
        </Section>
        <Section n="9" title="Contato">
          Em caso de dúvidas: <a className="text-primary font-medium" href="mailto:suporte@subsecaopro.com.br">suporte@subsecaopro.com.br</a>
        </Section>
      </article>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-24 right-4 z-30 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 hover:bg-primary/90 transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-semibold text-slate-900 mb-1">{n}. {title}</h3>
      <p>{children}</p>
    </section>
  );
}