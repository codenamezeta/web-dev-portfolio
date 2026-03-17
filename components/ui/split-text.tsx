"use client";

import { motion, type Variants } from "framer-motion";

type SplitType = "words" | "chars";

interface SplitTextProps {
  text: string;
  splitType?: SplitType;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  from?: { opacity: number; y: number };
  to?: { opacity: number; y: number };
  id?: string;
}

const defaultFrom = { opacity: 0, y: 24 };
const defaultTo = { opacity: 1, y: 0 };

export function SplitText({
  text,
  splitType = "words",
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.04,
  as: Tag = "p",
  from = defaultFrom,
  to = defaultTo,
  id,
}: SplitTextProps) {
  const chunks =
    splitType === "words"
      ? text.split(/(\s+)/)
      : text.split("").filter((c) => c !== "\n");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: from,
    visible: {
      ...to,
      transition: { duration },
    },
  };

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        className="inline-block"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {chunks.map((chunk, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={item}
            style={
              chunk === " " || (splitType === "words" && chunk.trim() === "")
                ? { marginRight: chunk === " " ? "0.25em" : undefined }
                : undefined
            }
          >
            {chunk}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
