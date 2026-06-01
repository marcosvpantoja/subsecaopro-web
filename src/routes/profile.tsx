import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { currentLawyer, transactions, lawyers } from "@/lib/mockData";
import { useMode } from "@/lib/mode";
import { Edit3, CalendarDays, Wallet, Bell, LogOut, ChevronRight, Settings, Camera } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/profile")({ component: Profile });

type View = "menu" | "edit" | "finance" | "notif";

const AREAS = ["Trabalhista", "Civil", "Família", "Sucessões", "Penal", "Tributário", "Empresarial", "Imobiliário", "Digital", "Startups", "Consumidor", "Previdenciário"];
const ATENDIMENTO = ["Presencial", "Online"] as const;

function Profile() {
  const { logout } = useMode();
  const initialPhoto = lawyers.find((l) => l.id === currentLawyer.id)?.photo;
  const [photo, setPhoto] = useState<string | undefined>(initialPhoto);
  const [view, setView] = useState<View>("menu");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [notifs, setNotifs] = useState({ comm: true, feed: true, events: true, res: true, coupons: false });
  const initialAreas = lawyers.find((l) => l.id === currentLawyer.id)?.specialties ?? ["Digital", "Startups"];
  const [selectedAreas, setSelectedAreas] = useState<string[]>(initialAreas);
  const [atendimento, setAtendimento] = useState<string[]>(["Presencial", "Online"]);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      toast.success("Foto atualizada");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pb-6">
      {view === "menu" && (
        <>
          <div className="px-4 pt-5 text-center">
            {photo ? (
              <img src={photo} alt={currentLawyer.name} className="w-40 h-40 mx-auto rounded-2xl object-cover shadow-lg ring-4 ring-white" />
            ) : (
              <div className="w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">{currentLawyer.initials}</div>
            )}
            <h1 className="mt-2 font-bold text-base text-slate-900">{currentLawyer.name}</h1>
            <p className="text-xs text-muted-foreground">{currentLawyer.oab} • {currentLawyer.specialty}</p>
            <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-success/15 text-success text-[10px] font-bold">✅ Inscrito Ativo — Cidade Exemplo</span>
          </div>

          <div className="px-4 mt-4 space-y-2">
            <MenuItem icon={<Edit3 className="w-4 h-4" />} label="Editar Perfil Público" onClick={() => setView("edit")} />
            <Link to="/reservations" className="block"><MenuItem icon={<CalendarDays className="w-4 h-4" />} label="Minhas Reservas" /></Link>
            <MenuItem icon={<Wallet className="w-4 h-4" />} label="Histórico Financeiro" onClick={() => setView("finance")} />
            <MenuItem icon={<Bell className="w-4 h-4" />} label="Configurações de Notificação" onClick={() => setView("notif")} />
            <Link to="/configuracoes" className="block"><MenuItem icon={<Settings className="w-4 h-4" />} label="Configurações do App" /></Link>
            <MenuItem icon={<LogOut className="w-4 h-4 text-danger" />} label="Sair" danger onClick={() => setConfirmLogout(true)} />
          </div>
        </>
      )}

      {view === "edit" && (
        <div className="px-4 pt-4 space-y-3">
          <button onClick={() => setView("menu")} className="text-xs text-primary font-semibold">← Voltar</button>
          <h2 className="font-bold text-base">Editar perfil público</h2>

          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              {photo ? (
                <img src={photo} alt={currentLawyer.name} className="w-40 h-40 rounded-2xl object-cover shadow-lg ring-4 ring-white" />
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">{currentLawyer.initials}</div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Alterar foto de perfil"
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md active:scale-95"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
            </div>
            <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-primary font-semibold">Alterar foto</button>
          </div>

          <Field label="Bio" defaultValue={currentLawyer.bio} textarea />

          <div>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Áreas de atuação</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {AREAS.map((a) => {
                const checked = selectedAreas.includes(a);
                return (
                  <label key={a} className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition ${checked ? "bg-primary text-primary-foreground border-primary" : "bg-white text-slate-700 border-slate-200"}`}>
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(selectedAreas, setSelectedAreas, a)} />
                    {a}
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Forma de atendimento</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {ATENDIMENTO.map((a) => {
                const checked = atendimento.includes(a);
                return (
                  <label key={a} className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition ${checked ? "bg-primary text-primary-foreground border-primary" : "bg-white text-slate-700 border-slate-200"}`}>
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(atendimento, setAtendimento, a)} />
                    {a}
                  </label>
                );
              })}
            </div>
          </div>

          <Field label="Endereço" defaultValue="Rua Exemplo, 100 — Cidade Exemplo" />
          <Field label="WhatsApp" defaultValue={currentLawyer.whatsapp} />
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-slate-100">
            <span className="text-sm text-slate-800">Perfil visível na busca pública</span>
            <Toggle defaultChecked />
          </div>
          <button onClick={() => { toast.success("Perfil atualizado com sucesso!"); setView("menu"); }} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98]">Salvar alterações</button>
        </div>
      )}

      {view === "finance" && (
        <div className="px-4 pt-4 space-y-3">
          <button onClick={() => setView("menu")} className="text-xs text-primary font-semibold">← Voltar</button>
          <h2 className="font-bold text-base">Histórico financeiro</h2>
          <div className="space-y-2">
            {transactions.map((t) => (
              <div key={t.id} className="bg-white border border-slate-100 rounded-xl p-3 flex justify-between text-sm">
                <div>
                  <p className="font-medium text-slate-900">{t.roomName}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {t.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-success">✅ Pago</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-primary-soft rounded-xl p-3 flex justify-between text-sm font-semibold">
            <span>Total do mês</span>
            <span>R$ {transactions.reduce((s, t) => s + t.amount, 0).toFixed(2)}</span>
          </div>
        </div>
      )}

      {view === "notif" && (
        <div className="px-4 pt-4 space-y-3">
          <button onClick={() => setView("menu")} className="text-xs text-primary font-semibold">← Voltar</button>
          <h2 className="font-bold text-base">Notificações</h2>
          <div className="space-y-2">
            {[
              { k: "comm", l: "Comunicados da subseção" },
              { k: "feed", l: "Novos posts no feed" },
              { k: "events", l: "Eventos e palestras" },
              { k: "res", l: "Reservas e pagamentos" },
              { k: "coupons", l: "Novos cupons disponíveis" },
            ].map((n) => (
              <div key={n.k} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-slate-100">
                <span className="text-sm text-slate-800">{n.l}</span>
                <Toggle checked={notifs[n.k as keyof typeof notifs]} onChange={(v) => setNotifs((p) => ({ ...p, [n.k]: v }))} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <DialogContent className="max-w-xs rounded-2xl">
          <DialogHeader><DialogTitle>Deseja encerrar a sessão?</DialogTitle></DialogHeader>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setConfirmLogout(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium">Cancelar</button>
            <button onClick={() => { setConfirmLogout(false); logout(); toast.success(`Até logo, ${currentLawyer.name.split(" ")[0]} ${currentLawyer.name.split(" ")[1]}!`); }} className="flex-1 py-2.5 rounded-xl bg-danger text-white text-sm font-semibold">Sair</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick?: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className="w-full bg-white border border-slate-100 rounded-xl p-3 flex items-center gap-3 active:scale-[0.99]">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${danger ? "bg-danger/10 text-danger" : "bg-primary-soft text-primary"}`}>{icon}</div>
      <span className={`flex-1 text-left text-sm font-medium ${danger ? "text-danger" : "text-slate-800"}`}>{label}</span>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </button>
  );
}

function Field({ label, defaultValue, textarea }: { label: string; defaultValue: string; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{label}</span>
      {textarea ? (
        <textarea defaultValue={defaultValue} rows={3} className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
      ) : (
        <input defaultValue={defaultValue} className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
      )}
    </label>
  );
}

function Toggle({ checked, defaultChecked, onChange }: { checked?: boolean; defaultChecked?: boolean; onChange?: (v: boolean) => void }) {
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const v = checked ?? internal;
  return (
    <button
      role="switch"
      aria-checked={v}
      aria-label={v ? "Ativado" : "Desativado"}
      onClick={() => { const nv = !v; setInternal(nv); onChange?.(nv); }}
      className={`w-11 h-6 rounded-full transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${v ? "bg-primary" : "bg-slate-300"}`}
    >
      <span className={`absolute top-0.5 ${v ? "right-0.5" : "left-0.5"} w-5 h-5 bg-white rounded-full shadow transition-all`} />
    </button>
  );
}