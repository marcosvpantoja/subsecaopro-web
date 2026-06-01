import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Check, Sun, Moon, Monitor, FileText, Lock } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configuracoes")({ component: Settings });

function Settings() {
  const { theme, setTheme } = useTheme();

  const handlePick = (t: Theme) => {
    if (t === theme) return;
    setTheme(t);
    toast.success("✅ Tema alterado com sucesso");
  };

  return (
    <div className="pb-10">
      <div className="px-4 pt-4 flex items-center gap-2">
        <Link to="/about" className="w-9 h-9 -ml-2 rounded-full hover:bg-slate-100 flex items-center justify-center active:scale-95">
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </Link>
        <h1 className="text-base font-bold text-slate-900">Configurações</h1>
      </div>

      <section className="px-4 mt-5">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Aparência</p>
        <div className="grid grid-cols-3 gap-2">
          <ThemeCard label="Claro" active={theme === "light"} onClick={() => handlePick("light")}>
            <ThemePreview variant="light" />
          </ThemeCard>
          <ThemeCard label="Escuro" active={theme === "dark"} onClick={() => handlePick("dark")}>
            <ThemePreview variant="dark" />
          </ThemeCard>
          <ThemeCard label="Sistema" active={theme === "system"} onClick={() => handlePick("system")}>
            <ThemePreview variant="system" />
          </ThemeCard>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
          <div className="flex items-center justify-center gap-1"><Sun className="w-3 h-3" /> Sempre claro</div>
          <div className="flex items-center justify-center gap-1"><Moon className="w-3 h-3" /> Sempre escuro</div>
          <div className="flex items-center justify-center gap-1"><Monitor className="w-3 h-3" /> Acompanha SO</div>
        </div>
      </section>

      <section className="px-4 mt-7">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Legal</p>
        <div className="space-y-2">
          <LegalItem to="/termos" icon={<FileText className="w-4 h-4" />} title="Termos de Uso" />
          <LegalItem to="/privacidade" icon={<Lock className="w-4 h-4" />} title="Política de Privacidade" />
        </div>
      </section>

      <p className="text-center text-[10px] text-muted-foreground mt-8">SubseçãoPRO v1.0</p>
    </div>
  );
}

function ThemeCard({ label, active, onClick, children }: { label: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full rounded-2xl bg-white border p-2 flex flex-col items-center gap-2 transition active:scale-[0.97]",
        active ? "border-accent ring-2 ring-accent/30 shadow-sm" : "border-slate-200 hover:border-slate-300"
      )}
    >
      {active && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
      )}
      {children}
      <span className={cn("text-[11px] font-semibold", active ? "text-accent" : "text-slate-700")}>{label}</span>
    </button>
  );
}

function ThemePreview({ variant }: { variant: "light" | "dark" | "system" }) {
  if (variant === "light") {
    return (
      <div className="w-full h-14 rounded-lg bg-white border border-slate-200 overflow-hidden flex flex-col">
        <div className="h-3 bg-[#1e3a8a] flex items-center px-1.5"><div className="w-2 h-2 rounded-full bg-[#C9A84C]" /></div>
        <div className="flex-1 p-1.5 space-y-1">
          <div className="h-1.5 rounded bg-slate-200" />
          <div className="h-1.5 rounded bg-[#1e3a8a]/70 w-2/3" />
        </div>
      </div>
    );
  }
  if (variant === "dark") {
    return (
      <div className="w-full h-14 rounded-lg bg-[#0F1B2D] border border-[#1C2D45] overflow-hidden flex flex-col">
        <div className="h-3 bg-[#162236] flex items-center px-1.5"><div className="w-2 h-2 rounded-full bg-[#C9A84C]" /></div>
        <div className="flex-1 p-1.5 space-y-1">
          <div className="h-1.5 rounded bg-[#1C2D45]" />
          <div className="h-1.5 rounded bg-[#4A7CC7] w-2/3" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-14 rounded-lg overflow-hidden border border-slate-200 flex">
      <div className="w-1/2 bg-white flex flex-col">
        <div className="h-3 bg-[#1e3a8a]" />
        <div className="flex-1 p-1.5 space-y-1"><div className="h-1.5 rounded bg-slate-200" /></div>
      </div>
      <div className="w-1/2 bg-[#0F1B2D] flex flex-col">
        <div className="h-3 bg-[#162236]" />
        <div className="flex-1 p-1.5 space-y-1"><div className="h-1.5 rounded bg-[#1C2D45]" /></div>
      </div>
    </div>
  );
}

function LegalItem({ to, icon, title }: { to: string; icon: React.ReactNode; title: string }) {
  return (
    <Link to={to as any} className="w-full bg-white border border-slate-100 rounded-xl p-3 flex items-center gap-3 active:scale-[0.99] hover:border-primary/40 transition">
      <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">{icon}</div>
      <span className="flex-1 text-left text-sm font-medium text-slate-800">{title}</span>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </Link>
  );
}