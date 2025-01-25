import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Tag } from "lucide-react";
import { CallToAction } from "@/components/ui/call-to-action";
import { Headline } from "@/components/ui/headline";

export const metadata: Metadata = {
  title: "Articles | Grapple",
  description:
    "Learn more about submission grappling through our collection of articles.",
};

// Enable ISR with a revalidation period of 1 day (in seconds)
export const revalidate = 86400;

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleCard({
  article,
}: {
  article: ReturnType<typeof getAllArticles>[0];
}) {
  return (
    <Link href={`/articles/${article.slug}`} className="group">
      <div className="overflow-hidden rounded-2xl bg-secondary transition-colors hover:bg-accent/10">
        {article.imageUrl && (
          <div className="relative aspect-[16/9]">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-foreground/60">
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

          <h3 className="mt-4 text-2xl font-semibold group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-foreground/80 line-clamp-2">
            {article.description}
          </p>

          {article.author && (
            <div className="mt-6 flex items-center gap-3">
              {article.author.imageUrl && (
                <Image
                  src={article.author.imageUrl}
                  alt={article.author.name}
                  width={40}
                  height={40}
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
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <Headline as="h1" size="h1">
          Articles
        </Headline>
        <p className="mt-4 text-xl text-foreground/80">
          Learn more about submission grappling through our collection of
          articles
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center mt-16">
          <p className="text-xl text-foreground/60">
            No articles available at this time.
          </p>
        </div>
      )}

      <div className="mt-16 md:mt-24">
        <CallToAction
          title="Tired of just reading?"
          description="Join us on the mats and see how jiu jitsu can transform your life."
          primaryAction={{
            label: "Schedule Free Class",
            href: "/trial",
          }}
          secondaryAction={{
            label: "FAQ",
            href: "/faq",
          }}
        />
      </div>
    </div>
  );
}
