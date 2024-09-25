import { type FC, useState } from 'react'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  items: { title: string; description: string }[]
  wrapperClasses?: string
  itemClasses?: string
}

const Index: FC<Props> = ({ items, itemClasses, wrapperClasses }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className={cn('grid md:grid-cols-3', itemClasses)}>
      {items.map(({ description, title }, idx) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
          className={cn('relative flex flex-col gap-3 p-4', itemClasses)}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <AnimatePresence>
            {hoveredIdx === idx && (
              <motion.span
                className={cn('absolute inset-0 z-0 block h-full w-full rounded-xl dark:bg-neon-pink', wrapperClasses)}
                layoutId="cardHoverEffect"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 }
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1, delay: 0.2 }
                }}
              />
            )}
          </AnimatePresence>
          <div className="z-[1] space-y-3">
            <h2 className="font-medium text-foreground hover:text-neon-lime">{title}</h2>
            <p className="text-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Index
