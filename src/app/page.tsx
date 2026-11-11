import { SiteHeader } from '@/components/news/site-header'
import { BreakingTicker } from '@/components/news/breaking-ticker'
import { EconomicTicker } from '@/components/news/economic-ticker'
import { NewsHeroCarousel } from '@/components/news/news-hero-carousel'
import { LiveStats } from '@/components/news/live-stats'
import { TopStoriesSection } from '@/components/news/top-stories'
import { WeatherWidget } from '@/components/news/weather-widget'
import { PrayerTimesWidget } from '@/components/news/prayer-times'
import { ViralSpotlight } from '@/components/news/viral-spotlight'
import { CategorySection } from '@/components/news/category-section'
import { MostRead } from '@/components/news/most-read'
import { Newsletter } from '@/components/news/newsletter'
import { SiteFooter } from '@/components/news/site-footer'
import { VideoGallery } from '@/components/news/video-gallery'
import { LiveChannels } from '@/components/news/live-channels'
import { FreeAccessBanner } from '@/components/news/free-access-banner'
import { AllNewsSection } from '@/components/news/all-news-section'
import { EditorsPick } from '@/components/news/editors-pick'
import { InteractivePoll } from '@/components/news/interactive-poll'
import { TagCloud } from '@/components/news/tag-cloud'
import { OnThisDay } from '@/components/news/on-this-day'
import { ZodiacWidget } from '@/components/news/zodiac-widget'

import {
  politikNews,
  ekonomiNews,
  teknologiNews,
  internasionalNews,
  olahragaNews,
  hukumNews,
} from '@/lib/news-data'
import { siteUrl } from '@/lib/site'

// JSON-LD WebSite + Organization — identitas situs untuk Google
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ViralHariIni.id',
  url: siteUrl('/'),
  inLanguage: 'id-ID',
  description:
    'Portal berita viral terkini di Indonesia. Gratis tanpa paywall.',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: 'ViralHariIni.id',
  url: siteUrl('/'),
  logo: siteUrl('/logo.svg'),
  sameAs: [],
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SiteHeader />
      <BreakingTicker />
      <EconomicTicker />

      <main className="flex-1">
        {/* Hero carousel — auto-rotate 4 featured articles */}
        <NewsHeroCarousel />

        {/* Live stats bar */}
        <LiveStats />

        {/* Cuaca + Jadwal Shalat (premium widgets) */}
        <WeatherWidget />
        <PrayerTimesWidget />

        {/* Top stories + Trending sidebar */}
        <TopStoriesSection />

        {/* Pilihan redaksi (editor's pick) */}
        <EditorsPick />

        {/* Viral spotlight (highlight viral videos/stories) */}
        <ViralSpotlight />

        {/* Free access banner */}
        <FreeAccessBanner />

        {/* Pada hari ini di tahun... (sejarah harian) */}
        <OnThisDay />

        {/* Polling interaktif */}
        <InteractivePoll />

        {/* Video berita (with category filter) */}
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

        {/* Zodiak harian (engagement ringan) */}
        <ZodiacWidget />

        {/* Semua berita — grid semua artikel dengan filter kategori */}
        <AllNewsSection />

        {/* Tag cloud — penemuan berita berbasis hashtag */}
        <TagCloud />

        {/* Newsletter signup */}
        <Newsletter />
      </main>

      <SiteFooter />
    </div>
  )
}
