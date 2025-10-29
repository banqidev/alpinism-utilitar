import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Coverage } from '@/components/Coverage';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Coverage />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
