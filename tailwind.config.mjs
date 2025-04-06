/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme"); // Import default theme fonts

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // --- Existing ---
        // Map CSS Variables to Tailwind color names
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          // Added warning color
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          // Can be same as secondary or different
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // --- NEW: Chat & Code ---
        "chat-bubble-incoming": {
          DEFAULT: "hsl(var(--chat-bubble-incoming-background))",
          foreground: "hsl(var(--chat-bubble-incoming-foreground))",
        },
        "chat-bubble-outgoing": {
          DEFAULT: "hsl(var(--chat-bubble-outgoing-background))",
          foreground: "hsl(var(--chat-bubble-outgoing-foreground))",
        },
        "code-block": {
          DEFAULT: "hsl(var(--code-block-background))",
          foreground: "hsl(var(--code-block-foreground))",
        },
      },
      fontFamily: {
        // Set 'Inter' as the default sans-serif font
        // Include fallback fonts from tailwindcss/defaultTheme
        sans: ["var(--font-inter)", ...fontFamily.sans],
        // --- NEW: Monospace font family ---
        mono: ["var(--font-fira-code)", ...fontFamily.mono], // Add Fira Code
      },
      animation: {
        bounce: "bounce 1s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-25%)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // --- NEW: Configure Typography Plugin ---
      typography: (theme) => ({
        DEFAULT: {
          // Applied via `prose` class
          css: {
            "--tw-prose-body": theme("colors.foreground"), // Use main text color
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-lead": theme("colors.muted.foreground"),
            "--tw-prose-links": theme("colors.primary.DEFAULT"), // Use primary color for links
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.muted.foreground"),
            "--tw-prose-bullets": theme("colors.muted.foreground"), // Adjusted subtle color
            "--tw-prose-hr": theme("colors.border"), // Use theme border color
            "--tw-prose-quotes": theme("colors.foreground"),
            "--tw-prose-quote-borders": theme("colors.border"),
            "--tw-prose-captions": theme("colors.muted.foreground"),
            // Code block colors are handled separately via `.code-block` bg/fg
            "--tw-prose-code": theme("colors.accent.foreground"), // Inline code text
            "--tw-prose-pre-code": theme("colors.code-block.foreground"), // Text within <pre><code>
            "--tw-prose-pre-bg": theme("colors.code-block.DEFAULT"), // Background of <pre>
            "--tw-prose-th-borders": theme("colors.border"),
            "--tw-prose-td-borders": theme("colors.border"),
            // Inverse colors for dark mode (Tailwind typography plugin handles this automatically if configured correctly, but explicit vars help)
            "--tw-prose-invert-body": theme("colors.foreground"), // Uses dark mode foreground var
            "--tw-prose-invert-headings": theme("colors.foreground"),
            "--tw-prose-invert-lead": theme("colors.muted.foreground"),
            "--tw-prose-invert-links": theme("colors.primary.DEFAULT"),
            "--tw-prose-invert-bold": theme("colors.foreground"),
            "--tw-prose-invert-counters": theme("colors.muted.foreground"),
            "--tw-prose-invert-bullets": theme("colors.muted.foreground"),
            "--tw-prose-invert-hr": theme("colors.border"),
            "--tw-prose-invert-quotes": theme("colors.foreground"),
            "--tw-prose-invert-quote-borders": theme("colors.border"),
            "--tw-prose-invert-captions": theme("colors.muted.foreground"),
            "--tw-prose-invert-code": theme("colors.accent.foreground"),
            "--tw-prose-invert-pre-code": theme("colors.code-block.foreground"),
            "--tw-prose-invert-pre-bg": theme("colors.code-block.DEFAULT"),
            "--tw-prose-invert-th-borders": theme("colors.border"),
            "--tw-prose-invert-td-borders": theme("colors.border"),
            // Customizations from snippet
            p: {
              // Matches prose-p:whitespace-pre-wrap
              whiteSpace: "pre-wrap",
              wordBreak: "break-word", // Matches prose-p:break-words
              marginTop: "0.5em", // Adjust spacing as needed
              marginBottom: "0.5em",
            },
            code: {
              fontWeight: "normal", // Inline code doesn't need to be bold
              padding: "0.1em 0.4em", // Matches px-1.5 roughly
              borderRadius: theme("borderRadius.md"), // Use theme radius
              // Use accent colors for inline code background
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            },
            "code::before": { content: '""' }, // Remove default quotes
            "code::after": { content: '""' }, // Remove default quotes
            pre: {
              // Style the <pre> container for code blocks
              backgroundColor: "hsl(var(--code-block-background))",
              color: "hsl(var(--code-block-foreground))",
              padding: theme("spacing.4"), // ~1em padding
              borderRadius: theme("borderRadius.lg"), // Use theme radius
              overflowX: "auto",
            },
            "pre code": {
              // Styling for <code> specifically inside <pre>
              backgroundColor: "transparent", // Inherit from <pre>
              color: "inherit", // Inherit from <pre>
              padding: "0",
              borderRadius: "0",
              fontWeight: "normal", // Code font handles weight
            },
            li: {
              // Matches prose-li:whitespace-normal
              whiteSpace: "normal",
            },
            // Add other prose styles as needed
          },
        },
      }),
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        ".animation-delay-200": {
          "animation-delay": "200ms",
        },
        ".animation-delay-400": {
          "animation-delay": "400ms",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    },
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
