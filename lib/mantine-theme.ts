import { createTheme, type MantineColorsTuple, rem } from "@mantine/core"

// Custom Violet palette from the provided color request (Pastel)
const payfitViolet: MantineColorsTuple = [
  "#FDFBFF", // 0: Ultra Lightest
  "#F5F3FF", // 1: Secondary (Pastel)
  "#EBE7FF", // 2
  "#DDD6FE", // 3: Soft Success
  "#C4B5FD", // 4
  "#A78BFA", // 5
  "#8B7FFF", // 6: Primary Brand (Pastel)
  "#7C66E6", // 7
  "#6D4DBF", // 8
  "#5B3A99", // 9: Darkest
]

export const theme = createTheme({
  primaryColor: "payfit",
  colors: {
    payfit: payfitViolet,
  },
  defaultRadius: "md",
  cursorType: "pointer",
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",

  headings: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(32), lineHeight: "1.2" },
      h2: { fontSize: rem(26), lineHeight: "1.3" },
      h3: { fontSize: rem(20), lineHeight: "1.4" },
      h4: { fontSize: rem(18), lineHeight: "1.5" },
    }
  },

  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "sm",
      },
      styles: {
        root: {
          transition: "transform 100ms ease, background-color 200ms ease, box-shadow 200ms ease",
          "&:active": {
            transform: "translateY(1px)",
          }
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        padding: "xl",
        shadow: "sm",
        withBorder: true,
      },
      styles: (theme: any) => ({
        root: {
          backgroundColor: "#fff",
          "&:hover": {
            boxShadow: theme.shadows.md,
          },
        },
      }),
    },
    Paper: {
      defaultProps: {
        radius: "lg",
        shadow: "xs",
        withBorder: true,
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
      styles: {
        input: {
          "&:focus": {
            borderColor: "var(--mantine-color-payfit-6)",
          }
        }
      }
    },
    Select: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
    },
    NavLink: {
      defaultProps: {
        variant: "filled",
        color: "payfit",
      },
      styles: {
        root: {
          borderRadius: rem(12),
          marginBottom: rem(4),
          fontWeight: 500,
          transition: "all 200ms ease",
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: "sm",
        variant: "light",
      },
    }
  },

  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 12px rgba(5, 31, 32, 0.08)",
    lg: "0 10px 25px rgba(5, 31, 32, 0.12)",
    xl: "0 20px 48px rgba(5, 31, 32, 0.16)",
  },
})
