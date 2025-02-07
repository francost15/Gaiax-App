import { Button } from "@/components";
import { Sparkles } from "lucide-react";

const shortcuts = [
  "Explica un concepto",
  "Genera código",
  "Resuelve un problema",
  "Optimiza este código",
];

export function Shortcuts({
  onShortcutClick,
}: {
  onShortcutClick: (message: string) => void;
}) {
  return (
    <div className="flex flex-wrap space-x-2 gap-2 mb-4 transition-all duration-500 ease-out opacity-100 translate-y-0">
      {shortcuts.map((shortcut, index) => (
        <div
          key={index}
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <Button
            size="sm"
            className=" rounded-xl text-xs bg-primaryper hover:bg-primary-hover text-white  "
            onClick={() => onShortcutClick(shortcut)}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            {shortcut}
          </Button>
        </div>
      ))}
    </div>
  );
}
