"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  Users,
  Target,
  Award,
  Building,
  Calendar,
  BarChart3,
  Quote,
} from "lucide-react"
import Link from "next/link"

export default function CaseStudiesPage() {
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
        title: "دراسات الحالة",
        subtitle: "قصص نجاح حقيقية وإنجازات ملموسة حققناها مع عملائنا",
        backToHome: "العودة للرئيسية",
      },
      cases: {
        case1: {
          title: "تطوير استراتيجية شركة تقنية ناشئة",
          client: "شركة تك إنوفيشن",
          industry: "التكنولوجيا",
          duration: "12 شهر",
          challenge: "التحدي",
          challengeText:
            "كانت الشركة تواجه تحديات في النمو وتحديد الاتجاه الاستراتيجي الصحيح في السوق التنافسي للتكنولوجيا.",
          solution: "الحل",
          solutionText:
            "قمنا بتطوير استراتيجية شاملة تشمل تحليل السوق، تحديد الجمهور المستهدف، ووضع خطة نمو متدرجة مع التركيز على الابتكار.",
          results: "النتائج",
          metrics: [
            { label: "زيادة الإيرادات", value: "300%" },
            { label: "نمو قاعدة العملاء", value: "250%" },
            { label: "تحسين الكفاءة", value: "40%" },
            { label: "توفير التكاليف", value: "25%" },
          ],
          testimonial: "فريق عمق ساعدنا في تحويل رؤيتنا إلى واقع ملموس. النتائج تجاوزت توقعاتنا بكثير.",
          clientName: "أحمد محمد",
          clientPosition: "الرئيس التنفيذي",
        },
        case2: {
          title: "التحول الرقمي لشركة تصنيع كبيرة",
          client: "مجموعة الصناعات المتقدمة",
          industry: "التصنيع",
          duration: "18 شهر",
          challenge: "التحدي",
          challengeText:
            "شركة تصنيع تقليدية تحتاج إلى تحديث عملياتها وتطبيق التقنيات الحديثة لمواكبة التطورات في السوق.",
          solution: "الحل",
          solutionText:
            "نفذنا برنامج تحول رقمي شامل يشمل أتمتة العمليات، تطبيق أنظمة إدارة متقدمة، وتدريب الفرق على التقنيات الجديدة.",
          results: "النتائج",
          metrics: [
            { label: "تحسين الكفاءة", value: "45%" },
            { label: "تقليل الأخطاء", value: "60%" },
            { label: "توفير الوقت", value: "35%" },
            { label: "زيادة الإنتاجية", value: "50%" },
          ],
          testimonial:
            "التحول الرقمي الذي قاده فريق عمق غير مجرى أعمالنا بالكامل. أصبحنا أكثر كفاءة وقدرة على المنافسة.",
          clientName: "سارة العلي",
          clientPosition: "مديرة العمليات",
        },
        case3: {
          title: "إعادة هيكلة شركة خدمات مالية",
          client: "شركة الخدمات المالية المتميزة",
          industry: "الخدمات المالية",
          duration: "10 أشهر",
          challenge: "التحدي",
          challengeText:
            "شركة خدمات مالية تواجه تحديات في الهيكل التنظيمي وتحتاج إلى تحسين العمليات وزيادة رضا العملاء.",
          solution: "الحل",
          solutionText:
            "أعدنا تصميم الهيكل التنظيمي، طورنا عمليات جديدة، ونفذنا برامج تدريبية شاملة لتحسين خدمة العملاء.",
          results: "النتائج",
          metrics: [
            { label: "تحسين رضا العملاء", value: "80%" },
            { label: "زيادة الإيرادات", value: "35%" },
            { label: "تقليل وقت المعالجة", value: "50%" },
            { label: "تحسين الأداء", value: "65%" },
          ],
          testimonial: "الخبرة والاحترافية التي قدمها فريق عمق ساعدتنا في تحقيق نقلة نوعية في أدائنا وخدماتنا.",
          clientName: "محمد الشمري",
          clientPosition: "المدير العام",
        },
      },
      cta: {
        title: "هل تريد تحقيق نتائج مماثلة؟",
        subtitle: "دعنا نساعدك في كتابة قصة نجاحك القادمة",
        button: "ابدأ مشروعك معنا",
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
        title: "Case Studies",
        subtitle: "Real success stories and tangible achievements we've accomplished with our clients",
        backToHome: "Back to Home",
      },
      cases: {
        case1: {
          title: "Tech Startup Strategy Development",
          client: "Tech Innovation Company",
          industry: "Technology",
          duration: "12 months",
          challenge: "Challenge",
          challengeText:
            "The company faced growth challenges and needed to determine the right strategic direction in the competitive technology market.",
          solution: "Solution",
          solutionText:
            "We developed a comprehensive strategy including market analysis, target audience identification, and a gradual growth plan focused on innovation.",
          results: "Results",
          metrics: [
            { label: "Revenue Growth", value: "300%" },
            { label: "Customer Base Growth", value: "250%" },
            { label: "Efficiency Improvement", value: "40%" },
            { label: "Cost Savings", value: "25%" },
          ],
          testimonial:
            "The Depth team helped us turn our vision into tangible reality. The results far exceeded our expectations.",
          clientName: "Ahmed Mohammed",
          clientPosition: "CEO",
        },
        case2: {
          title: "Digital Transformation for Large Manufacturing Company",
          client: "Advanced Industries Group",
          industry: "Manufacturing",
          duration: "18 months",
          challenge: "Challenge",
          challengeText:
            "A traditional manufacturing company needed to modernize its operations and implement modern technologies to keep up with market developments.",
          solution: "Solution",
          solutionText:
            "We implemented a comprehensive digital transformation program including process automation, advanced management systems, and team training on new technologies.",
          results: "Results",
          metrics: [
            { label: "Efficiency Improvement", value: "45%" },
            { label: "Error Reduction", value: "60%" },
            { label: "Time Savings", value: "35%" },
            { label: "Productivity Increase", value: "50%" },
          ],
          testimonial:
            "The digital transformation led by the Depth team completely changed our business. We became more efficient and competitive.",
          clientName: "Sarah Al-Ali",
          clientPosition: "Operations Manager",
        },
        case3: {
          title: "Financial Services Company Restructuring",
          client: "Distinguished Financial Services Company",
          industry: "Financial Services",
          duration: "10 months",
          challenge: "Challenge",
          challengeText:
            "A financial services company facing organizational structure challenges and needing to improve processes and increase customer satisfaction.",
          solution: "Solution",
          solutionText:
            "We redesigned the organizational structure, developed new processes, and implemented comprehensive training programs to improve customer service.",
          results: "Results",
          metrics: [
            { label: "Customer Satisfaction", value: "80%" },
            { label: "Revenue Increase", value: "35%" },
            { label: "Processing Time Reduction", value: "50%" },
            { label: "Performance Improvement", value: "65%" },
          ],
          testimonial:
            "The expertise and professionalism provided by the Depth team helped us achieve a qualitative leap in our performance and services.",
          clientName: "Mohammed Al-Shamri",
          clientPosition: "General Manager",
        },
      },
      cta: {
        title: "Want to Achieve Similar Results?",
        subtitle: "Let us help you write your next success story",
        button: "Start Your Project With Us",
      },
    },
  }

  const [remoteContent, setRemoteContent] = useState<any | null>(null)
  useEffect(() => {
    const bust = Date.now()
    fetch(`/api/content/cases?bust=${bust}`, { cache: "no-store" as RequestCache })
      .then((r) => r.json())
      .then((d) => setRemoteContent(d.data))
      .catch(() => {})
  }, [])

  const content = (remoteContent as any) || (defaultContent as any)
  const currentContent = content[language]

  const defaultCases = [
    { ...currentContent.cases.case1 },
    { ...currentContent.cases.case2 },
    { ...currentContent.cases.case3 },
  ]
  const items = (currentContent.cases as any).items as any[] | undefined
  const cases = (items?.length ? items : defaultCases).map((c, idx) => ({
    ...c,
    icon: [TrendingUp, Building, Target][idx % 3],
    gradient: [
      "from-[#4a90a4] to-[#6bb6c7]",
      "from-[#1e3a5f] to-[#4a90a4]",
      "from-[#6bb6c7] to-[#4a90a4]",
    ][idx % 3],
    bgGradient: [
      "from-[#4a90a4]/10 to-[#6bb6c7]/20",
      "from-[#1e3a5f]/10 to-[#4a90a4]/20",
      "from-[#6bb6c7]/10 to-[#4a90a4]/20",
    ][idx % 3],
  }))

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
                <img src="/images/depth-logo.png" alt="Depth Logo" className="h-12 w-auto cursor-pointer" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.home}
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.services}
              </Link>
              <Link href="/cases" className="text-primary font-medium">
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
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.home}
                </Link>
                <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.services}
                </Link>
                <Link href="/cases" className="text-primary font-medium">
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

      {/* Case Studies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {cases.map((caseStudy, index) => {
              const IconComponent = caseStudy.icon
              return (
                <div key={index} className="max-w-6xl mx-auto">
                  <Card className="card-glow border-[#4a90a4]/20 bg-white relative overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${caseStudy.gradient}`}></div>
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${caseStudy.bgGradient} rounded-full blur-3xl opacity-30 -translate-y-32 translate-x-32`}
                    ></div>

                    <CardHeader className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-br ${caseStudy.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                            >
                              <IconComponent className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl lg:text-3xl text-[#1e3a5f] mb-2">
                                {caseStudy.title}
                              </CardTitle>
                              <div className="flex flex-wrap gap-2">
                                <Badge className="bg-[#4a90a4]/10 text-[#1e3a5f] border-[#4a90a4]/30">
                                  <Building className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                                  {caseStudy.client}
                                </Badge>
                                <Badge className="bg-[#6bb6c7]/10 text-[#1e3a5f] border-[#6bb6c7]/30">
                                  {caseStudy.industry}
                                </Badge>
                                <Badge className="bg-[#1e3a5f]/10 text-[#1e3a5f] border-[#1e3a5f]/30">
                                  <Calendar className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                                  {caseStudy.duration}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-8">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold text-[#1e3a5f] text-lg mb-3 flex items-center">
                              <Target className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#4a90a4]" />
                              {caseStudy.challenge}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">{caseStudy.challengeText}</p>
                          </div>

                          <div>
                            <h4 className="font-bold text-[#1e3a5f] text-lg mb-3 flex items-center">
                              <Award className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#4a90a4]" />
                              {caseStudy.solution}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">{caseStudy.solutionText}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-[#1e3a5f] text-lg mb-4 flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#4a90a4]" />
                            {caseStudy.results}
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {caseStudy.metrics.map((metric, metricIndex) => (
                              <div
                                key={metricIndex}
                                className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl border border-gray-100"
                              >
                                <div
                                  className={`text-3xl font-bold bg-gradient-to-r ${caseStudy.gradient} bg-clip-text text-transparent mb-1`}
                                >
                                  {metric.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div
                        className={`bg-gradient-to-br ${caseStudy.bgGradient} rounded-2xl p-6 border border-[#4a90a4]/20`}
                      >
                        <div className="flex items-start gap-4">
                          <Quote className="h-8 w-8 text-[#4a90a4] flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                              "{caseStudy.testimonial}"
                            </p>
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 bg-gradient-to-br ${caseStudy.gradient} rounded-full flex items-center justify-center`}
                              >
                                <Users className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-[#1e3a5f]">{caseStudy.clientName}</div>
                                <div className="text-sm text-gray-600">{caseStudy.clientPosition}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
