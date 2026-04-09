import { useEffect, useRef, useState } from 'react'
import TutorsPage from './pages/TutorsPage'

type FeatureGroup = {
  title: string
  summary: string
  backgroundImage?: string
  /** Shown beside the title when there is no background or it is still loading */
  titleIcon?: string
  testimonial: {
    quote: string
    name: string
    role: string
    avatar?: string
  }
}

type TrainingArticle = {
  title: string
  description: string
  image?: string
  ctaLabel?: string
}

type TutorPricingPlan = {
  name: string
  subtitle: string
  fee: string
  includesTitle: string
  features: string[]
  isMostPopular?: boolean
}

const navItems = [
  'Tutors',
  'Kids',
  'Resources',
  'Why Brilang',
  'Latest Updates',
  'Pricing',
  'For enterprise',
]

const hiringCompanies = [
  { name: 'Flutterwave', logo: '/flutterwave-3.svg' },
  { name: 'Andela', logo: '/Andela_idvyoM1ti0_0.svg' },
  { name: 'MTN Group', logo: '/MTN_Group-Logo.wine.svg' },
  { name: 'Safaricom', logo: '/Safaricom-Logo.wine.svg' },
  { name: 'Jumia', logo: '/Jumia%20Logo%20Vector.svg' },
  { name: 'Interswitch', logo: '/Logo.svg' },
]

const featureGroups: FeatureGroup[] = [
  {
    title: 'Language Learning Features',
    backgroundImage: '/language-learning-features-bg.png',
    titleIcon: '/icon-language-learning.png',
    summary:
      'Interactive lessons, structured beginner-to-advanced tracks, AI conversation practice, pronunciation feedback, and daily streak challenges.',
    testimonial: {
      quote: 'The interactive lessons and AI practice made me improve faster than any app I used before.',
      name: 'Nana A.',
      role: 'Learner, Ghana',
      avatar: '/testimonial-nana-a.png',
    },
  },
  {
    title: 'Certified Professionals',
    backgroundImage: '/certified-professionals-bg.png',
    summary:
      'Verified tutors with badges, visible qualifications and experience, plus flexible 1-on-1 and group classes with trusted ratings.',
    testimonial: {
      quote: 'My certified tutor helped me prepare for client calls and I landed my first bilingual contract.',
      name: 'Samir E.',
      role: 'Freelancer, Egypt',
      avatar: '/testimonial-samir-e.png',
    },
  },
  {
    title: 'Job Opportunities',
    backgroundImage: '/job-opportunities-bg.png',
    titleIcon: '/icon-job-opportunities.png',
    summary:
      'A language-based job board, platform certifications, employer partnerships, and portfolio profiles that showcase proven skills.',
    testimonial: {
      quote: 'After finishing my certification, I found a remote language support role through the job board.',
      name: 'Aisha M.',
      role: 'Customer Support Specialist, Kenya',
      avatar: '/testimonial-job-opportunities.png',
    },
  },
  {
    title: 'Career Growth Features',
    backgroundImage: '/career-growth-features-bg.png',
    titleIcon: '/icon-career-growth.png',
    summary:
      'Mock interview preparation, an international CV builder, and a freelance marketplace for translation, interpretation, and tutoring gigs.',
    testimonial: {
      quote: 'The resume builder and mock interviews gave me the confidence to apply for global opportunities.',
      name: 'Chiamaka O.',
      role: 'Job Seeker, Nigeria',
      avatar: '/testimonial-career-growth.png',
    },
  },
  {
    title: 'Progress and Personalization',
    backgroundImage: '/progress-personalization-bg.png',
    titleIcon: '/icon-progress-personalization.png',
    summary:
      'Track progress with dashboards, follow AI-personalized learning paths, and improve faster using performance analytics.',
    testimonial: {
      quote: 'The dashboard showed exactly where I was weak, and the personalized path fixed it.',
      name: 'Tendai R.',
      role: 'Learner, Zimbabwe',
      avatar: '/testimonial-progress-personalization.png',
    },
  },
  {
    title: 'Community and Engagement',
    backgroundImage: '/community-engagement-bg.png',
    titleIcon: '/icon-community-engagement.png',
    summary:
      'Practice through language exchange, get support in forums, and stay motivated with leaderboards and community competition.',
    testimonial: {
      quote: 'The community features kept me consistent and made language practice feel fun every day.',
      name: 'Lerato P.',
      role: 'Learner, South Africa',
      avatar: '/testimonial-community-engagement.png',
    },
  },
]

const featureTitleFallbackIcon = '/icon-certification.png'

const journeyJobSearchingIntro =
  'Join for free, shape a profile that shows what you can do, and explore roles and freelance work aligned with your languages and goals.'

