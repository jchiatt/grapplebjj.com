import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    role: string;
    imageUrl?: string;
  };
  publishedAt: string;
  category: "technique" | "lifestyle" | "competition" | "news";
  imageUrl?: string;
  tags: string[];
  slug: string;
}

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export function getAllArticles(): Article[] {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the slug
      return {
        ...(data as Omit<Article, "content" | "slug">),
        content,
        slug,
      };
    })
    // Sort articles by date
    .sort((a, b) =>
      new Date(b.publishedAt) > new Date(a.publishedAt) ? 1 : -1
    );

  return allArticlesData;
}

export function getArticleBySlug(slug: string): Article | undefined {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the article metadata section
    const { data, content } = matter(fileContents);

    return {
      ...(data as Omit<Article, "content" | "slug">),
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error getting article by slug ${slug}:`, error);
    return undefined;
  }
}
