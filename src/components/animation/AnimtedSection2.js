import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export const AnimatedSection2 = ({ children, itemId }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,   
      });
  return (
    <motion.div
      key={itemId} // 👈 Force re-animation when itemId changes
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 1.0, ease: "easeOut" }} 
    >
      {children}
    </motion.div>
  );
};
