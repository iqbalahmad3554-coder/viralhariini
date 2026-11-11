import { SiteHeader } from '@/components/news/site-header'
import { BreakingTicker } from '@/components/news/breaking-ticker'
import { NewsHero } from '@/components/news/news-hero'
import { LiveStats } from '@/components/news/live-stats'
import { TopStoriesSection } from '@/components/news/top-stories'
import { ViralSpotlight } from '@/components/news/viral-spotlight'
import { CategorySection } from '@/components/news/category-section'
import { MostRead } from '@/components/news/most-read'
import { Newsletter } from '@/components/news/newsletter'
import { SiteFooter } from '@/components/news/site-footer'
import { VideoGallery } from '@/components/news/video-gallery'
import { LiveChannels } from '@/components/news/live-channels'
import { FreeAccessBanner } from '@/components/news/free-access-banner'
import { AllNewsSection } from '@/components/news/all-news-section'

import {
  politikNews,
  ekonomiNews,
  teknologiNews,
  internasionalNews,
  olahragaNews,
  hukumNews,
} from '@/lib/news-data'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <BreakingTicker />

      <main className="flex-1">
        {/* Hero featured viral news */}
        <NewsHero />

        {/* Live stats bar */}
        <LiveStats />

        {/* Top stories + Trending sidebar */}
        <TopStoriesSection />

        {/* Viral spotlight (highlight viral videos/stories) */}
        <ViralSpotlight />

        {/* Free access banner */}
        <FreeAccessBanner />

        {/* Video berita */}
        <VideoGallery />

        {/* Kategori: Politik */}
        <CategorySection
          id="politik"
          title="Politik"
          subtitle="Dinamika politik nasional yang sedang ramai"
          items={politikNews}
          accentClass="bg-red-600"
        />

        {/* Kategori: Ekonomi */}
        <CategorySection
          id="ekonomi"
          title="Ekonomi"
          subtitle="Pergerakan pasar dan kebijakan ekonomi nasional"
          items={ekonomiNews}
          accentClass="bg-emerald-600"
        />

        {/* Kategori: Internasional */}
        <CategorySection
          id="internasional"
          title="Internasional"
          subtitle="Kabar penting dari berbagai penjuru dunia"
          items={internasionalNews}
          accentClass="bg-sky-600"
        />

        {/* Live TV channels */}
        <LiveChannels />

        {/* Kategori: Teknologi */}
        <CategorySection
          id="teknologi"
          title="Teknologi"
          subtitle="Ancaman siber, AI, dan inovasi terkini"
          items={teknologiNews}
          accentClass="bg-fuchsia-600"
        />

        {/* Most read horizontal scroll */}
        <MostRead />

        {/* Kategori: Olahraga */}
        <CategorySection
          id="olahraga"
          title="Olahraga"
          subtitle="Liga Champions, transfer pemain, dan Timnas"
          items={olahragaNews}
          accentClass="bg-orange-600"
        />

        {/* Kategori: Hukum & Kriminal */}
        <CategorySection
          id="hukum"
          title="Hukum &amp; Kriminal"
          subtitle="Perkara hukum dan kasus kriminal terkini"
          items={hukumNews}
          accentClass="bg-violet-600"
        />

        {/* Semua Berita — grid semua artikel dengan filter kategori */}
        <AllNewsSection />

        {/* Newsletter signup */}
        <Newsletter />
      </main>

      <SiteFooter />
    </div>
  )
}
