import { Header } from "./header";
import { Footer } from "./footer";
import { LivestreamBanner } from "../livestream/livestream-banner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <LivestreamBanner />
      <Header />
      <main className="flex-1">
        <div className="container py-4 md:py-8 lg:py-12">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
