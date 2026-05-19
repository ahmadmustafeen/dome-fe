import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Base config (keep only what matters)
const baseConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
};

// i18n plugin
let config = createNextIntlPlugin("./src/libs/I18n.ts")(baseConfig);

// Optional bundle analyzer
if (process.env.ANALYZE === "true") {
  config = withBundleAnalyzer()(config);
}

export default config;