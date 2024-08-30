"use client";
import classNames from "@/app/[lang]/utils/classNames";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfoBlockProps {
  data: {
    title: string;
    animate: boolean;
    description: string;
    description_2: string | null;
    description_3: string | null;
  };
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function InfoBlock({ data }: InfoBlockProps) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger animation when 10% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  useEffect(() => {
    if (inView && data.animate) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      animate={controls}
      variants={variants}
      className="container mx-auto md:py-20 py-14"
      initial={data.animate ? "hidden" : "visible"}
    >
      {data.title && data.title.length > 0 && (
        <motion.h2
          className={classNames(
            data.description || data.description_2 || data.description_3
              ? "pb-6"
              : "pb-10",
            "font-bold"
          )}
          variants={variants} // Apply the same animation to the title
        >
          {data.title}
        </motion.h2>
      )}
      <motion.div
        className="max-w-4xl text-xl md:text-2xl"
        variants={variants} // Apply the same animation to the content wrapper
      >
        {data.description && (
          <motion.p
            className={classNames(data.description_2 && "pb-5 lg:pb-6")}
            variants={variants} // Apply the same animation to the paragraphs
          >
            {data.description}
          </motion.p>
        )}
        {data.description_2 && (
          <motion.p
            className={classNames(data.description_3 && "pb-5 lg:pb-6")}
            variants={variants}
          >
            {data.description_2}
          </motion.p>
        )}
        {data.description_3 && (
          <motion.p variants={variants}>{data.description_3}</motion.p>
        )}
      </motion.div>
    </motion.section>
  );
}
