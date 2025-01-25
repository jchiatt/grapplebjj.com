import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

export function TestimonialCard({
  name,
  role,
  content,
  image,
}: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 180; // About 3 lines of text
  const needsExpansion = content.length > maxLength;

  const truncatedContent = needsExpansion
    ? `${content.slice(0, maxLength)}...`
    : content;

  return (
    <motion.div
      layout
      onClick={() => needsExpansion && setIsExpanded(!isExpanded)}
      className={`rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent/50 ${
        needsExpansion ? "cursor-pointer" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div layout="position" className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <motion.h3 layout="position" className="font-semibold">
            {name}
          </motion.h3>
          <motion.p layout="position" className="text-sm text-muted-foreground">
            {role}
          </motion.p>
        </div>
      </motion.div>

      <motion.blockquote layout className="mt-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted-foreground"
          >
            {isExpanded ? content : truncatedContent}
            {needsExpansion && !isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="ml-1 text-primary hover:text-primary/80"
              >
                Read more
              </button>
            )}
          </motion.p>
        </AnimatePresence>
      </motion.blockquote>
    </motion.div>
  );
}
