import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { partners } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/club/")({ component: Club });

const cats = ["Todos", "Saúde", "Educação", "Alimentação", "Tecnologia", "Serviços"] as const;

function Club() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const list = cat === "Todos" ? partners : partners.filter((p) => p.category === cat);
  return (
    <div className="pb-6">
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold text-slate-900">Clube SubseçãoPRO</h1>
        <p className="text-xs text-muted-foreground">Benefícios exclusivos para inscritos</p>
      </div>
      <div className="mt-3 flex gap-1.5 px-4 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition", c === cat ? "bg-primary text-primary-foreground border-primary" : "bg-white text-slate-600 border-slate-200")}>{c}</button>
        ))}
      </div>
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        {list.map((p) => (
          <Link key={p.id} to="/club/$id" params={{ id: p.id }} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition">
            <div className={`h-20 bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-2xl font-bold`}>{p.name[0]}</div>
            <div className="p-2.5">
              <p className="text-xs font-semibold text-slate-900 truncate">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.category}</p>
              <div className="mt-1 inline-flex px-1.5 py-0.5 rounded-md bg-accent/30 text-accent-foreground text-[10px] font-bold">{p.discount} OFF</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}