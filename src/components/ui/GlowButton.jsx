import { motion } from 'framer-motion'

export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const variants = {
    primary: {
      bg: '#3b82f6',
      color: '#09090b',
      glow: 'rgba(59,130,246,0.4)',
      border: 'transparent',
    },
    purple: {
      bg: '#8b5cf6',
      color: '#fff',
      glow: 'rgba(139,92,246,0.4)',
      border: 'transparent',
    },
    danger: {
      bg: '#ef4444',
      color: '#fff',
      glow: 'rgba(239,68,68,0.4)',
      border: 'transparent',
    },
    ghost: {
      bg: 'transparent',
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.15)',
      border: '#3b82f644',
    },
    ghostPurple: {
      bg: 'transparent',
      color: '#a78bfa',
      glow: 'rgba(139,92,246,0.15)',
      border: '#8b5cf644',
    },
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const v = variants[variant] ?? variants.primary

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Tag
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        disabled={disabled}
        type={href ? undefined : type}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-rajdhani font-bold tracking-wider transition-all duration-300 disabled:opacity-50 ${sizes[size]} ${className}`}
        style={{
          backgroundColor: v.bg,
          color: v.color,
          border: v.border !== 'transparent' ? `1px solid ${v.border}` : 'none',
          boxShadow: `0 0 20px ${v.glow}, 0 0 40px ${v.glow.replace('0.4', '0.15')}`,
        }}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
