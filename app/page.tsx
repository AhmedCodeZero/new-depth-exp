"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Globe, Menu, X, ChevronRight, Users, Target, TrendingUp, Award, Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react"
import Link from "next/link"

export default function DepthBusinessWebsite() {
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
        title: "عمق الخبرة لحلول الأعمال",
        subtitle: "نقدم حلولاً مبتكرة ومتخصصة لتطوير أعمالكم وتحقيق أهدافكم الاستراتيجية",
        cta: "ابدأ رحلتك معنا",
      },
      services: {
        title: "خدماتنا",
        subtitle: "نقدم مجموعة شاملة من الخدمات المصممة لتلبية احتياجات عملك",
        consulting: {
          title: "الاستشارات الإدارية",
          description: "استشارات متخصصة لتطوير استراتيجيات العمل وتحسين الأداء",
        },
        strategy: {
          title: "التخطيط الاستراتيجي",
          description: "وضع خطط استراتيجية محكمة لضمان نمو مستدام لأعمالكم",
        },
        digital: {
          title: "التحول الرقمي",
          description: "مساعدة الشركات في التحول الرقمي وتطبيق أحدث التقنيات",
        },
        training: {
          title: "التدريب والتطوير",
          description: "برامج تدريبية متخصصة لتطوير قدرات فرق العمل",
        },
      },
      cases: {
        title: "دراسات الحالة",
        subtitle: "قصص نجاح حقيقية من عملائنا",
        case1: {
          title: "تطوير استراتيجية شركة تقنية ناشئة",
          description:
            "ساعدنا شركة تقنية ناشئة في وضع استراتيجية نمو أدت إلى زيادة الإيرادات بنسبة 300% خلال عام واحد.",
          result: "زيادة الإيرادات 300%",
        },
        case2: {
          title: "التحول الرقمي لشركة تصنيع",
          description: "قمنا بقيادة عملية التحول الرقمي لشركة تصنيع كبيرة، مما أدى إلى تحسين الكفاءة بنسبة 45%.",
          result: "تحسين الكفاءة 45%",
        },
      },
      blog: {
        title: "المدونة",
        subtitle: "آخر الأخبار والمقالات في عالم الأعمال",
        post1: {
          title: "مستقبل التحول الرقمي في الشرق الأوسط",
          excerpt: "نظرة على التوجهات الحديثة في التحول الرقمي وتأثيرها على الأعمال في المنطقة...",
          date: "15 يناير 2024",
        },
        post2: {
          title: "استراتيجيات النمو للشركات الناشئة",
          excerpt: "كيف يمكن للشركات الناشئة وضع استراتيجيات نمو فعالة في السوق التنافسي...",
          date: "10 يناير 2024",
        },
      },
      contact: {
        title: "تواصل معنا",
        subtitle: "نحن هنا لمساعدتك في تحقيق أهدافك",
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال",
        info: {
          email: "info@depth-solutions.com",
          phone: "+966 11 123 4567",
          address: "الرياض، المملكة العربية السعودية",
        },
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
        title: "Depth of Experience for Business Solutions",
        subtitle:
          "We provide innovative and specialized solutions to develop your business and achieve your strategic goals",
        cta: "Start Your Journey",
      },
      services: {
        title: "Our Services",
        subtitle: "We offer a comprehensive range of services designed to meet your business needs",
        consulting: {
          title: "Management Consulting",
          description: "Specialized consulting to develop business strategies and improve performance",
        },
        strategy: {
          title: "Strategic Planning",
          description: "Developing robust strategic plans to ensure sustainable growth for your business",
        },
        digital: {
          title: "Digital Transformation",
          description: "Helping companies in digital transformation and implementing latest technologies",
        },
        training: {
          title: "Training & Development",
          description: "Specialized training programs to develop team capabilities",
        },
      },
      cases: {
        title: "Case Studies",
        subtitle: "Real success stories from our clients",
        case1: {
          title: "Tech Startup Strategy Development",
          description:
            "We helped a tech startup develop a growth strategy that led to 300% revenue increase within one year.",
          result: "300% Revenue Growth",
        },
        case2: {
          title: "Manufacturing Company Digital Transformation",
          description:
            "We led the digital transformation process for a large manufacturing company, improving efficiency by 45%.",
          result: "45% Efficiency Improvement",
        },
      },
      blog: {
        title: "Blog",
        subtitle: "Latest news and articles in the business world",
        post1: {
          title: "The Future of Digital Transformation in the Middle East",
          excerpt: "A look at modern trends in digital transformation and their impact on business in the region...",
          date: "January 15, 2024",
        },
        post2: {
          title: "Growth Strategies for Startups",
          excerpt: "How startups can develop effective growth strategies in the competitive market...",
          date: "January 10, 2024",
        },
      },
      contact: {
        title: "Contact Us",
        subtitle: "We are here to help you achieve your goals",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        info: {
          email: "info@depth-solutions.com",
          phone: "+966 11 123 4567",
          address: "Riyadh, Saudi Arabia",
        },
      },
    },
  }

  const [remoteContent, setRemoteContent] = useState<any | null>(null)
  const [blogRemoteContent, setBlogRemoteContent] = useState<any | null>(null)

  useEffect(() => {
    const bust = Date.now()
    fetch(`/api/content/home?bust=${bust}`, { cache: "no-store" as RequestCache })
      .then((r) => r.json())
      .then((d) => setRemoteContent(d.data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const bust = Date.now()
    fetch(`/api/content/blog?bust=${bust}`, { cache: "no-store" as RequestCache })
      .then((r) => r.json())
      .then((d) => setBlogRemoteContent(d.data))
      .catch(() => {})
  }, [])

  const content = (remoteContent as any) || (defaultContent as any)
  const currentContent = content[language]

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
              <img src="/images/depth-logo.png" alt="Depth Logo" className="h-12 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link href="/home" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.home}
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors">
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
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-transparent"
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
                <Link href="/home" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.home}
                </Link>
                <Link href="/services" className="text-foreground hover:text-primary transition-colors">
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

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#1e3a5f] to-[#0f1419]"
      >
        <div className="absolute inset-0">
          {/* Subtle background gradient overlay only */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a90a4]/20 to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/50 rounded-full blur-3xl scale-150"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/30 rounded-full blur-2xl scale-125"></div>
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110"></div>
                <img
                  src="/images/depth-logo.png"
                  alt="Depth Logo"
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl filter brightness-125 contrast-125"
                />
              </div>
            </div>

            <div className="text-center lg:text-right order-1 lg:order-2" dir={language === "ar" ? "rtl" : "ltr"}>
              <div className="glass-effect-hero rounded-3xl p-8 lg:p-12 backdrop-blur-xl border border-white/30 shadow-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                  <span className="text-white drop-shadow-2xl">{currentContent.hero.title}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed font-light drop-shadow-md">
                  {currentContent.hero.subtitle}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">15+</div>
                    <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                      {language === "ar" ? "سنوات خبرة" : "Years Experience"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">200+</div>
                    <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                      {language === "ar" ? "مشروع ناجح" : "Successful Projects"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">98%</div>
                    <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                      {language === "ar" ? "رضا العملاء" : "Client Satisfaction"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
                    <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                      {language === "ar" ? "عميل سعيد" : "Happy Clients"}
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA with multiple buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      {currentContent.hero.cta}
                      <ChevronRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-transparent"
                    >
                      {language === "ar" ? "تعرف علينا أكثر" : "Learn More"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
              {currentContent.services.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{currentContent.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {((currentContent.services as any).items || [
              currentContent.services.consulting,
              currentContent.services.strategy,
              currentContent.services.digital,
              currentContent.services.training,
            ]).map((svc: any, idx: number) => (
              <Card key={idx} className="text-center service-card-hover border-[#4a90a4]/20 bg-gradient-to-br from-white to-blue-50/50 relative overflow-hidden">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-[#1e3a5f]">{svc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{svc.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 bg-gradient-to-br from-[#1e3a5f]/5 via-[#4a90a4]/5 to-[#6bb6c7]/5 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
              {currentContent.cases.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{currentContent.cases.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {((currentContent.cases as any).items || [
              { ...currentContent.cases.case1 },
              { ...currentContent.cases.case2 },
            ]).map((cs: any, idx: number) => (
              <Card key={idx} className="overflow-hidden card-glow border-[#4a90a4]/20 bg-white relative">
                <div className={`h-48 bg-gradient-to-br ${idx % 2 ? 'from-[#6bb6c7]/20 to-[#4a90a4]/30' : 'from-[#4a90a4]/20 to-[#6bb6c7]/30'} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] text-white border-0">{cs.result}</Badge>
                  </div>
                  <CardTitle className="text-xl text-[#1e3a5f]">{cs.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{cs.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
              {currentContent.blog.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{currentContent.blog.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(((blogRemoteContent || defaultContent).ar ? blogRemoteContent : null) ? (blogRemoteContent as any)[language].posts : (currentContent.blog.posts || [])).slice(0,2).map((post: any, idx: number) => (
              <Card key={post.id || idx} className="card-glow border-[#4a90a4]/20 bg-white overflow-hidden relative">
                <div className={`h-48 bg-gradient-to-br ${idx % 2 ? 'from-[#4a90a4]/10 to-[#6bb6c7]/20' : 'from-[#1e3a5f]/10 to-[#4a90a4]/20'} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                <CardHeader>
                  <div className="text-sm text-[#4a90a4] font-medium mb-2">{post.date}</div>
                  <CardTitle className="text-xl text-[#1e3a5f]">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{post.excerpt}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-[#1e3a5f]/5 via-[#4a90a4]/5 to-[#6bb6c7]/5 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
              {currentContent.contact.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{currentContent.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="card-glow border-[#4a90a4]/20 bg-white relative overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]"></div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e3a5f] flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3 text-[#4a90a4]" />
                  {currentContent.contact.title}
                </CardTitle>
                <p className="text-gray-600">{language === "ar" ? "املأ النموذج وسنتواصل معك في أقرب وقت ممكن" : "Fill out the form and we will contact you as soon as possible"}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                    </label>
                    <Input
                      placeholder={language === "ar" ? "الاسم الكامل" : "Full Name"}
                      className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                      {language === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                    </label>
                    <Input
                      type="email"
                      placeholder={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                      className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                      {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <Input
                      placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
                      className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                      {language === "ar" ? "اسم الشركة" : "Company Name"}
                    </label>
                    <Input
                      placeholder={language === "ar" ? "اسم الشركة" : "Company Name"}
                      className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                    {language === "ar" ? "الخدمة المطلوبة" : "Required Service"}
                  </label>
                  <select className="w-full px-3 py-2 border border-[#4a90a4]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]">
                    <option value="">{language === "ar" ? "الخدمة المطلوبة" : "Required Service"}</option>
                    <option value="consulting">{language === "ar" ? "الاستشارات الإدارية" : "Management Consulting"}</option>
                    <option value="strategy">{language === "ar" ? "التخطيط الاستراتيجي" : "Strategic Planning"}</option>
                    <option value="digital">{language === "ar" ? "التحول الرقمي" : "Digital Transformation"}</option>
                    <option value="training">{language === "ar" ? "التدريب والتطوير" : "Training & Development"}</option>
                    <option value="other">{language === "ar" ? "أخرى" : "Other"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                    {language === "ar" ? "الرسالة" : "Message"} *
                  </label>
                  <Textarea
                    placeholder={language === "ar" ? "الرسالة" : "Message"}
                    rows={5}
                    className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                    required
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white border-0 shadow-lg">
                  <Send className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start space-x-10 rtl:space-x-reverse p-6 bg-white rounded-2xl card-glow border border-[#4a90a4]/20 relative">
                <div className="contact-icon-container bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mail className="contact-icon text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-[#1e3a5f]">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </h3>
                  <p className="text-gray-600">{currentContent.contact.info.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-10 rtl:space-x-reverse p-6 bg-white rounded-2xl card-glow border border-[#4a90a4]/20 relative">
                <div className="contact-icon-container bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="contact-icon text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-[#1e3a5f]">
                    {language === "ar" ? "الهاتف" : "Phone"}
                  </h3>
                  <p className="text-gray-600">{currentContent.contact.info.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-10 rtl:space-x-reverse p-6 bg-white rounded-2xl card-glow border border-[#4a90a4]/20 relative">
                <div className="contact-icon-container bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="contact-icon text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-[#1e3a5f]">
                    {language === "ar" ? "العنوان" : "Address"}
                  </h3>
                  <p className="text-gray-600">{currentContent.contact.info.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1e3a5f] text-white py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src="/images/depth-logo.png"
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
