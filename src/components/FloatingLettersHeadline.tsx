import React from 'react';
import { motion } from 'motion/react';

interface FloatingLettersHeadlineProps {
  className?: string;
}

interface TextSegment {
  text: string;
  isHighlighted?: boolean;
}

export const FloatingLettersHeadline: React.FC<FloatingLettersHeadlineProps> = ({ className = '' }) => {
  const fullSentence = "L’assurance scientifique de la sécurité et pérennité de vos fondations et chaussées.";

  const segments: TextSegment[] = [
    { text: "L’assurance", isHighlighted: false },
    { text: "scientifique", isHighlighted: false },
    { text: "de", isHighlighted: false },
    { text: "la", isHighlighted: false },
    { text: "sécurité et pérennité", isHighlighted: true },
    { text: "de", isHighlighted: false },
    { text: "vos", isHighlighted: false },
    { text: "fondations", isHighlighted: false },
    { text: "et", isHighlighted: false },
    { text: "chaussées.", isHighlighted: false },
  ];

  // Global char index for a fluid undulating wave delay across the entire sentence
  let globalCharIndex = 0;

  return (
    <motion.h1
      aria-label={fullSentence}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`font-black font-display tracking-tight leading-[1.18] select-none ${className}`}
    >
      <span aria-hidden="true" className="inline">
        {segments.map((segment, segIdx) => {
          const isGolden = segment.isHighlighted;
          // Split into words to maintain natural spacing & wrap
          const words = segment.text.split(' ');

          return (
            <React.Fragment key={`segment-${segIdx}`}>
              <span
                className={`relative inline-block align-baseline ${
                  isGolden ? 'whitespace-nowrap px-0.5' : 'whitespace-normal'
                }`}
              >
                {/* For golden highlighted phrase: elegant animated underline */}
                {isGolden && (
                  <motion.span
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 rounded-full origin-left pointer-events-none"
                  />
                )}

                {words.map((word, wordIdx) => {
                  const characters = Array.from(word);

                  return (
                    <span
                      key={`word-${segIdx}-${wordIdx}`}
                      className="inline-block whitespace-nowrap align-baseline"
                    >
                      {characters.map((char, charIdx) => {
                        const currentCharIdx = globalCharIndex++;
                        // Floating wave math: gentle vertical breathing with harmonic oscillation
                        const floatY = (currentCharIdx % 4 === 0) ? -5.5 : (currentCharIdx % 4 === 1) ? -3.5 : (currentCharIdx % 4 === 2) ? -6 : -4.2;
                        const floatDuration = 2.6 + (currentCharIdx % 5) * 0.3;
                        const floatDelay = (currentCharIdx * 0.07) % 2.4;
                        const rotateTilt = (currentCharIdx % 2 === 0 ? 1 : -1) * 1.6;

                        return (
                          <motion.span
                            key={`char-${segIdx}-${wordIdx}-${charIdx}`}
                            initial={{ opacity: 0, y: 15, filter: 'blur(3px)' }}
                            animate={{
                              opacity: 1,
                              filter: 'blur(0px)',
                              y: [0, floatY, 0],
                              rotate: [0, rotateTilt, 0],
                            }}
                            transition={{
                              opacity: {
                                duration: 0.4,
                                delay: 0.08 + currentCharIdx * 0.02,
                              },
                              filter: {
                                duration: 0.4,
                                delay: 0.08 + currentCharIdx * 0.02,
                              },
                              y: {
                                duration: floatDuration,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                                delay: 0.4 + floatDelay,
                              },
                              rotate: {
                                duration: floatDuration + 0.5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                                delay: 0.4 + floatDelay,
                              },
                            }}
                            whileHover={{
                              y: -9,
                              scale: 1.2,
                              rotate: rotateTilt * 2.5,
                              transition: { duration: 0.16, ease: 'easeOut' },
                            }}
                            className={`inline-block origin-bottom cursor-pointer transition-colors duration-200 ${
                              isGolden
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 via-yellow-300 to-amber-500 animate-gradient-text drop-shadow-[0_2px_14px_rgba(245,158,11,0.4)] hover:brightness-125'
                                : 'text-white hover:text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
                            }`}
                          >
                            {char}
                          </motion.span>
                        );
                      })}

                      {/* Space between words inside same segment */}
                      {wordIdx < words.length - 1 && (
                        <span className="inline-block w-[0.28em]">&nbsp;</span>
                      )}
                    </span>
                  );
                })}
              </span>

              {/* Space between segments */}
              {segIdx < segments.length - 1 && (
                <span className="inline-block w-[0.28em]">&nbsp;</span>
              )}
            </React.Fragment>
          );
        })}
      </span>
    </motion.h1>
  );
};
