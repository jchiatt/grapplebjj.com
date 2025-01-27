import { Header } from "./header";
import { Footer } from "./footer";
import { LivestreamBanner } from "../livestream/livestream-banner";
import { FloatingPlayer } from "../livestream/floating-player";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <LivestreamBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingPlayer />
    </div>
  );
}
