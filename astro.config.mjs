import { defineConfig } from "astro/config";
import { siteMeta } from "./src/lib/constants";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
const { siteUrl } = siteMeta;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    prefetch(),
  ],
  markdown: {
    shikiConfig: {
      theme: "nord",
      langs: [],
      wrap: true,
    },
  },
});
