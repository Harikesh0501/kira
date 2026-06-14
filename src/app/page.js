// src/app/page.js
import Hero from '../components/Hero';
import CompatibilityChecker from '../components/CompatibilityChecker';
import FAQ from '../components/FAQ';
import DownloadBanner from '../components/DownloadBanner';

export default function Home() {
  return (
    <main>
      <Hero />
      <CompatibilityChecker />
      <FAQ />
      <DownloadBanner />
    </main>
  );
}
