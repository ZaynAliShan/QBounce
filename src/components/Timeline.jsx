import React, { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'

/**
 * Vertical timeline with scroll-linked progress beam.
 * @param {{ data: { title: string; content: React.ReactNode }[] }} props
 */
export function Timeline({ data }) {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref, data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full bg-black font-sans px-4 sm:px-6 lg:px-8"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-10 md:pb-14">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-stretch pt-6 sm:pt-8 md:pt-10 gap-4 sm:gap-6"
          >
            <div className="flex items-center w-8 sm:w-10 shrink-0">
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-black flex items-center justify-center border-2 border-gray-700 shrink-0">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary-orange border border-primary-orange/50" />
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + 'px' }}
          className="absolute left-4 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary-orange via-primary-orange/80 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
