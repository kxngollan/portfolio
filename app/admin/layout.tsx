import type { ChildrenProps } from "@/types/layout";

const layout = ({ children }: ChildrenProps) => {
  return (
    <main className="min-h-screen bg-zinc-50 pt-20 dark:bg-[#0a0a0a]">
      {children}
    </main>
  );
};

export default layout;
