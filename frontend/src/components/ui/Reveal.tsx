"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { inView, reveal, stagger } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  as?: "div" | "section" | "li" | "ul" | "article";
  variants?: Variants;
  delay?: number;
  className?: string;
}

export function Reveal({ children, as = "div", variants = reveal, delay = 0, className }: RevealProps) {
  const Cmp = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Cmp
      variants={variants}
      {...inView}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Cmp>
  );
}

export function StaggerGroup({ children, as = "div", className }: Omit<RevealProps, "variants" | "delay">) {
  const Cmp = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Cmp variants={stagger} {...inView} className={className}>
      {children}
    </Cmp>
  );
}
