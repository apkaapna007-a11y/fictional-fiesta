import { motion } from 'framer-motion'

const SplashScreen = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 bg-warm-ivory dark:bg-gray-950 flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="text-center space-y-4"
        variants={containerVariants}
      >
        {/* Logo/Title */}
        <motion.div variants={titleVariants} className="mb-8">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-warm-gold"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Nelson-GPT
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-warm-gray dark:text-warm-tan font-medium"
        >
          Trusted Pediatric AI
        </motion.p>

        {/* Footer Line */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-warm-muted dark:text-warm-gray max-w-md mx-auto leading-relaxed"
        >
          Pediatric Knowledge at Your Fingertips — Powered by Nelson Textbook of
          Pediatrics
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex justify-center gap-2 pt-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-warm-amber"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SplashScreen
