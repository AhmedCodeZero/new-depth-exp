"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  Users,
  Target,
  TrendingUp,
  Award,
  ArrowLeft,
  CheckCircle,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        cases: "دراسات الحالة",
        blog: "المدونة",
        contact: "اتصل بنا",
      },
      hero: {
        title: "خدماتنا المتخصصة",
        subtitle: "نقدم مجموعة شاملة من الحلول المبتكرة لتطوير أعمالكم وتحقيق النمو المستدام",
        backToHome: "العودة للرئيسية",
      },
      services: {
        consulting: {
          title: "الاستشارات الإدارية",
          description: "استشارات متخصصة لتطوير استراتيجيات العمل وتحسين الأداء التشغيلي",
          features: [
            "تحليل الوضع الحالي للشركة",
            "وضع استراتيجيات التطوير",
            "تحسين العمليات التشغيلية",
            "إدارة التغيير والتطوير",
            "قياس الأداء والنتائج",
          ],
          price: "يبدأ من 15,000 ريال",
          duration: "3-6 أشهر",
        },
        strategy: {
          title: "التخطيط الاستراتيجي",
          description: "وضع خطط استراتيجية محكمة لضمان نمو مستدام وتحقيق الأهداف طويلة المدى",
          features: [
            "تحليل السوق والمنافسين",
            "وضع الرؤية والرسالة",
            "تحديد الأهداف الاستراتيجية",
            "خطط التنفيذ التفصيلية",
            "متابعة وتقييم النتائج",
          ],
          price: "يبدأ من 20,000 ريال",
          duration: "4-8 أشهر",
        },
        digital: {
          title: "التحول الرقمي",
          description: "مساعدة الشركات في التحول الرقمي وتطبيق أحدث التقنيات لتحسين الكفاءة",
          features: [
            "تقييم الوضع التقني الحالي",
            "وضع استراتيجية التحول الرقمي",
            "تطبيق الحلول التقنية",
            "تدريب الفرق على التقنيات الجديدة",
            "الدعم والصيانة المستمرة",
          ],
          price: "يبدأ من 25,000 ريال",
          duration: "6-12 شهر",
        },
        training: {
          title: "التدريب والتطوير",
          description: "برامج تدريبية متخصصة لتطوير قدرات فرق العمل ورفع مستوى الأداء",
          features: [
            "تحليل احتياجات التدريب",
            "تصميم البرامج التدريبية",
            "التدريب العملي والنظري",
            "ورش العمل التفاعلية",
            "شهادات معتمدة",
          ],
          price: "يبدأ من 5,000 ريال",
          duration: "1-3 أشهر",
        },
      },
      cta: {
        title: "هل أنت مستعد لبدء رحلة التطوير؟",
        subtitle: "تواصل معنا اليوم للحصول على استشارة مجانية",
        button: "احجز استشارة مجانية",
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
        title: "Our Specialized Services",
        subtitle:
          "We offer a comprehensive range of innovative solutions to develop your business and achieve sustainable growth",
        backToHome: "Back to Home",
      },
      services: {
        consulting: {
          title: "Management Consulting",
          description: "Specialized consulting to develop business strategies and improve operational performance",
          features: [
            "Current company situation analysis",
            "Development strategy formulation",
            "Operational process improvement",
            "Change management and development",
            "Performance measurement and results",
          ],
          price: "Starting from SAR 15,000",
          duration: "3-6 months",
        },
        strategy: {
          title: "Strategic Planning",
          description: "Developing robust strategic plans to ensure sustainable growth and achieve long-term goals",
          features: [
            "Market and competitor analysis",
            "Vision and mission development",
            "Strategic objectives definition",
            "Detailed implementation plans",
            "Follow-up and results evaluation",
          ],
          price: "Starting from SAR 20,000",
          duration: "4-8 months",
        },
        digital: {
          title: "Digital Transformation",
          description:
            "Helping companies in digital transformation and implementing latest technologies to improve efficiency",
          features: [
            "Current technical situation assessment",
            "Digital transformation strategy",
            "Technical solutions implementation",
            "Team training on new technologies",
            "Ongoing support and maintenance",
          ],
          price: "Starting from SAR 25,000",
          duration: "6-12 months",
        },
        training: {
          title: "Training & Development",
          description: "Specialized training programs to develop team capabilities and enhance performance levels",
          features: [
            "Training needs analysis",
            "Training program design",
            "Practical and theoretical training",
            "Interactive workshops",
            "Certified certificates",
          ],
          price: "Starting from SAR 5,000",
          duration: "1-3 months",
        },
      },
      cta: {
        title: "Ready to Start Your Development Journey?",
        subtitle: "Contact us today for a free consultation",
        button: "Book Free Consultation",
      },
    },
  }

  const [remoteContent, setRemoteContent] = useState<any | null>(null)
  useEffect(() => {
    const bust = Date.now()
    fetch(`/api/content/services?bust=${bust}`, { cache: "no-store" as RequestCache })
      .then((r) => r.json())
      .then((d) => setRemoteContent(d.data))
      .catch(() => {})
  }, [])

  const content = (remoteContent as any) || (defaultContent as any)
  const currentContent = content[language]

  const base = [Users, Target, TrendingUp, Award]
  const items = (currentContent.services as any).items as any[] | undefined
  const arrayServices = items?.length
    ? items.map((it, idx) => ({
        icon: base[idx % base.length],
        data: it,
        gradient: [
          "from-[#4a90a4] to-[#6bb6c7]",
          "from-[#1e3a5f] to-[#4a90a4]",
          "from-[#6bb6c7] to-[#4a90a4]",
          "from-[#4a90a4] to-[#1e3a5f]",
        ][idx % 4],
      }))
    : [
        { icon: Users, data: currentContent.services.consulting, gradient: "from-[#4a90a4] to-[#6bb6c7]" },
        { icon: Target, data: currentContent.services.strategy, gradient: "from-[#1e3a5f] to-[#4a90a4]" },
        { icon: TrendingUp, data: currentContent.services.digital, gradient: "from-[#6bb6c7] to-[#4a90a4]" },
        { icon: Award, data: currentContent.services.training, gradient: "from-[#4a90a4] to-[#1e3a5f]" },
      ]

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
              <Link href="/services" className="text-primary font-medium">
                {currentContent.nav.services}
              </Link>
              <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.cases}
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
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
                <Link href="/services" className="text-primary font-medium">
                  {currentContent.nav.services}
                </Link>
                <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.cases}
                </Link>
                <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-6">
              {currentContent.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {currentContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {arrayServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="service-card-hover border-[#4a90a4]/20 bg-white relative overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right rtl:text-left">
                        <Badge className="bg-[#6bb6c7]/10 text-[#1e3a5f] border-[#4a90a4]/30">
                          {service.data.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-[#1e3a5f] mb-2">{service.data.title}</CardTitle>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {service.data.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#1e3a5f] mb-3 flex items-center">
                        <Star className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 text-[#4a90a4]" />
                        {language === "ar" ? "ما نقدمه:" : "What we offer:"}
                      </h4>
                      <ul className="space-y-2">
                        {service.data.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-[#4a90a4] mr-3 rtl:mr-0 rtl:ml-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{language === "ar" ? "السعر:" : "Price:"}</p>
                        <p className="text-lg font-bold text-[#1e3a5f]">{service.data.price}</p>
                      </div>
                      <Button
                        className={`bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white border-0 shadow-lg`}
                      >
                        {language === "ar" ? "اطلب الخدمة" : "Request Service"}
                        <ChevronRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f] via-[#4a90a4] to-[#6bb6c7] relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{currentContent.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{currentContent.cta.subtitle}</p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[#1e3a5f] hover:bg-white/90 px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {currentContent.cta.button}
                <ChevronRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
              </Button>
            </Link>
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
