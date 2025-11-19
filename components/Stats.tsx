"use client";
import CountUp from "react-countup";

const stats = [
  {
    num: 2.5,
    text: "Over years of experience",
  },
  {
    num: 10,
    text: "Personal Projects completed",
  },
  {
    num: 21,
    text: "Technologies mastered",
  },
  {
    num: 611,
    text: "Github commits",
  },
];

const Stats = () => {
  return (
    <section className="pt-0 pb-12 xl:pt-0 xl:pb-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                className="flex-1 flex justify-center items-center gap-4 xl:justify-start"
                key={index}
              >
                <CountUp
                  start={0}
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-3xl xl:text-[45px] font-extrabold"
                  separator=","
                />
                <p
                  className={`${
                    item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
