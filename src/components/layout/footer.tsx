import Link from "next/link";
import { Mail } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm text-foreground">{site.name}</p>
            <p className="mt-2 text-sm text-muted">{site.bio}</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <nav aria-label="Footer">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Site
              </p>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={site.social.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
                  >
                    <LinkedinIcon className="h-4 w-4" aria-hidden="true" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
