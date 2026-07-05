'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  pauseOnHover?: boolean;
  pauseOnPress?: boolean;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  pauseOnHover = false,
  pauseOnPress = false,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [key, setKey] = useState(0);

  const paused =
    (pauseOnHover && isHovering) || (pauseOnPress && isPressing);
  const currentSpeed =
    isHovering && speedOnHover != null ? speedOnHover : speed;

  useEffect(() => {
    const size = direction === 'horizontal' ? width : height;
    if (!size) return;

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // While paused, leave the motion value frozen at its current position.
    if (paused) return;

    const remaining = Math.abs(to - translation.get());
    const duration = remaining / currentSpeed;

    const controls = animate(translation, to, {
      ease: 'linear',
      duration,
      onComplete: () => {
        translation.set(from);
        setKey((prevKey) => prevKey + 1);
      },
    });

    return () => controls.stop();
  }, [
    key,
    paused,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    direction,
    reverse,
  ]);

  const interactionProps = {
    ...(pauseOnHover || speedOnHover != null
      ? {
          onHoverStart: () => setIsHovering(true),
          onHoverEnd: () => setIsHovering(false),
        }
      : {}),
    ...(pauseOnPress
      ? {
          onPointerDown: () => setIsPressing(true),
          onPointerUp: () => setIsPressing(false),
          onPointerCancel: () => setIsPressing(false),
          onPointerLeave: () => {
            setIsPressing(false);
            setIsHovering(false);
          },
        }
      : {}),
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...interactionProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
