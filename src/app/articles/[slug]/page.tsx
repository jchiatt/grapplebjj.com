import { Metadata, ResolvingMetadata } from "next";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";
import { CallToAction } from "@/components/ui/call-to-action";
import Markdown from "react-markdown";

// Enable ISR with a revalidation period of 1 day (in seconds)
export const revalidate = 86400;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate all possible article paths at build time
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await props.params;
  const previousRobots = (await parent).robots || {};

  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Grapple",
      description: "The requested article could not be found.",
      robots: {
        ...previousRobots,
        index: false,
      },
    };
  }

  return {
    title: `${article.title} | Grapple`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      ...(article.imageUrl && {
        images: [{ url: article.imageUrl }],
      }),
    },
    robots: previousRobots,
  };
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage(props: Props) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="capitalize">{article.category}</span>
          </div>
        </div>

        <h1 className="mt-6 text-4xl font-bold">{article.title}</h1>
        <p className="mt-4 text-xl text-foreground/80">{article.description}</p>

        {article.author && (
          <div className="mt-8 flex items-center justify-center gap-3">
            {article.author.imageUrl && (
              <Image
                src={article.author.imageUrl}
                alt={article.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-sm text-foreground/60">
                {article.author.role}
              </div>
            </div>
          </div>
        )}
      </header>

      {article.imageUrl && (
        <div className="relative mt-12 aspect-[16/9]">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mx-auto mt-12">
        <Markdown>{article.content}</Markdown>
      </div>

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Ready to Start Your Journey?"
          description="Join us on the mats and experience the art of Brazilian Jiu-Jitsu firsthand."
          primaryAction={{
            label: "Start Free Trial",
            href: "/trial",
          }}
        />
      </div>
    </article>
  );
}
