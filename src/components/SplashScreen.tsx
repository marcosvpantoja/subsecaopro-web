import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const SHOWN_KEY = "subsecaopro:splash:shown";

export function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SHOWN_KEY);
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SHOWN_KEY, "1");
    const leave = setTimeout(() => setLeaving(true), 1600);
    const hide = setTimeout(() => setVisible(false), 2200);
    return () => {
      clearTimeout(leave);
      clearTimeout(hide);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500",
        "bg-[radial-gradient(ellipse_at_top,_#1e3a8a_0%,_#0F1B2D_55%,_#070d1a_100%)]",
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#4A7CC7]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#C9A84C]/20 blur-3xl" />

      <div className="relative flex flex-col items-center gap-5 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 -m-4 rounded-3xl bg-white/10 blur-xl" />
          <div className="relative w-28 h-28 rounded-3xl bg-white/10 backdrop-blur ring-1 ring-white/20 shadow-2xl flex items-center justify-center">
            <Logo className="w-20 h-20 drop-shadow-lg" />
          </div>
        </div>

        <div className="text-center animate-slide-up">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Subseção<span className="text-[#C9A84C]">PRO</span>
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">
            OAB • Subseção de Sumaré
          </p>
        </div>

        <div className="mt-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
        </div>
      </div>

      <p className="absolute bottom-6 text-[10px] tracking-widest uppercase text-white/40">
        Carregando experiência
      </p>
    </div>
  );
}