import { defineConfig } from "tinacms";
import { categories } from "../src/lib/constants";

const tinacmsCategories = categories.map((category) => {
  return {
    label: category.categoryName,
    value: category.categorySlug,
  };
});
// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.CLIENDID, // Get this from tina.io
  token: process.env.TOKEN, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets", // メディアファイルの保存先
      publicFolder: "public",
    },
  },

  // プロジェクトのディレクトリ構成やマークダウンのfront-matterの構成に合わせる
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog記事",
        path: "src/content/blog", // blog記事を扱うコレクションの指定
        format: "mdx", // ファイルの形式を指定
        ui: {
          // Tinacms上で作成した記事から生成されるファイル名の設定（ここではスラッグをファイル名に指定）
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.slug}`;
            },
          },
        },
        // デフォルト値の設定（ここではpubDateに現在日時を設定）
        defaultItem: () => {
          return {
            pubDate: new Date().toISOString(),
          };
        },
        // TinaCMSで編集できるフィールドの設定
        fields: [
          {
            type: "string",
            name: "title",
            label: "タイトル",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "スラッグ",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "投稿日",
            dateFormat: "YYYY-MM-DD",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "画像",
          },
          {
            type: "string",
            name: "category",
            label: "カテゴリー",
            list: true,
            options: tinacmsCategories,
          },
          {
            type: "rich-text",
            name: "body",
            label: "記事本文",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "説明",
            component: "textarea",
            required: true,
          },
        ],
      },
    ],
  },
});
