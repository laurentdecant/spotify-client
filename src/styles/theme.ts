export interface Theme {
  background: {
    light: string;
    default: string;
    dark: string;
    hover: string;
    active: string;
  };
  breakpoint: {
    extraSmall: number;
    small: number;
  };
  color: {
    primary: string;
    error: string;
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    extraExtraLarge: number;
  };
  fontWeight: {
    light: number;
    normal: number;
    bold: number;
  };
  foreground: {
    default: string;
    lightFade: string;
    darkFade: string;
  };
  shadow: {
    low: string;
    middle: string;
    high: string;
  };
  thickness: {
    extraExtraSmall: number;
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    extraExtraLarge: number;
    extraExtraExtraLarge: number;
  };
}

export const theme: Theme = {
  background: {
    light: "#303030", // #ffffff
    default: "#212121", // #fafafa
    dark: "#000000", // f5f5f5
    hover: "rgba(255, 255, 255, 0.1)",
    active: "rgba(255, 255, 255, 0.1)"
  },
  breakpoint: {
    extraSmall: 480,
    small: 960
  },
  color: {
    primary: "#1db954",
    error: "#e57373"
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    extraLarge: 24,
    extraExtraLarge: 32
  },
  fontWeight: {
    light: 300,
    normal: 400,
    bold: 500
  },
  foreground: {
    default: "#ffffff",
    lightFade: "rgba(255, 255, 255, 0.66)",
    darkFade: "rgba(255, 255, 255, 0.33)"
  },
  shadow: {
    low: "0 1px 2px rgba(0, 0, 0, .5)",
    middle: "0 2px 4px rgba(0, 0, 0, .5)",
    high: "0 4px 8px rgba(0, 0, 0, .5)"
  },
  thickness: {
    extraExtraSmall: 3.125,
    extraSmall: 6.25,
    small: 12.5,
    medium: 25,
    large: 50,
    extraLarge: 100,
    extraExtraLarge: 200,
    extraExtraExtraLarge: 400
  }
};
