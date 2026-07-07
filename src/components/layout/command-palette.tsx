"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { FileText, Home, Mail, Rocket, User, Wrench } from "lucide-react";
import { projects } from "@/content/projects";

const staticPages = [
  { href: "/", label: "Home", icon: Home },
  { href: "/work", label: "Work", icon: Rocket },
  { href: "/about", label: "About", icon: User },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && (e.target as HTMLElement)?.tagName === "INPUT") return;
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface md:inline-flex"
      >
        Search
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command Palette" className="flex flex-col">
          <Command.Input
            autoFocus
            placeholder="Jump to a page or project…"
            className="w-full border-b border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted"
          />
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
              No results found.
            </Command.Empty>
            <Command.Group heading="Pages" className="text-xs text-muted [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
              {staticPages.map(({ href, label, icon: Icon }) => (
                <Command.Item
                  key={href}
                  value={label}
                  onSelect={() => go(href)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                >
                  <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group heading="Case Studies" className="text-xs text-muted [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
              {projects.map((project) => (
                <Command.Item
                  key={project.slug}
                  value={project.name}
                  onSelect={() =>
                    go(project.featured ? `/work/${project.slug}` : "/work")
                  }
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                >
                  <Rocket className="h-4 w-4 text-muted" aria-hidden="true" />
                  {project.name}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
