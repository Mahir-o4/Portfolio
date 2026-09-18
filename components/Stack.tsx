import { motion, useMotionValue, useReducedMotion, useTransform, animate, type PanInfo } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);
  // Multi-touch guard: motion's drag tracks one pointer; ignore extras so a
  // second finger can't yank the card mid-gesture (no visual change).
  const activePointer = useRef<number | null>(null);

  // Apple momentum projection (Designing Fluid Interfaces sample code):
  // project where the finger is *going*, then snap to the target nearest
  // that point — a flick throws the card even from a small offset.
  // decelerationRate 0.998 = normal scroll feel.
  function project(initialVelocity: number, decelerationRate = 0.998) {
    return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
  }

  // Apple velocity handoff: a flick commits by velocity sign even under the
  // distance threshold; otherwise the card springs home carrying release
  // velocity — never a hard set (no brick wall). 10px hysteresis keeps taps
  // from reading as drags.
  const FLICK_VELOCITY = 500; // px/s
  const HYSTERESIS = 10; // px
  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    activePointer.current = null;
    const offsetX = Math.abs(info.offset.x);
    const offsetY = Math.abs(info.offset.y);
    if (Math.max(offsetX, offsetY) < HYSTERESIS) {
      // Tap jitter, not a drag — settle home, carrying velocity (no jump).
      animate(x, 0, { type: 'spring', bounce: 0, duration: 0.4, velocity: info.velocity.x });
      animate(y, 0, { type: 'spring', bounce: 0, duration: 0.4, velocity: info.velocity.y });
      return;
    }
    const projectedX = info.offset.x + project(info.velocity.x);
    const projectedY = info.offset.y + project(info.velocity.y);
    const flicked =
      Math.abs(info.velocity.x) > FLICK_VELOCITY ||
      Math.abs(info.velocity.y) > FLICK_VELOCITY;
    if (
      offsetX > sensitivity ||
      offsetY > sensitivity ||
      Math.abs(projectedX) > sensitivity ||
      Math.abs(projectedY) > sensitivity ||
      flicked
    ) {
      onSendToBack();
    } else {
      // Critically damped home (Apple default: damping 1.0, no overshoot —
      // a deck snap isn't momentum-driven, so no bounce). Starts from the
      // live presentation value, blending velocity through the retarget.
      animate(x, 0, { type: 'spring', bounce: 0, duration: 0.4, velocity: info.velocity.x });
      animate(y, 0, { type: 'spring', bounce: 0, duration: 0.4, velocity: info.velocity.y });
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab touch-pan-y"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
      onPointerDown={(e) => {
        // Ignore a second finger mid-drag; keep tracking on the element even
        // if the pointer leaves bounds (direct manipulation, no visual change).
        if (activePointer.current !== null) return;
        activePointer.current = e.pointerId;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
        // Kill any in-flight home spring so the grab starts from the live
        // on-screen value — no jump, no lockout mid-motion.
        x.stop();
        y.stop();
      }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  // Critically damped reorder (Apple default: bounce only when the gesture
  // itself carried momentum — a deck cycle isn't momentum-driven).
  animationConfig = { stiffness: 300, damping: 34 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState<{ id: number; content: React.ReactNode }[]>(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    } else {
      return [
        {
          id: 1,
          content: (
            <img
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
              alt="card-1"
              className="w-full h-full object-cover pointer-events-none"
            />
          )
        },
        {
          id: 2,
          content: (
            <img
              src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
              alt="card-2"
              className="w-full h-full object-cover pointer-events-none"
            />
          )
        },
        {
          id: 3,
          content: (
            <img
              src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
              alt="card-3"
              className="w-full h-full object-cover pointer-events-none"
            />
          )
        },
        {
          id: 4,
          content: (
            <img
              src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
              alt="card-4"
              className="w-full h-full object-cover pointer-events-none"
            />
          )
        }
      ];
    }
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = (id: number) => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && !reduced && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused, reduced]);

  return (
    <div
      className="relative w-full h-full"
      style={{
        perspective: 600
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="rounded-2xl overflow-hidden w-full h-full"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '50% 50%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
