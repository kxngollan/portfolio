"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

const StairTransition = () => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="fixed inset-0 pointer-events-none z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: 1,
          duration: 0.4,
          ease: "easeInOut",
        }}
      >
        <div className="h-screen w-screen flex">
          <Stairs />
        </div>
        <div className="h-screen w-screen fixed inset-0 bg-primary" />
      </motion.div>
    </AnimatePresence>
  );
};

export default StairTransition;