const journeyJobSearchingPoints = [
  'Getting started is completely free—whether you’re freelancing or looking for full-time or part-time roles',
  'Create and customize your professional profile to showcase your skills and experience',
  'Browse opportunities and connect with jobs that match your expertise and interests',
]

const journeyHiringTalentIntro =
  'Post openings in minutes, invite proposals from qualified multilingual professionals, and compare CVs and profiles until you find the right hire.'

const journeyHiringTalentPoints = [
  'Create your account in just a few steps',
  'Post roles and receive proposals from qualified candidates',
  'Review applicants’ CVs, credentials, and profiles to find the right fit',
]

const journeyJobSearchingImages: { src: string; alt: string }[] = [
  {
    src: '/journey-job-search-1.png',
    alt: 'Hands holding a tablet showing a job search, with a notebook and pencil nearby',
  },
  {
    src: '/journey-job-search-2.png',
    alt: 'Professional reviewing career opportunities on a desktop computer',
  },
]

const journeyHiringTalentImages: { src: string; alt: string }[] = [
  {
    src: '/journey-hiring-1.png',
    alt: 'Smiling professional holding a Hiring sign in a bright workplace',
  },
  {
    src: '/journey-hiring-2.png',
    alt: 'Professional holding a Join our team sign in a modern office with green accents',
  },
]

function JourneyCollageImages({ images }: { images: { src: string; alt: string }[] }) {
  const back = images[0]
  const front = images[1]
  if (!back || !front) return null

  return (
    <div className="relative mx-auto w-full max-w-[260px] overflow-visible pb-12 sm:max-w-[300px] sm:pb-16 lg:mx-0 lg:ml-auto lg:max-w-[320px]">
      <img
        src={back.src}
        alt={back.alt}
        className="relative z-[1] w-full max-h-56 -translate-x-8 rounded-2xl border border-slate-200 bg-white object-cover shadow-md sm:-translate-x-10 sm:max-h-64 lg:-translate-x-14"
      />
      <img
        src={front.src}
        alt={front.alt}
        className="absolute bottom-0 right-0 z-[2] w-[60%] max-h-40 rounded-xl border-2 border-white bg-white object-cover shadow-lg ring-1 ring-slate-200/80 sm:max-h-44 translate-x-1 translate-y-2 sm:translate-x-2 sm:translate-y-4"
      />
    </div>
  )
}

const trainingArticles: TrainingArticle[] = [
  {
    title: 'Find the Right Tutors',
    description:
      'Connect with tutors who match your learning style, goals, and interests for a more effective and personalized experience.',
    image: '/training-right-tutors.png',
    ctaLabel: 'Explore Tutors',
  },
  {
    title: 'Lesson Schedule',
    description:
      'Plan your study time with ease-set weekly sessions, organize your timetable, and stay consistent with helpful reminders.',
    image: '/training-lesson-schedule.png',
    ctaLabel: 'Create Schedule',
  },
  {
    title: 'Small Group Practice',
    description:
      'Boost your confidence and fluency by practicing in small, interactive groups designed for meaningful collaboration.',
    image: '/training-small-group-practice.png',
    ctaLabel: 'Join Group Practice',
  },
]

const tutorPricingPlans: TutorPricingPlan[] = [
  {
    name: 'Basic',
    subtitle: 'Great for individuals getting started',
    fee: '8% service fee per completed lesson',
    includesTitle: 'Includes:',
    features: [
      'Smart tutor matching based on your goals',
      'Access to verified tutor profiles and reviews',
      'In-app messaging and scheduling',
      'Pay-as-you-go (no upfront commitment)',
    ],
  },
  {
    name: 'Plus',
    subtitle: 'Best for consistent learners',
    fee: '5% service fee per lesson',
    includesTitle: 'Everything in Basic, plus:',
    isMostPopular: true,
    features: [
      'Priority access to top-rated tutors',
      'Discounted rates for weekly/monthly sessions',
      'Personalized learning recommendations',
      'Session reminders and progress insights',
    ],
  },
  {
    name: 'Premium',
    subtitle: 'For serious learners & teams',
    fee: '3% service fee per lesson',
    includesTitle: 'Everything in Plus, plus:',
    features: [
      'Dedicated tutor matching support',
      'Access to elite, highly-rated tutors',
      'Custom learning plans tailored to your goals',
      'Team/class management (for groups or organizations)',
      'Priority customer support',
    ],
  },
]

const requiredImageAssets = Array.from(
  new Set(
    [
      '/logo.png',
      '/hero-bg.png',
      '/hero-bg-mobile.png',
      '/hero-small-1.png',
      '/hero-small-2.png',
      '/social-instagram-default.png',
      '/social-instagram.png',
      '/social-linkedin-default.png',
      '/social-linkedin.png',
      '/social-facebook-default.png',
      '/social-facebook.png',
      featureTitleFallbackIcon,
      ...hiringCompanies.map((company) => company.logo),
      ...featureGroups.flatMap((group) => [group.backgroundImage, group.titleIcon, group.testimonial.avatar]),
      ...trainingArticles.map((article) => article.image),
      ...journeyJobSearchingImages.map((image) => image.src),
      ...journeyHiringTalentImages.map((image) => image.src),
    ].filter((src): src is string => Boolean(src)),
  ),
)

