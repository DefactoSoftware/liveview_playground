/*
Shared variables in CSS and JS
*/

function camelCaseToDash(string) {
  return string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

function toCssVariable(variable, prefix) {
  return `--${prefix}-${camelCaseToDash(variable)}`;
}

function objectToCssVariables(object, prefix, units = "") {
  return Object.assign(
    {},
    ...Object.keys(object).map(key => {
      const append = isNaN(object[key]) ? "" : units;
      return { [toCssVariable(key, prefix)]: object[key] + append };
    })
  );
}

// Sizes
const sizes = {
  borderRadius: 5,
  navigationHeight: 60,
  wizardHeaderHeight: 60, // based on navigation height
  wizardFooterHeight: 80,
  wizardSidebarMinWidth: 432,
  wizardSidebarWidth: "30%"
};

// Media queries
const mediaQueries = {
  phone: 544,
  tablet: 768,
  desktop: 1200,
  desktopLarge: 1400
};

// Spacing
const spacing = {
  horizontal: 22,
  horizontalSmall: 15,
  horizontalLarge: 30,
  horizontalExtraLarge: 60,
  vertical: 15,
  verticalSmall: 10,
  verticalLarge: 25,
  verticalExtraLarge: 50
};

// Duration
const duration = {
  short: "0.15s",
  default: "0.2s",
  long: "0.4s"
};

// Color palette
const colors = {
  white: "#fff",
  black: "#000",
  gray99: "hsl(214, 10%, 99%)",
  gray98: "hsl(214, 10%, 98%)",
  gray97: "hsl(214, 10%, 97%)",
  gray95: "hsl(214, 10%, 95%)",
  gray93: "hsl(214, 10%, 93%)",
  gray90: "hsl(214, 10%, 90%)",
  gray85: "hsl(214, 10%, 85%)",
  gray80: "hsl(214, 8%, 80%)",
  gray75: "hsl(214, 8%, 75%)",
  gray70: "hsl(214, 8%, 70%)",
  gray50: "hsl(214, 5%, 50%)",
  gray40: "hsl(214, 5%, 40%)",
  gray25: "hsl(214, 5%, 25%)",
  purple: "#964bff",
  blue: "#258bff",
  green: "#00b483",
  red: "#ff2638"
};

// Other color assignment
// These will be automatically translated to PostCSS variables.
// E.g. `formLabel` will be translated to `--color-form-label`
Object.assign(colors, {
  primary: colors.purple,
  danger: colors.red,
  complete: colors.green,

  theme1: colors.violet,
  theme2: colors.blue,

  text: colors.gray25,
  textLight: colors.gray40,
  meta: colors.gray50,

  headerBackground: colors.violet,
  background: colors.gray95,
  barBackground: colors.gray98,
  border: colors.gray90,
  borderAlpha: "rgba(0, 0, 0, 0.07)",

  // Form colors
  formLabel: "rgba(0, 0, 0, 0.6)",
  formInputBackground: colors.gray99,
  formInputDisabledBackground: colors.gray95,
  formInputFocus: colors.blue,
  formInputPlaceholder: colors.gray70,

  // Alert colors
  alertDefault: colors.gray93,
  alertInfo: "#ccebff",
  alertSuccess: "#cfecdb",
  alertWarning: "#ffedb8",
  alertDanger: "#fbd0dc"
});

// Font-size assignment
// These will be automatically translated to PostCSS variables.
// E.g. `headingMedium` will be translated to `--font-size-heading-medium`
const fontSizes = {
  baseMobile: "14px",
  base: "16px",

  extraLarge: "1.333em",
  large: "1.111em",
  default: "1em",
  medium: "1em",
  small: "0.889em",
  tiny: "0.778em",

  capitalizedLarge: "0.944em",
  capitalizedMedium: "0.778em",
  capitalizedSmall: "0.75em",
  capitalizedTiny: "0.7em",

  headingExtraLarge: "2.556em",
  headingLarge: "1.7em",
  headingMedium: "1.4em",
  headingSmall: "1.1em",
  headingTiny: "1em",

  badgeDefault: "0.8em",
  badgeSmall: "0.7em"
};

const shadows = {
  header: "0 5px 10px rgba(0,0,0,0.05);",
  panel: "0 5px 15px rgba(0, 0, 0, 0.03), 0 2px 3px rgba(0, 0, 0, 0.04);"
};

// CSS variables
const css = Object.assign(
  {},
  objectToCssVariables(mediaQueries, "media", "px"),
  objectToCssVariables(sizes, "size", "px"),
  objectToCssVariables(spacing, "spacing", "px"),
  objectToCssVariables(duration, "duration"),
  objectToCssVariables(colors, "color"),
  objectToCssVariables(fontSizes, "font-size"),
  objectToCssVariables(shadows, "shadow"),
  {
    "--font-family-base":
      "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
    "--font-family-header": "var(--font-family-base)",
    "--font-family-monospace": "'Courier New', Courier, monospace",
    "--base-font-size-mobile": fontSizes.baseMobile,
    "--base-font-size": fontSizes.base,
    "--base-line-height": "1.4",
    "--line-height-medium": "1.2",
    "--line-height-small": "1"
  }
);

module.exports = {
  // Assigned to `postcss-css-variables` (see postcss.config.js)
  css,
  colors,
  sizes,
  mediaQueries,

  // Assigned to `postcss-custom-media` (see brunch-config.js)
  media: {
    "--phone": `(min-width: ${mediaQueries.phone}px)`,
    "--tablet": `(min-width: ${mediaQueries.tablet}px)`,
    "--desktop": `(min-width: ${mediaQueries.desktop}px)`,
    "--desktop-large": `(min-width: ${mediaQueries.desktopLarge}px)`
  }
};
