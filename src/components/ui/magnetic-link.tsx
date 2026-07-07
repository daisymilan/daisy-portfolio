"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.25 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const content = (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const sharedProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: cn(
      "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
      className
    ),
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...sharedProps}>
      {content}
    </Link>
  );
}
