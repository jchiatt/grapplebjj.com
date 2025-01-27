import { SimpleIcon } from "simple-icons";

interface SocialLinkProps {
  href: string;
  icon: SimpleIcon;
  label: string;
}

export function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
      aria-label={label}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-6 h-6 text-foreground"
        fill="currentColor"
      >
        <path d={Icon.path} />
      </svg>
    </a>
  );
}
