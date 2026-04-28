import { motion } from 'framer-motion'

export default function SectionTitle({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {label && (
        <span className="font-fira text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 block">
          {`// ${label}`}
        </span>
      )}
      <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
      </div>
    </motion.div>
  )
}
