import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        '8xl': '90rem', // 自定义的最大宽度类
        '9xl': '100rem', // 另一个自定义的最大宽度类
        '10xl': '110rem', // 另一个自定义的最大宽度类
        '11xl': '120rem', // 另一个自定义的最大宽度类
      }
    }
  },
  plugins: [],
};
export default config;
