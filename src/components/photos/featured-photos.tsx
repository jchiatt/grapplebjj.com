import Image from "next/image";

interface FeaturedPhotosProps {
  className?: string;
  title?: string;
}

const photos = [
  {
    src: "/images/training_shots/squad-2.jpg",
    alt: "Training at Grapple",
  },
  {
    src: "/images/training_shots/training-3.jpg",
    alt: "Training at Grapple",
    span: "col-span-2",
  },

  {
    src: "/images/training_shots/squad-1.jpg",
    alt: "Training at Grapple",
  },
  {
    src: "/images/training_shots/training-1.jpg",
    alt: "Training at Grapple",
    span: "row-span-2",
  },
  {
    src: "/images/training_shots/squad-3.jpg",
    alt: "Training at Grapple",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/training_shots/training-2.jpg",
    alt: "Training at Grapple",
    span: "row-span-2",
  },
  {
    src: "/images/training_shots/emergency-medicine-seminar.jpg",
    alt: "Women in Emergency Medicine Seminar at Grapple",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/training_shots/training-5.jpg",
    alt: "Training at Grapple",
    span: "col-span-2",
  },
  {
    src: "/images/training_shots/training-4.jpg",
    alt: "Training at Grapple",
    span: "col-span-2",
  },
];

export function FeaturedPhotos({ className = "", title }: FeaturedPhotosProps) {
  return (
    <section className={`container py-12 ${className}`}>
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className={`relative group overflow-hidden rounded-lg ${
              photo.span || ""
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 dark:brightness-90 dark:group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-primary/50 mix-blend-overlay transition-opacity duration-300 opacity-50 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
