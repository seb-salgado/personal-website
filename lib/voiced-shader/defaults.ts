// Default parameter values for the gradient shader, reused from the Voiced gradient tool.

export interface ShaderParams {
  speed: number;
  contrast: number;
  grain: number;
  noiseScale: number;
  colors: [string, string, string, string, string, string];
}

export const DEFAULT_PARAMS: ShaderParams = {
  speed: 0.4,
  contrast: 0.7,
  grain: 0.04,
  noiseScale: 1.0,
  colors: [
    "#FFD480", // c1 - Golden yellow
    "#F5B075", // c2 - Warm orange-peach
    "#E68A54", // c3 - Deep orange
    "#CC5930", // c4 - Red-orange
    "#8C331E", // c5 - Dark red-brown
    "#3B1C14", // c6 - Deep brown
  ],
};

export const PARAM_CONFIG = {
  speed: {
    min: 0.1,
    max: 2.0,
    step: 0.01,
    label: "Speed",
  },
  contrast: {
    min: 0.3,
    max: 1.5,
    step: 0.01,
    label: "Contrast",
  },
  grain: {
    min: 0.0,
    max: 0.15,
    step: 0.001,
    label: "Grain",
  },
  noiseScale: {
    min: 0.5,
    max: 4.0,
    step: 0.1,
    label: "Noise scale",
  },
} as const;

export type NumericParam = keyof typeof PARAM_CONFIG;
