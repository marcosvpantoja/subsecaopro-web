import { useTheme } from "@/lib/theme";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const { resolved } = useTheme();
  const src = resolved === "dark" ? logoDark : logoLight;
  return <img src={src} alt="SubseçãoPRO" className={cn("object-contain", className)} />;
}