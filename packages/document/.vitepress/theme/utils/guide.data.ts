// .vitepress/theme/utils/guide.data.ts
import { createContentLoader } from "vitepress";

console.log("Script started"); // 确保脚本被执行

interface Post {  // ts定义数据类型
  title: string;
  url: string;
  targs: [];
  created: DateInfo;
  updated: DateInfo;
  src: string;   // 原始 Markdown 内容
  html: string;  // 渲染后的 HTML 内容
  excerpt: string; // 摘录
}

interface DateInfo {  // ts定义数据类型
  time: number;
  string: string;
}

declare const data: Post[];
export { data };

export default createContentLoader("guide/*/*.md", {
  includeSrc: true, // 包含原始 markdown 源?
  render: true,     // 包含渲染的整页 HTML?
  excerpt: true,    // 包含摘录?
  transform(raw): Post[] {
    console.log("Raw data:", raw); // 输出原始数据

    return raw
      .map(({ url, frontmatter, excerpt, src, html }) => {
        if (!frontmatter) {
          // console.warn(`No frontmatter found for ${url}`); 
          return null; // 忽略没有 frontmatter 的文件  
        }

        const { title, created, updated } = frontmatter;

        if (!title || !created || !updated) {
          // console.warn(`Incomplete frontmatter in ${url}:`, frontmatter);
          return null; // 忽略缺少必要字段的文件
        }

        // console.log("frontmatter:", frontmatter); // 输出 frontmatter 的值
        return {
          title,
          url,
          excerpt,
          src,
          html,
          targs: frontmatter.tags || [],
          created: formatDate(created),
          updated: formatDate(updated),
        };
      })
      .filter((post): post is Post => post !== null) // 过滤掉无效的条目
      .sort((a, b) => b.updated.time - a.updated.time);
  },
});

function formatDate(raw: string): DateInfo {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}