"use client";
import CountUp from "react-countup";

const stats = [
  { num: 2.5, suffix: "+", text: "Years of experience" },
  { num: 10, suffix: "+", text: "Projects completed" },
  { num: 21, suffix: "", text: "Technologies mastered" },
  { num: 679, suffix: "", text: "Github commits" },
];

const Stats = () => {
  return (
    <section className="pt-8 pb-12 xl:pt-6 xl:pb-6 dark:bg-[#0a0a0a]">
      <div className="container mx-auto">
        <div className="border border-white/8 dark:border-white/8 rounded-2xl grid grid-cols-2 xl:grid-cols-4 divide-x divide-y xl:divide-y-0 divide-white/8 dark:divide-white/8 overflow-hidden">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 py-7 px-5 bg-white/1 dark:bg-white/1"
            >
              <div className="flex items-end gap-0.5">
                <CountUp
                  start={0}
                  end={item.num}
                  duration={5}
                  delay={2}
                  decimals={item.num % 1 !== 0 ? 1 : 0}
                  className="text-3xl xl:text-4xl font-black dark:text-white text-zinc-900 leading-none"
                  separator=","
                />
                {item.suffix && (
                  <span className="text-xl xl:text-2xl font-black text-[#ffa351] leading-none mb-0.5">
                    {item.suffix}
                  </span>
                )}
              </div>
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-medium text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
