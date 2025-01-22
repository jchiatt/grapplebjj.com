import { Header } from "./header";
import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
