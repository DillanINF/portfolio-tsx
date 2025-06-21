"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface BlurIntProps extends HTMLMotionProps<"h1"> {
  children: ReactNode;
  className?: string;
  variant?: any;
  delay?: number;
  duration?: number;
}

export const BlurIn = ({
  children,
  className,
  variant,
  delay = 0,
  duration = 1,
}: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={combinedVariants}
      className={cn(
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface BoxRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration = 0.5,
  delay = 0,
}: BoxRevealProps) => {
  return (
    <div className="relative overflow-hidden" style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration,
          delay,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: "0" },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration,
          delay: duration + delay,
          ease: "easeOut",
        }}
        className="absolute inset-0 z-20 bg-white/50"
        style={{
          backgroundColor: boxColor,
        }}
      />
    </div>
  );
};
