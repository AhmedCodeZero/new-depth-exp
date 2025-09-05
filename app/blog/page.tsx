"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  TrendingUp,
  Users,
  Target,
  Award,
  BookOpen,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
    document.documentElement.setAttribute("lang", language === "ar" ? "en" : "ar")
    document.documentElement.setAttribute("dir", language === "ar" ? "ltr" : "rtl")
  }

  const defaultContent = {
    ar: {
      nav: {
        home: "الرئيسية",
        services: "الخدمات",
        cases: "عملاؤنا",
        blog: "المدونة",
        contact: "اتصل بنا",
      },
      hero: {
        title: "مدونة عمق",
        subtitle: "آخر الأخبار والمقالات والمقالات في عالم الأعمال والتطوير",
        backToHome: "العودة للرئيسية",
        searchPlaceholder: "ابحث في المقالات...",
      },
      categories: {
        all: "الكل",
        strategy: "الاستراتيجية",
        digital: "التحول الرقمي",
        leadership: "القيادة",
        innovation: "الابتكار",
        trends: "الاتجاهات",
      },
      readMore: "اقرأ المزيد",
      readTime: "دقائق قراءة",
      featured: "مقال مميز",
      latest: "أحدث المقالات",
      posts: [
        {
          id: 1,
          title: "مستقبل التحول الرقمي في الشرق الأوسط",
          excerpt:
            "نظرة شاملة على التوجهات الحديثة في التحول الرقمي وتأثيرها على الأعمال في المنطقة، مع التركيز على التقنيات الناشئة والفرص المتاحة.",
          content:
            "يشهد الشرق الأوسط تطوراً متسارعاً في مجال التحول الرقمي، حيث تسعى الشركات والحكومات إلى تبني أحدث التقنيات لتحسين الكفاءة وتعزيز التنافسية...",
          author: "د. أحمد محمد",
          date: "15 يناير 2024",
          readTime: "8",
          category: "digital",
          tags: ["التحول الرقمي", "التكنولوجيا", "الشرق الأوسط"],
          featured: true,
        },
        {
          id: 2,
          title: "استراتيجيات النمو للشركات الناشئة",
          excerpt:
            "كيف يمكن للشركات الناشئة وضع استراتيجيات نمو فعالة في السوق التنافسي، مع دراسة أفضل الممارسات والأدوات المطلوبة.",
          content:
            "تواجه الشركات الناشئة تحديات كبيرة في وضع استراتيجيات نمو مستدامة. من خلال خبرتنا في هذا المجال، نقدم لكم أهم الاستراتيجيات...",
          author: "سارة العلي",
          date: "10 يناير 2024",
          readTime: "6",
          category: "strategy",
          tags: ["الاستراتيجية", "الشركات الناشئة", "النمو"],
          featured: false,
        },
        {
          id: 3,
          title: "أهمية القيادة التحويلية في العصر الرقمي",
          excerpt:
            "دور القيادة التحويلية في قيادة المؤسسات نحو النجاح في عصر التكنولوجيا، وكيفية تطوير المهارات القيادية المطلوبة.",
          content:
            "في عصر التطور التكنولوجي السريع، تحتاج المؤسسات إلى قادة قادرين على التكيف مع التغيير وقيادة فرقهم نحو الابتكار...",
          author: "محمد الشمري",
          date: "5 يناير 2024",
          readTime: "7",
          category: "leadership",
          tags: ["القيادة", "الإدارة", "التطوير"],
          featured: false,
        },
        {
          id: 4,
          title: "الابتكار في بيئة العمل: كيف تحفز الإبداع",
          excerpt: "طرق عملية لتعزيز ثقافة الابتكار في المؤسسات وخلق بيئة عمل محفزة للإبداع والتطوير المستمر.",
          content:
            "الابتكار ليس مجرد كلمة رنانة، بل ضرورة حتمية للبقاء في السوق التنافسي. نستعرض في هذا المقال أهم الاستراتيجيات...",
          author: "فاطمة أحمد",
          date: "28 ديسمبر 2023",
          readTime: "5",
          category: "innovation",
          tags: ["الابتكار", "الإبداع", "بيئة العمل"],
          featured: false,
        },
        {
          id: 5,
          title: "اتجاهات السوق العالمية لعام 2024",
          excerpt: "تحليل شامل لأهم الاتجاهات والتوقعات في الأسواق العالمية لعام 2024 وتأثيرها على الشركات في المنطقة.",
          content:
            "مع بداية عام 2024، نشهد تغيرات جذرية في الأسواق العالمية. من المهم للشركات فهم هذه التوجهات للاستعداد للمستقبل...",
          author: "عبدالله الراشد",
          date: "20 ديسمبر 2023",
          readTime: "9",
          category: "trends",
          tags: ["الاتجاهات", "السوق", "التوقعات"],
          featured: false,
        },
      ],
      cta: {
        title: "هل تريد المزيد من المقالات؟",
        subtitle: "اشترك في نشرتنا الإخبارية للحصول على أحدث المقالات والمقالات",
        button: "اشترك الآن",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
      },
    },
    en: {
      nav: {
        home: "Home",
        services: "Services",
        cases: "Case Studies",
        blog: "Blog",
        contact: "Contact",
      },
      hero: {
        title: "Depth Blog",
        subtitle: "Latest news, articles, and articles in the world of business and development",
        backToHome: "Back to Home",
        searchPlaceholder: "Search articles...",
      },
      categories: {
        all: "All",
        strategy: "Strategy",
        digital: "Digital Transformation",
        leadership: "Leadership",
        innovation: "Innovation",
        trends: "Trends",
      },
      readMore: "Read More",
      readTime: "min read",
      featured: "Featured Article",
      latest: "Latest Articles",
      posts: [
        {
          id: 1,
          title: "The Future of Digital Transformation in the Middle East",
          excerpt:
            "A comprehensive look at modern trends in digital transformation and their impact on business in the region, focusing on emerging technologies and available opportunities.",
          content:
            "The Middle East is experiencing rapid development in digital transformation, with companies and governments seeking to adopt the latest technologies to improve efficiency and enhance competitiveness...",
          author: "Dr. Ahmed Mohammed",
          date: "January 15, 2024",
          readTime: "8",
          category: "digital",
          tags: ["Digital Transformation", "Technology", "Middle East"],
          featured: true,
        },
        {
          id: 2,
          title: "Growth Strategies for Startups",
          excerpt:
            "How startups can develop effective growth strategies in the competitive market, studying best practices and required tools.",
          content:
            "Startups face significant challenges in developing sustainable growth strategies. Through our experience in this field, we present the most important strategies...",
          author: "Sarah Al-Ali",
          date: "January 10, 2024",
          readTime: "6",
          category: "strategy",
          tags: ["Strategy", "Startups", "Growth"],
          featured: false,
        },
        {
          id: 3,
          title: "The Importance of Transformational Leadership in the Digital Age",
          excerpt:
            "The role of transformational leadership in leading organizations to success in the technology age, and how to develop required leadership skills.",
          content:
            "In the age of rapid technological development, organizations need leaders capable of adapting to change and leading their teams toward innovation...",
          author: "Mohammed Al-Shamri",
          date: "January 5, 2024",
          readTime: "7",
          category: "leadership",
          tags: ["Leadership", "Management", "Development"],
          featured: false,
        },
        {
          id: 4,
          title: "Innovation in the Workplace: How to Stimulate Creativity",
          excerpt:
            "Practical ways to enhance innovation culture in organizations and create a work environment that encourages creativity and continuous development.",
          content:
            "Innovation is not just a buzzword, but a necessity for survival in the competitive market. In this article, we review the most important strategies...",
          author: "Fatima Ahmed",
          date: "December 28, 2023",
          readTime: "5",
          category: "innovation",
          tags: ["Innovation", "Creativity", "Workplace"],
          featured: false,
        },
        {
          id: 5,
          title: "Global Market Trends for 2024",
          excerpt:
            "Comprehensive analysis of the most important trends and expectations in global markets for 2024 and their impact on companies in the region.",
          content:
            "With the beginning of 2024, we are witnessing radical changes in global markets. It is important for companies to understand these trends to prepare for the future...",
          author: "Abdullah Al-Rashid",
          date: "December 20, 2023",
          readTime: "9",
          category: "trends",
          tags: ["Trends", "Market", "Forecasts"],
          featured: false,
        },
      ],
      cta: {
        title: "Want More Articles?",
        subtitle: "Subscribe to our newsletter to get the latest articles and articles",
        button: "Subscribe Now",
        emailPlaceholder: "Enter your email",
      },
    },
  }

  const [remoteContent, setRemoteContent] = useState<any | null>(null)
  useEffect(() => {
    const bust = Date.now()
    fetch(`/api/content/blog?bust=${bust}`, { cache: "no-store" as RequestCache })
      .then((r) => r.json())
      .then((d) => setRemoteContent(d.data))
      .catch(() => {})
  }, [])

  const content = (remoteContent as any) || (defaultContent as any)
  const currentContent = content[language]

  const categories = [
    { key: "all", label: currentContent.categories.all, icon: BookOpen },
    { key: "strategy", label: currentContent.categories.strategy, icon: Target },
    { key: "digital", label: currentContent.categories.digital, icon: TrendingUp },
    { key: "leadership", label: currentContent.categories.leadership, icon: Users },
    { key: "innovation", label: currentContent.categories.innovation, icon: Lightbulb },
    { key: "trends", label: currentContent.categories.trends, icon: Award },
  ]

  const filteredPosts = currentContent.posts.filter(
    (post) => selectedCategory === "all" || post.category === selectedCategory,
  )

  const featuredPost = currentContent.posts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div
      className={`min-h-screen ${language === "ar" ? "font-arabic" : "font-sans"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img src="/images/depth-logo-horizontal.png" alt="Depth Logo" className="h-12 w-auto cursor-pointer" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.home}
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors">
              {currentContent?.nav?.services}
              </Link>
              <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.cases}
              </Link>
              <Link href="/blog" className="text-primary font-medium">
                {currentContent.nav.blog}
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.contact}
              </Link>
            </nav>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-transparent"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "ar" ? "EN" : "عربي"}</span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.home}
                </Link>
                <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                  {currentContent?.nav?.services}
                </Link>
                <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.cases}
                </Link>
                <Link href="/blog" className="text-primary font-medium">
                  {currentContent.nav.blog}
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.contact}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f]/10 via-[#4a90a4]/5 to-[#6bb6c7]/10 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-[#4a90a4] hover:text-[#1e3a5f] transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              {currentContent.hero.backToHome}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-6 leading-[5rem]">
              {currentContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {currentContent.hero.subtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={currentContent.hero.searchPlaceholder}
                className="pl-10 rtl:pl-4 rtl:pr-10 border-[#4a90a4]/30 focus:border-[#4a90a4] bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.key
                      ? "bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white border-0"
                      : "border-[#4a90a4]/30 text-[#1e3a5f] hover:bg-[#4a90a4]/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "all" && (
        <section className="py-16 bg-gradient-to-br from-[#1e3a5f]/5 via-[#4a90a4]/5 to-[#6bb6c7]/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] text-white border-0 mb-4">
                {currentContent.featured}
              </Badge>
            </div>
            <Card className="max-w-4xl mx-auto card-glow border-[#4a90a4]/20 bg-white overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-[#1e3a5f]/20 to-[#4a90a4]/30 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-[#1e3a5f]">{featuredPost.tags[0]}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl text-[#1e3a5f] mb-4">{featuredPost.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {featuredPost.readTime} {currentContent.readTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <Button className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white border-0">
                  {currentContent.readMore}
                  <ChevronRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
              {currentContent.latest}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="card-glow border-[#4a90a4]/20 bg-white overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#1e3a5f]/10 to-[#4a90a4]/20 relative">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#4a90a4]/10 text-[#1e3a5f] border-[#4a90a4]/30">{post.tags[0]}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e3a5f] mb-2 line-clamp-2">{post.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      {post.readTime} {currentContent.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(1).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[#4a90a4]/30 text-[#4a90a4]">
                          <Tag className="h-2 w-2 mr-1 rtl:mr-0 rtl:ml-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#4a90a4] hover:text-[#1e3a5f] hover:bg-[#4a90a4]/10"
                    >
                      {currentContent.readMore}
                      <ChevronRight className="ml-1 h-3 w-3 rtl:ml-0 rtl:mr-1 rtl:rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f] via-[#4a90a4] to-[#6bb6c7] relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{currentContent.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{currentContent.cta.subtitle}</p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                placeholder={currentContent.cta.emailPlaceholder}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white"
              />
              <Button className="bg-white text-[#1e3a5f] hover:bg-white/90 px-6">{currentContent.cta.button}</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1e3a5f] text-white py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src="/images/depth-logo-horizontal.png"
              alt="Depth Logo"
              className="h-12 w-auto mx-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/80">
              {language === "ar" ? "© 2024 عمق - جميع الحقوق محفوظة" : "© 2024 Depth - All rights reserved"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
