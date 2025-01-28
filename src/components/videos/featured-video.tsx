interface FeaturedVideoProps {
  title: string;
  description: string;
  youtubeId: string;
}

export function FeaturedVideo({
  title,
  description,
  youtubeId,
}: FeaturedVideoProps) {
  return (
    <div className="space-y-4">
      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
