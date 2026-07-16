// Page-load reveal: the blur-and-fade every top-level block plays once on mount.
// It is a *load* transition, not a per-component entrance — the rule is "the page
// fades in when it loads", which is why nothing here is scroll-triggered. Tying it
// to scroll would re-fire on back-navigation and fight the reader on long pages.

export const REVEAL_EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

// Blocks step 80ms apart, then pin at 560ms — the terminal delay the homepage
// chain already lands on. The ceiling only ever catches blocks below the fold at
// load (the first screen tops out around index 5), so it costs nothing visible and
// stops a long page from turning into a slow cascade.
export const revealDelay = (i: number) => Math.min(i * 0.08, 0.56);

// Reduced motion keeps the fade and drops the blur: the opacity change still
// signals arrival without the movement that triggers motion sickness.
//
// `animate` always names `filter`, even under reduced motion, and that is load-
// bearing: useReducedMotion can only report `false` during SSR, so the server
// always emits filter:blur(8px) inline. If the reduced-motion branch animated
// opacity alone it would never target `filter`, and that server-rendered blur
// would stick forever.
export const block = (delay: number, rm: boolean | null | undefined = false) => ({
  initial: rm ? { opacity: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: rm ? 0.2 : 0.3, ease: REVEAL_EASE, delay },
});
