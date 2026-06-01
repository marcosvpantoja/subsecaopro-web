import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/privacidade")({ component: Privacy });

function Privacy() {
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
        <h1 className="text-base font-bold text-slate-900">Política de Privacidade</h1>
      </div>

      <article className="px-5 pt-5 text-sm leading-relaxed text-slate-700 space-y-5">
        <header>
          <h2 className="text-lg font-bold text-slate-900">Política de Privacidade — SubseçãoPRO</h2>
          <p className="text-xs text-muted-foreground mt-1">Última atualização: maio de 2026</p>
        </header>

        <Section n="1" title="Dados Coletados">
          Coletamos: nome, CPF, número da OAB, e-mail, telefone, localização aproximada e dados de uso do aplicativo.
        </Section>
        <Section n="2" title="Finalidade">
          <p>Os dados são utilizados para:</p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li>Autenticação e segurança</li>
            <li>Personalização da experiência</li>
            <li>Envio de notificações relevantes</li>
            <li>Processamento de reservas e pagamentos</li>
          </ul>
        </Section>
        <Section n="3" title="Compartilhamento">
          <p>Não vendemos seus dados. Compartilhamos apenas com:</p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li>Subseção contratante (dados do advogado inscrito)</li>
            <li>Processadores de pagamento (dados financeiros)</li>
            <li>Parceiros do clube de benefícios (apenas cupons utilizados)</li>
          </ul>
        </Section>
        <Section n="4" title="Armazenamento">
          Dados armazenados em servidores seguros no Brasil, em conformidade com a LGPD (Lei 13.709/2018).
        </Section>
        <Section n="5" title="Seus Direitos (LGPD)">
          Você tem direito a: acessar, corrigir, excluir e portabilizar seus dados. Solicite pelo e-mail{" "}
          <a className="text-primary font-medium" href="mailto:privacidade@subsecaopro.com.br">privacidade@subsecaopro.com.br</a>.
        </Section>
        <Section n="6" title="Cookies">
          Utilizamos cookies apenas para manter a sessão ativa e preferências do usuário (como tema e notificações).
        </Section>
        <Section n="7" title="Segurança">
          Utilizamos criptografia em trânsito (HTTPS/TLS) e em repouso para proteção dos seus dados pessoais.
        </Section>
        <Section n="8" title="Contato DPO">
          Encarregado de Dados: <a className="text-primary font-medium" href="mailto:dpo@subsecaopro.com.br">dpo@subsecaopro.com.br</a>
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
      <div>{children}</div>
    </section>
  );
}