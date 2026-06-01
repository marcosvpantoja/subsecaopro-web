import { createContext, useContext, useState, type ReactNode } from "react";
import { currentLawyer } from "./mockData";

export type Mode = "public" | "lawyer";

type Ctx = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
  isAuthenticated: boolean;
  user: typeof currentLawyer | null;
  login: (oab: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const ModeContext = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("public");
  const [isAuth, setIsAuth] = useState(false);

  const setMode = (m: Mode) => {
    if (m === "lawyer" && !isAuth) return; // gated by login UI
    setModeState(m);
  };

  const login = async (oab: string, password: string) => {
    await new Promise((r) => setTimeout(r, 650));
    const cleaned = oab.replace(/\D/g, "");
    if (cleaned.length < 4) return { ok: false, error: "Número da OAB inválido." };
    if (password.length < 4) return { ok: false, error: "Senha deve ter ao menos 4 caracteres." };
    setIsAuth(true);
    setModeState("lawyer");
    return { ok: true };
  };

  const logout = () => {
    setIsAuth(false);
    setModeState("public");
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        toggle: () => setModeState(mode === "public" ? "lawyer" : "public"),
        isAuthenticated: isAuth,
        user: isAuth ? currentLawyer : null,
        login,
        logout,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
}