function FeatureGroupSlideCard({ group, showTestimonial = true }: { group: FeatureGroup; showTestimonial?: boolean }) {
  const hasBackground = Boolean(group.backgroundImage)
  const [backgroundLoaded, setBackgroundLoaded] = useState(!group.backgroundImage)

  useEffect(() => {
    if (!group.backgroundImage) {
      setBackgroundLoaded(true)
      return
    }
    setBackgroundLoaded(false)
    const img = new Image()
    const onDone = () => setBackgroundLoaded(true)
    img.onload = onDone
    img.onerror = onDone
    img.src = group.backgroundImage
  }, [group.backgroundImage])

  const showTitleIcon = !group.backgroundImage || !backgroundLoaded

  return (
    <div
      className={`flex min-h-[520px] flex-col rounded-xl border shadow-sm ${
        hasBackground ? 'border-slate-300 bg-cover bg-top' : 'border-slate-200 bg-white'
      }`}
      style={hasBackground ? { backgroundImage: `url('${group.backgroundImage}')` } : undefined}
    >
      <div
        className={
          hasBackground
            ? 'mt-auto w-full rounded-t-2xl bg-gradient-to-t from-black/85 via-black/70 to-black/40 px-5 pb-6 pt-8 backdrop-blur-[2px]'
            : 'flex w-full flex-1 flex-col p-6'
        }
      >
        <div className="flex items-center gap-3">
          {showTitleIcon ? (
            <img
              src={group.titleIcon ?? featureTitleFallbackIcon}
              alt=""
              aria-hidden
              className="h-10 w-10 shrink-0 object-contain"
            />
          ) : null}
          <h3
            className={`min-w-0 flex-1 text-2xl font-bold tracking-tight ${hasBackground ? 'text-white' : 'text-[#14118c]'}`}
          >
            {group.title}
          </h3>
        </div>
        <p className={`mt-3 text-sm leading-relaxed ${hasBackground ? 'text-slate-100' : 'text-slate-700'}`}>
          {group.summary}
        </p>
        {showTestimonial ? (
          <div
            className={`w-full border-t pt-5 ${showTitleIcon ? 'mt-40' : 'mt-5'} ${
              hasBackground ? 'border-white/20' : 'border-slate-200'
            }`}
          >
            <p className={`text-sm italic leading-relaxed ${hasBackground ? 'text-slate-100' : 'text-slate-600'}`}>
              &ldquo;{group.testimonial.quote}&rdquo;
            </p>
            <div className="mt-4 flex w-full min-w-0 items-center gap-3">
              {group.testimonial.avatar ? (
                <img
                  src={group.testimonial.avatar}
                  alt={`${group.testimonial.name} portrait`}
                  className={`h-12 w-12 shrink-0 rounded-full object-cover ring-2 ${
                    hasBackground ? 'ring-white/40' : 'ring-slate-200'
                  }`}
                />
              ) : null}
              <div className={group.testimonial.avatar ? 'min-w-0 flex-1 basis-0' : 'w-full'}>
                <p className={`text-sm font-semibold ${hasBackground ? 'text-white' : 'text-slate-900'}`}>
                  {group.testimonial.name}
                </p>
                <p
                  className={`mt-0.5 text-xs font-medium uppercase tracking-wider ${
                    hasBackground ? 'text-[#7dd4a8]' : 'text-[#008037]'
                  }`}
                >
                  {group.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function TrainingArticleCard({ article }: { article: TrainingArticle }) {
  const [imageLoaded, setImageLoaded] = useState(!article.image)
  const showImageSection = Boolean(article.image && imageLoaded)

  useEffect(() => {
    if (!article.image) {
      setImageLoaded(true)
      return
    }
    setImageLoaded(false)
    const image = new Image()
    const done = () => setImageLoaded(true)
    image.onload = done
    image.onerror = done
    image.src = article.image
  }, [article.image])

  return (
    <article className="group flex cursor-pointer flex-col self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:border-0 md:bg-transparent md:shadow-none">
      {showImageSection ? (
        <div className="p-3 md:p-0">
          <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-slate-200">
            <img src={article.image} alt={`${article.title} visual`} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      ) : null}
      <div className={`flex flex-col p-5 ${showImageSection ? '' : 'h-52 rounded-xl border border-slate-200 bg-slate-50'}`}>
        <p className="text-base font-bold uppercase tracking-wider text-[#14118c]">{article.title}</p>
        <p
          className={`text-sm leading-relaxed text-slate-700 transition-all duration-300 ${
            showImageSection
              ? 'mt-3 max-h-40 opacity-100 md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:mt-3 md:group-hover:max-h-24 md:group-hover:opacity-100'
              : 'mt-3 max-h-40 opacity-100'
          }`}
        >
          {article.description}
        </p>
        {article.ctaLabel ? (
          <button
            className={`mx-auto min-w-[230px] rounded-full bg-[#008037] px-7 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#008037]/25 transition-all duration-300 hover:brightness-110 ${
              showImageSection
                ? 'mt-4 max-h-12 py-2 opacity-100 md:mt-0 md:max-h-0 md:overflow-hidden md:py-0 md:opacity-0 md:group-hover:mt-4 md:group-hover:max-h-12 md:group-hover:py-2 md:group-hover:opacity-100'
                : 'mt-4 max-h-12 py-2 opacity-100'
            }`}
          >
            {article.ctaLabel}
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default function App() {
  const isTutorsPage = window.location.pathname === '/tutors'
  const [appImagesReady, setAppImagesReady] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(window.innerWidth < 640)
  const [heroImagesReady, setHeroImagesReady] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [featureStart, setFeatureStart] = useState(0)
  const [mobileFeatureStep, setMobileFeatureStep] = useState(0)
  const [mobileTransitionEnabled, setMobileTransitionEnabled] = useState(true)
  const [isMobileAutoPaused, setIsMobileAutoPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [visibleFeatureCount, setVisibleFeatureCount] = useState(3)
  const [journeyMode, setJourneyMode] = useState<'job-searching' | 'hiring-talent'>('job-searching')
  const mobileSliderRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLElement | null>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const maxFeatureStart = Math.max(0, featureGroups.length - visibleFeatureCount)
  const mobileLoopGroups = [...featureGroups, featureGroups[0]]

  const goToPreviousFeatureGroup = () => {
    setFeatureStart((current) => (current === 0 ? maxFeatureStart : current - 1))
  }

  const goToNextFeatureGroup = () => {
    setFeatureStart((current) => (current >= maxFeatureStart ? 0 : current + 1))
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      setVisibleFeatureCount(window.innerWidth < 768 ? 1 : 3)
      setIsMobileViewport(window.innerWidth < 640)
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let cancelled = false
    setHeroImagesReady(false)

    const mainImageSrc = isMobileViewport ? '/hero-bg-mobile.png' : '/hero-bg.png'
    const sources = [mainImageSrc, '/hero-small-1.png', '/hero-small-2.png']

    const preload = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = src
      })

    Promise.all(sources.map(preload)).then((results) => {
      if (cancelled) return
      setHeroImagesReady(results.every(Boolean))
    })

    return () => {
      cancelled = true
    }
  }, [isMobileViewport])

  useEffect(() => {
    let cancelled = false

    const preload = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = src
      })

    Promise.all(requiredImageAssets.map(preload)).then((results) => {
      if (cancelled) return
      setAppImagesReady(results.every(Boolean))
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isMobileNavOpen) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (mobileMenuRef.current?.contains(target)) return
      if (mobileMenuButtonRef.current?.contains(target)) return
      setIsMobileNavOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [isMobileNavOpen])

  useEffect(() => {
    if (featureStart > maxFeatureStart) {
      setFeatureStart(maxFeatureStart)
    }
  }, [featureStart, maxFeatureStart])

  useEffect(() => {
    if (visibleFeatureCount !== 1 || featureGroups.length <= 1) {
      setMobileFeatureStep(0)
      setMobileTransitionEnabled(true)
      return
    }
    if (isMobileAutoPaused) return

    const timer = window.setInterval(() => {
      setMobileFeatureStep((current) => (current < featureGroups.length ? current + 1 : current))
    }, 3500)

    return () => window.clearInterval(timer)
  }, [visibleFeatureCount, isMobileAutoPaused])

  useEffect(() => {
    if (visibleFeatureCount !== 1) return
    if (mobileFeatureStep !== featureGroups.length) return
    if (isSwiping) return

    const resetTimer = window.setTimeout(() => {
      setMobileTransitionEnabled(false)
      setMobileFeatureStep(0)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setMobileTransitionEnabled(true)
        })
      })
    }, 500)

    return () => window.clearTimeout(resetTimer)
  }, [mobileFeatureStep, visibleFeatureCount, isSwiping])

  const goToPreviousMobileFeature = () => {
    setMobileFeatureStep((current) => (current > 0 ? current - 1 : current))
  }

  const goToNextMobileFeature = () => {
    setMobileFeatureStep((current) => (current < featureGroups.length ? current + 1 : current))
  }

  const onMobileTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsMobileAutoPaused(true)
    setTouchStartX(event.touches[0]?.clientX ?? null)
    setTouchCurrentX(event.touches[0]?.clientX ?? null)
    setIsSwiping(true)
  }

  const onMobileTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    setTouchCurrentX(event.touches[0]?.clientX ?? null)
  }

  const onMobileTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const deltaX = touchEndX - touchStartX
    const swipeThreshold = 40

    if (deltaX > swipeThreshold) {
      goToPreviousMobileFeature()
    } else if (deltaX < -swipeThreshold) {
      goToNextMobileFeature()
    }

    setTouchStartX(null)
    setTouchCurrentX(null)
    setIsSwiping(false)
    setIsMobileAutoPaused(false)
  }

  const onMobileTouchCancel = () => {
    setTouchStartX(null)
    setTouchCurrentX(null)
    setIsSwiping(false)
    setIsMobileAutoPaused(false)
  }

  const mobileDragOffsetPx = touchStartX !== null && touchCurrentX !== null ? touchCurrentX - touchStartX : 0
  const mobileSlideWidth = mobileSliderRef.current?.clientWidth ?? 1
  const mobileDragOffsetPercent = (mobileDragOffsetPx / mobileSlideWidth) * 100

  if (!appImagesReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <span
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-[#14118c]"
          aria-label="Loading"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <style>{`@keyframes ctaBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }`}</style>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:py-2.5">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={() => setIsMobileNavOpen((open) => !open)}
                className="inline-flex items-center justify-center text-slate-700 transition hover:text-[#14118c] lg:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileNavOpen}
              >
                <span className="text-3xl leading-none">{isMobileNavOpen ? '×' : '☰'}</span>
              </button>
              <img src="/logo.png" alt="Brilang Consults logo" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14118c]">Brilang</p>
                <p className="text-xs uppercase tracking-[0.3em] text-[#008037]">Consults</p>
              </div>
            </div>
            <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-5">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={item === 'Tutors' ? '#' : '/'}
                  className="cursor-pointer text-sm font-medium text-slate-700 transition hover:text-[#14118c]"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="hidden rounded-full border border-[#14118c] px-4 py-2 text-xs font-semibold text-[#14118c] transition hover:bg-[#14118c] hover:text-white sm:px-5 sm:text-sm lg:inline-flex">
                Login
              </button>
              <button className="rounded-full bg-[#008037] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#008037]/30 transition hover:brightness-110 sm:px-5 sm:text-sm">
                Sign Up
              </button>
            </div>
          </div>
          <nav
            ref={mobileMenuRef}
            className={`text-sm lg:hidden ${
              isMobileNavOpen
                ? 'absolute left-0 top-full z-[999] flex h-[calc(100dvh-70px)] w-[85vw] max-w-xs flex-col items-start gap-3 overflow-y-auto border-r border-slate-200 bg-white px-5 pb-6 pt-6 shadow-2xl'
                : 'hidden'
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={item === 'Tutors' ? '#' : '/'}
                onClick={() => setIsMobileNavOpen(false)}
                className="w-full cursor-pointer rounded-lg px-2 py-2 font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#14118c]"
              >
                {item}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
                className="mt-3 w-full cursor-pointer rounded-full border border-[#14118c] px-4 py-2 text-xs font-semibold text-[#14118c] transition hover:bg-[#14118c] hover:text-white"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      <main>
        {isTutorsPage ? <TutorsPage /> : null}

        <div className={isTutorsPage ? 'hidden' : ''}>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#eef3ff] via-[#f4f8ff] to-[#e9f7f0]">
          <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#14118c]/15 blur-3xl" />
          <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-[#008037]/15 blur-3xl" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div className="text-center lg:text-left">
              <span className="mx-auto inline-flex max-w-[92%] items-center justify-center rounded-full border border-[#14118c]/25 bg-[#14118c]/10 px-4 py-2 text-center text-xs font-semibold uppercase leading-tight tracking-[0.15em] text-[#14118c] lg:mx-0 lg:max-w-none">
                Bridging Language, Talents and opportunities
              </span>
              <h1
                className="mt-6 text-5xl font-black leading-tight text-slate-900 md:text-5xl"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
              >
                Master new languages and unlock <span className="text-[#008037]">global freelancing opportunities.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 lg:mx-0">
                Brilang helps you become fluent in in-demand languages while connecting you directly with clients
                hiring multilingual talent.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <button className="min-w-[260px] rounded-full bg-[#14118c] px-12 py-3 text-sm font-semibold text-white shadow-lg shadow-[#14118c]/30 transition hover:brightness-110">
                  Start Learning
                </button>
                <button className="min-w-[260px] rounded-full border border-[#008037] px-12 py-3 text-sm font-semibold text-[#008037] transition hover:bg-[#008037] hover:text-white">
                  Explore Jobs
                </button>
              </div>
            </div>

            <div className="mt-8 block lg:mt-0">
              {heroImagesReady ? (
                <div className="relative mx-auto w-full max-w-none aspect-[1/0.95] sm:max-w-sm sm:aspect-[3/4] lg:ml-auto lg:max-w-sm lg:aspect-[3/4] lg:translate-x-24">
                  <picture>
                    <source media="(max-width: 639px)" srcSet="/hero-bg-mobile.png" />
                    <img
                      src="/hero-bg.png"
                      alt="Multilingual learning and tutoring"
                      className="h-full w-full rounded-3xl object-contain opacity-100 mix-blend-normal"
                    />
                  </picture>
                  <img
                    src="/hero-small-1.png"
                    alt="Young learner in an online class"
                    className="absolute left-2 bottom-4 h-20 w-28 rounded-2xl object-cover opacity-100 shadow-xl shadow-slate-900/20 sm:-left-10 sm:bottom-8 sm:h-24 sm:w-36 lg:-left-52 lg:bottom-14 lg:h-32 lg:w-52 lg:opacity-80"
                  />
                  <div
                    className="pointer-events-none absolute left-2 bottom-4 hidden h-20 w-28 rounded-2xl bg-white/35 sm:-left-10 sm:bottom-8 sm:h-24 sm:w-36 lg:block lg:-left-52 lg:bottom-14 lg:h-32 lg:w-52"
                    aria-hidden
                  />
                  <img
                    src="/hero-small-2.png"
                    alt="Tutor holding a tablet with multilingual greetings"
                    className="absolute -left-2 top-3 h-20 w-28 rounded-2xl object-cover opacity-100 shadow-xl shadow-slate-900/20 sm:-left-4 sm:top-5 sm:h-24 sm:w-36 lg:-left-36 lg:top-8 lg:h-32 lg:w-52 lg:opacity-80"
                  />
                  <div
                    className="pointer-events-none absolute -left-2 top-3 hidden h-20 w-28 rounded-2xl bg-white/35 sm:-left-4 sm:top-5 sm:h-24 sm:w-36 lg:block lg:-left-36 lg:top-8 lg:h-32 lg:w-52"
                    aria-hidden
                  />
                </div>
              ) : (
                <div
                  className="mx-auto w-full max-w-none aspect-[1/0.95] sm:max-w-sm sm:aspect-[3/4] lg:ml-auto lg:max-w-sm lg:aspect-[3/4] lg:translate-x-24"
                  aria-hidden
                />
              )}
            </div>

          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="w-full px-4 py-16 sm:px-6">
            <div className="text-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#14118c]">
                Helping Recruiters Connect with Language Professionals
                </p>
                <h2
                  className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl"
                  style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
                >
                  Companies across Africa rely on platforms like Brilang
                </h2>
              </div>
            </div>

            <div className="relative mt-3 overflow-hidden py-4">
              <div className="logo-marquee-track gap-4">
                {[...hiringCompanies, ...hiringCompanies].map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className="flex h-24 w-56 shrink-0 items-center justify-center border border-slate-200 bg-slate-100 px-6 shadow-sm sm:h-28 sm:w-64"
                    aria-hidden={index >= hiringCompanies.length}
                  >
                    <img
                      src={company.logo}
                      alt={index < hiringCompanies.length ? `${company.name} logo` : ''}
                      className="max-h-16 max-w-full object-contain transition sm:max-h-20"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button className="min-w-[260px] rounded-full bg-[#008037] px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-[#008037]/30 transition hover:brightness-110">
                Post A Job
              </button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-[#f7f9ff] via-slate-50 to-[#eef8f3]">
          <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#14118c]/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-16 bottom-12 h-60 w-60 rounded-full bg-[#008037]/10 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="text-center">
              <h2
                className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold text-slate-900 md:text-4xl"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
              >
                The{' '}
                <span className="relative inline-block px-1 text-[#14118c]">
                  #1
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-7 flex items-center rotate-[-10deg] text-[5rem] leading-none font-black text-[#008037] md:-right-8 md:-top-10 md:text-[6.2rem]"
                  >
                    ✓
                  </span>
                </span>{' '}
                language learning platform with certified professionals and job opportunities
              </h2>
            </div>

            <div className="mt-10 md:hidden">
              <div
                ref={mobileSliderRef}
                className="overflow-hidden py-2"
                onTouchStart={onMobileTouchStart}
                onTouchMove={onMobileTouchMove}
                onTouchEnd={onMobileTouchEnd}
                onTouchCancel={onMobileTouchCancel}
              >
                <div
                  className={`flex ${isSwiping || !mobileTransitionEnabled ? '' : 'transition-transform duration-500 ease-out'}`}
                  style={{ transform: `translateX(calc(${-mobileFeatureStep * 100}% + ${mobileDragOffsetPercent}%))` }}
                >
                  {mobileLoopGroups.map((group, index) => (
                    <div key={`mobile-feature-${group.title}-${index}`} className="w-full shrink-0 px-1">
                      <div
                        className={`mx-auto w-[88vw] max-w-sm transition-all duration-200 ${
                          isMobileAutoPaused && index === mobileFeatureStep
                            ? 'scale-[1.01] rounded-2xl ring-2 ring-[#008037] ring-offset-2 ring-offset-slate-50'
                            : ''
                        }`}
                      >
                        <FeatureGroupSlideCard group={group} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto mt-1 gap-2 flex w-[88vw] max-w-sm items-center justify-between px-1 py-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#14118c]">
                  Up next: {featureGroups[(mobileFeatureStep % featureGroups.length) + 1 > featureGroups.length - 1 ? 0 : (mobileFeatureStep % featureGroups.length) + 1].title}
                </p>
                <div className="flex items-center gap-1.5">
                  {featureGroups.map((group, index) => (
                    <span
                      key={`mobile-feature-dot-${group.title}`}
                      className={`h-2 w-2 rounded-full transition ${
                        index === mobileFeatureStep % featureGroups.length ? 'bg-[#14118c]' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={goToPreviousFeatureGroup}
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-bold text-[#14118c] shadow-sm transition hover:border-[#14118c] hover:text-[#008037] md:flex"
                aria-label="Previous feature groups"
              >
                {'<'}
              </button>
              <div className="flex-1 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${featureStart * (100 / visibleFeatureCount)}%)` }}
                >
                  {featureGroups.map((group) => (
                    <article key={group.title} className="shrink-0 px-2" style={{ width: `${100 / visibleFeatureCount}%` }}>
                      <FeatureGroupSlideCard group={group} />
                    </article>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={goToNextFeatureGroup}
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-bold text-[#14118c] shadow-sm transition hover:border-[#14118c] hover:text-[#008037] md:flex"
                aria-label="Next feature groups"
              >
                {'>'}
              </button>
            </div>

          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#14118c]">Training and Learning</p>
              <h2
                className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold text-slate-900 md:text-4xl"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
              >
                Learn smarter with the right tutors, structure, and practice
              </h2>
            </div>

            <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
              {trainingArticles.map((article) => (
                <div key={`mobile-training-${article.title}`} className="w-[78vw] max-w-sm shrink-0 snap-start">
                  <TrainingArticleCard article={article} />
                </div>
              ))}
            </div>

            <div className="mt-10 hidden items-start gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
              {trainingArticles.map((article) => (
                <TrainingArticleCard key={article.title} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-slate-50 via-[#eef4ff] to-[#e8f7ef]"
          aria-labelledby="journey-heading"
        >
          <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[#14118c]/15 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-20 bottom-6 h-64 w-64 rounded-full bg-[#008037]/15 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <h2
                id="journey-heading"
                className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-left"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
              >
                Your Journey Starts Here
              </h2>
              <div
                className="mx-auto flex shrink-0 rounded-full border border-slate-200 bg-white p-1 shadow-sm lg:mx-0"
                role="tablist"
                aria-label="Choose journey type"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={journeyMode === 'job-searching'}
                  onClick={() => setJourneyMode('job-searching')}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${
                    journeyMode === 'job-searching'
                      ? 'bg-[#14118c] text-white shadow-md shadow-[#14118c]/25'
                      : 'text-slate-600 hover:text-[#14118c]'
                  }`}
                >
                  Job searching
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={journeyMode === 'hiring-talent'}
                  onClick={() => setJourneyMode('hiring-talent')}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${
                    journeyMode === 'hiring-talent'
                      ? 'bg-[#008037] text-white shadow-md shadow-[#008037]/25'
                      : 'text-slate-600 hover:text-[#008037]'
                  }`}
                >
                  Hiring talent
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-12 px-5 sm:px-7 md:px-12 lg:px-16 xl:px-20 lg:grid-cols-2 lg:items-start lg:gap-x-16">
              <div className="min-w-0">
                <p className="mb-6 text-left text-lg font-medium leading-relaxed text-[#14118c] sm:text-xl">
                  {journeyMode === 'job-searching' ? journeyJobSearchingIntro : journeyHiringTalentIntro}
                </p>
                <ul
                  className={`list-none space-y-4 text-left text-base leading-relaxed text-slate-700 ${
                    journeyMode === 'hiring-talent' ? 'max-w-3xl' : ''
                  }`}
                  role="tabpanel"
                  aria-live="polite"
                >
                  {(journeyMode === 'job-searching' ? journeyJobSearchingPoints : journeyHiringTalentPoints).map(
                    (point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold leading-none text-white ${
                            journeyMode === 'job-searching' ? 'bg-[#14118c]' : 'bg-[#008037]'
                          }`}
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span className="min-w-0 flex-1">{point}</span>
                      </li>
                    ),
                  )}
                </ul>
                <div className="mt-8">
                  {journeyMode === 'job-searching' ? (
                    <button
                      type="button"
                      className="rounded-full bg-[#008037] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#008037]/30 transition hover:brightness-110 sm:px-10"
                    >
                      Explore Jobs
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="rounded-full bg-[#008037] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#008037]/30 transition hover:brightness-110 sm:px-10"
                    >
                      Create a Job
                    </button>
                  )}
                </div>
              </div>

              <JourneyCollageImages
                images={journeyMode === 'job-searching' ? journeyJobSearchingImages : journeyHiringTalentImages}
              />
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-white via-[#f5f8ff] to-[#edf8f1]"
          aria-labelledby="tutor-pricing-heading"
        >
          <div className="pointer-events-none absolute -left-20 top-12 h-56 w-56 rounded-full bg-[#14118c]/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#008037]/10 blur-3xl" aria-hidden />
          <img
            src="/tutor-pricing-bg.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-8 top-8 z-0 h-64 w-64 opacity-20 sm:h-72 sm:w-72"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="text-center">
              <h2
                id="tutor-pricing-heading"
                className="mx-auto max-w-4xl text-3xl font-extrabold text-slate-900 md:text-4xl"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
              >
                Only Pay When You Find the Right Tutor
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tutorPricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative mx-auto w-full max-w-[340px] rounded-2xl border p-6 shadow-sm ${
                    plan.isMostPopular
                      ? 'border-[#14118c] bg-gradient-to-b from-[#14118c]/5 to-white ring-2 ring-[#14118c]/20'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  {plan.isMostPopular ? (
                    <span className="absolute right-5 top-5 rounded-full bg-[#14118c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{plan.subtitle}</p>
                  <p className="mt-4 text-base font-semibold text-[#008037]">{plan.fee}</p>
                  <p className="mt-5 text-sm font-semibold text-[#14118c]">{plan.includesTitle}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-0.5 text-[#008037]" aria-hidden>
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`mt-6 w-full rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                      plan.isMostPopular
                        ? 'bg-[#14118c] text-white shadow-md shadow-[#14118c]/25 hover:brightness-110'
                        : 'bg-[#008037] text-white shadow-md shadow-[#008037]/25 hover:brightness-110'
                    }`}
                  >
                    Get Started for Free
                  </button>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm font-medium text-slate-700">
              <a href="#" className="font-semibold text-[#14118c] underline decoration-[#14118c]/40 underline-offset-4 hover:decoration-[#14118c]">
                Compare all plan features
              </a>
            </p>

            <div className="relative left-1/2 right-1/2 mt-12 w-screen -translate-x-1/2 bg-[#14118c] py-14">
              <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
                <h3
                  className="mx-auto max-w-4xl text-2xl font-bold text-slate-300 sm:text-3xl"
                  style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
                >
                  Hire skilled freelancers or expert tutors for one-off tasks or ongoing projects
                </h3>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-[#008037] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#008037]/35 transition hover:brightness-110 [animation:ctaBreath_2s_ease-in-out_infinite] sm:px-10"
                >
                  Browse Tutors & Freelancers
                </button>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-200 pb-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <img src="/logo.png" alt="Brilang Consults logo" className="h-10 w-10 object-contain" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14118c]">Brilang</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#008037]">Consults</p>
                </div>
              </div>
              <p className="mt-1 text-sm text-slate-600">Bridging language, talents and opportunities.</p>
            </div>
            <nav className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {navItems.map((item) => (
                <a key={`footer-${item}`} href={item === 'Tutors' ? '#' : '/'} className="text-sm font-medium text-slate-700 transition hover:text-[#14118c]">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-600">
              <span className="text-sm font-semibold text-slate-700">Follow Us:</span>
              <span className="group inline-flex cursor-pointer items-center">
                <span className="relative h-5 w-5">
                  <img
                    src="/social-instagram-default.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-5 w-5 object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <img
                    src="/social-instagram.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </span>
              </span>
              <span className="group inline-flex cursor-pointer items-center">
                <span className="relative h-5 w-5">
                  <img
                    src="/social-linkedin-default.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-5 w-5 object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <img
                    src="/social-linkedin.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </span>
              </span>
              <span className="group inline-flex cursor-pointer items-center">
                <span className="relative h-5 w-5">
                  <img
                    src="/social-facebook-default.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-5 w-5 object-contain opacity-100 transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <img
                    src="/social-facebook.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-5 w-5 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </span>
              </span>
            </div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Brilang Consults. All rights reserved.</p>
          </div>

          <p className="mt-6 text-center text-xs italic leading-relaxed text-slate-500 sm:text-sm">
            *The company names and logos displayed above are the trademarks of their respective owners. Their inclusion
            does not imply any endorsement, sponsorship, or official affiliation with Brilang, unless explicitly stated.
          </p>
        </div>
      </footer>
    </div>
  )
}
