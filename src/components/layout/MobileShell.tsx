import { useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home, Search, Bot, ConciergeBell, Landmark, DoorOpen, Ticket, User,
  Bell, Eye, EyeOff, Loader2, ShieldCheck, LogIn, LogOut, UserCircle2,
} from "lucide-react";
import { useMode } from "@/lib/mode";
import { notifications, lawyers, currentLawyer } from "@/lib/mockData";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const publicTabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/lawyers", label: "Advogados", icon: Search },
  { to: "/ai", label: "IA Jurídica", icon: Bot },
  { to: "/services", label: "Serviços", icon: ConciergeBell },
  { to: "/about", label: "Sobre", icon: Landmark },
] as const;

const lawyerTabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/rooms", label: "Salas", icon: DoorOpen },
  { to: "/lawyers", label: "Busca", icon: Search },
  { to: "/club", label: "Clube", icon: Ticket },
  { to: "/profile", label: "Perfil", icon: User },
] as const;

export function MobileShell({ children }: { children: React.ReactNode }) {
  const { mode } = useMode();
  const tabs = mode === "public" ? publicTabs : lawyerTabs;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full bg-slate-100 sm:bg-slate-200 sm:py-6 sm:px-2">
      <div className="max-w-sm mx-auto bg-background relative overflow-hidden sm:rounded-[2.5rem] sm:shadow-2xl sm:border-[10px] sm:border-slate-900 min-h-[100dvh] sm:min-h-[780px]">
        <AppHeader onRequestLogin={() => setLoginOpen(true)} />
        <main key={pathname} className="pb-28 animate-fade-in">
          {children}
        </main>

        <nav aria-label="Navegação principal" className="fixed sm:absolute bottom-0 inset-x-0 max-w-sm mx-auto bg-white/95 backdrop-blur border-t border-slate-200 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:rounded-b-[2rem] z-30 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.08)]">
          <ul className="flex items-stretch justify-around">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
              return (
                <li key={t.to} className="flex-1">
                  <Link
                    to={t.to}
                    aria-label={t.label}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex flex-col items-center justify-center gap-0.5 min-h-11 py-2 rounded-xl transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      active ? "text-primary" : "text-slate-500"
                    )}
                  >
                    <Icon className={cn("w-5 h-5 transition-transform", active && "stroke-[2.5] scale-110")} aria-hidden="true" />
                    <span className={cn("text-[11px] leading-none font-medium", active && "font-semibold")}>{t.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={() => {
          setLoginOpen(false);
          toast.success("Bem-vindo, Dr. Thiago!");
        }}
      />
    </div>
  );
}

function AppHeader({ onRequestLogin }: { onRequestLogin: () => void }) {
  const { mode, isAuthenticated, logout, setMode } = useMode();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const filtered = notifications.filter((n) => mode === "lawyer" || !n.forLawyer);
  const photo = lawyers.find((l) => l.id === currentLawyer.id)?.photo;

  const handleLogout = () => {
    setAccountOpen(false);
    logout();
    toast.success("Sessão encerrada");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 min-w-0">
        <Logo className="w-9 h-9 shrink-0" />
          <div className="leading-tight min-w-0">
            <div className="font-bold text-sm text-slate-900 truncate">SubseçãoPRO</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <span>Subseção • SP</span>
            {isAuthenticated && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-px rounded-full bg-success/15 text-success font-semibold">
                <span className="w-1 h-1 rounded-full bg-success" /> Conectado
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-1 shrink-0">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button aria-label={`Notificações${filtered.length ? ` (${filtered.length} não lidas)` : ""}`} className="relative w-11 h-11 rounded-full hover:bg-slate-100 flex items-center justify-center transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
              <Bell className="w-5 h-5 text-slate-700" aria-hidden="true" />
              {filtered.length > 0 && (
                <span aria-hidden="true" className="absolute top-2 right-2 min-w-4 h-4 px-1 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                  {filtered.length}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Notificações</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {filtered.map((n) => (
                <Link
                  key={n.id}
                  to={n.href}
                  onClick={() => setOpen(false)}
                  className="block p-3 rounded-xl bg-surface border border-slate-100 flex gap-3 hover:border-primary/40 active:scale-[0.99] transition"
                >
                  <div className="text-xl">{n.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {isAuthenticated ? (
          <Popover open={accountOpen} onOpenChange={setAccountOpen}>
            <PopoverTrigger asChild>
              <button aria-label="Abrir menu da conta" className="w-11 h-11 p-0.5 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition active:scale-95 focus-visible:outline-none focus-visible:ring-primary/50">
                {photo ? (
                  <img src={photo} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold rounded-full">{currentLawyer.initials}</div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-60 p-2">
              <div className="px-2 py-2 border-b border-slate-100 mb-1">
                <p className="text-sm font-semibold text-slate-900 truncate">{currentLawyer.name}</p>
                <p className="text-[11px] text-muted-foreground">{currentLawyer.oab}</p>
              </div>
              <button onClick={() => { setAccountOpen(false); navigate({ to: "/profile" }); }} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition">
                <UserCircle2 className="w-4 h-4" /> Meu perfil
              </button>
              <button onClick={() => { setAccountOpen(false); setMode("public"); }} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition">
                <span className="w-4 h-4 flex items-center justify-center text-xs">👤</span> Modo público
              </button>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-danger hover:bg-danger/10 transition">
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <button
            onClick={onRequestLogin}
            className="flex items-center gap-1.5 pl-2.5 pr-3 h-9 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm hover:bg-primary/90 active:scale-95 transition"
          >
            <LogIn className="w-3.5 h-3.5" /> Entrar
          </button>
        )}
      </div>
    </header>
  );
}

function LoginDialog({ open, onOpenChange, onSuccess }: { open: boolean; onOpenChange: (v: boolean) => void; onSuccess: () => void }) {
  const { login } = useMode();
  const [oab, setOab] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (oabVal: string, pwdVal: string) => {
    setLoading(true);
    setErr(null);
    const r = await login(oabVal, pwdVal);
    setLoading(false);
    if (r.ok) { setOab(""); setPwd(""); onSuccess(); }
    else setErr(r.error ?? "Falha ao entrar.");
  };

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    submit(oab, pwd);
  };

  const oabValid = oab.replace(/\D/g, "").length >= 4;
  const pwdValid = pwd.length >= 4;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
        <div className="relative bg-gradient-to-br from-primary via-indigo-800 to-indigo-950 text-white p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-3 ring-1 ring-white/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <DialogHeader className="text-left space-y-1">
              <DialogTitle className="text-white text-xl tracking-tight">Acesso do Advogado</DialogTitle>
              <DialogDescription className="text-white/75 text-xs leading-relaxed">
                Entre com seu número OAB para acessar reservas, clube de benefícios e seu perfil profissional.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>
        <form onSubmit={handle} className="p-5 space-y-3.5">
          <label className="block">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Número OAB</span>
            <input
              value={oab}
              onChange={(e) => setOab(e.target.value)}
              inputMode="numeric"
              placeholder="Ex.: 378.901"
              className={cn(
                "w-full mt-1 px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition",
                oab === "" ? "border-slate-200 focus:ring-primary/20 focus:border-primary"
                  : oabValid ? "border-success focus:ring-success/20" : "border-danger focus:ring-danger/20"
              )}
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Senha</span>
            <div className="relative mt-1">
              <input
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="••••••"
                className={cn(
                  "w-full px-3 py-2.5 pr-10 rounded-xl border text-sm focus:outline-none focus:ring-2 transition",
                  pwd === "" ? "border-slate-200 focus:ring-primary/20 focus:border-primary"
                    : pwdValid ? "border-success focus:ring-success/20" : "border-danger focus:ring-danger/20"
                )}
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>
          {err && <p className="text-xs text-danger bg-danger/10 px-3 py-2 rounded-lg">{err}</p>}
          <button
            type="submit"
            disabled={loading || !oabValid || !pwdValid}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm active:scale-[0.98] disabled:opacity-50 hover:bg-primary/90 transition"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Entrando...</> : "Entrar"}
          </button>
          <div className="flex items-center gap-2 my-1">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => { setOab("378901"); setPwd("demo123"); submit("378901", "demo123"); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 active:scale-[0.98] transition disabled:opacity-50"
          >
            ⚡ Entrar com conta demo (Dr. Thiago)
          </button>
          <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
            <button type="button" className="hover:text-primary">Esqueci minha senha</button>
            <button type="button" className="hover:text-primary">Primeiro acesso?</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}