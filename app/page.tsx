"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Globe, Menu, X, ChevronRight, Users, Target, TrendingUp, Award, Mail, Phone, MapPin, MessageSquare, Send, Eye, Heart, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ContentData {
  ar: {
    nav: {
      home: string
      services: string
      cases: string
      blog: string
      contact: string
    }
    hero: {
      title: string
      subtitle: string
      cta: string
      vision?: string
      mission?: string
      values?: { [key: string]: string }
      objectives?: string[]
    }
    services: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        imageUrl: string
        features?: string[]
      }>
    }
    cases: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        result: string
        imageUrl: string
        features?: string[]
      }>
    }
    blog: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        excerpt: string
        date: string
        imageUrl: string
        features?: string[]
      }>
    }
    contact: {
      title: string
      subtitle: string
      name: string
      email: string
      phone: string
      company: string
      service: string
      message: string
      send: string
      info: {
        email: string
        phone: string
        address: string
      }
    }
  }
  en: {
    nav: {
      home: string
      services: string
      cases: string
      blog: string
      contact: string
    }
    hero: {
      title: string
      subtitle: string
      cta: string
      vision?: string
      mission?: string
      values?: { [key: string]: string }
      objectives?: string[]
    }
    services: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        imageUrl: string
        features?: string[]
      }>
    }
    cases: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        result: string
        imageUrl: string
        features?: string[]
      }>
    }
    blog: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        excerpt: string
        date: string
        imageUrl: string
        features?: string[]
      }>
    }
    contact: {
      title: string
      subtitle: string
      name: string
      email: string
      phone: string
      company: string
      service: string
      message: string
      send: string
      info: {
        email: string
        phone: string
        address: string
      }
    }
  }
}

// Default fallback content
const defaultContent: ContentData = {
  ar: {
    nav: { home: "الرئيسية", services: "الخدمات", cases: "دراسات الحالة", blog: "المدونة", contact: "اتصل بنا" },
    hero: { title: "عمق الخبرة لحلول الأعمال", subtitle: "نقدم حلولاً مبتكرة ومتخصصة لتطوير أعمالكم وتحقيق أهدافكم الاستراتيجية", cta: "ابدأ رحلتك معنا" },
    services: { title: "خدماتنا", subtitle: "نقدم مجموعة شاملة من الخدمات المصممة لتلبية احتياجات عملك", items: [] },
    cases: { title: "دراسات الحالة", subtitle: "قصص نجاح عملائنا تروي كيف ساعدناهم في تحقيق أهدافهم", items: [] },
    blog: { title: "أحدث المقالات", subtitle: "أحدث الأفكار والاتجاهات في عالم الأعمال", items: [] },
    contact: { 
      title: "تواصل معنا", 
      subtitle: "نحن هنا لمساعدتك", 
      name: "الاسم", 
      email: "البريد الإلكتروني", 
      phone: "رقم الهاتف", 
      company: "الشركة", 
      service: "الخدمة المطلوبة", 
      message: "الرسالة", 
      send: "إرسال",
      info: { email: "info@depth.com", phone: "+966123456789", address: "الرياض، المملكة العربية السعودية" }
    }
  },
  en: {
    nav: { home: "Home", services: "Services", cases: "Case Studies", blog: "Blog", contact: "Contact" },
    hero: { title: "Depth of Experience for Business Solutions", subtitle: "We provide innovative and specialized solutions to develop your business and achieve your strategic goals", cta: "Start Your Journey" },
    services: { title: "Our Services", subtitle: "We offer a comprehensive range of services designed to meet your business needs", items: [] },
    cases: { title: "Case Studies", subtitle: "Success stories of our clients telling how we helped them achieve their goals", items: [] },
    blog: { title: "Latest Articles", subtitle: "Latest ideas and trends in the business world", items: [] },
    contact: { 
      title: "Contact Us", 
      subtitle: "We are here to help you", 
      name: "Name", 
      email: "Email", 
      phone: "Phone", 
      company: "Company", 
      service: "Required Service", 
      message: "Message", 
      send: "Send",
      info: { email: "info@depth.com", phone: "+966123456789", address: "Riyadh, Saudi Arabia" }
    }
  }
}

export default function DepthBusinessWebsite() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Load content from JSON file
  useEffect(() => {
    const loadContent = async () => {
      console.log('Starting to load content...')
      setLoading(true)
      
      try {
        console.log('Fetching from /api/content/home...')
        const response = await fetch('/api/content/home')
        console.log('Response status:', response.status)
        
        if (response.ok) {
          const result = await response.json()
          console.log('Content loaded successfully:', result)
          setContent(result.data)
        } else {
          console.error('Failed to load content:', response.status, response.statusText)
          console.log('Using fallback content')
          setContent(defaultContent)
        }
      } catch (error) {
        console.error('Error loading content:', error)
        console.log('Using fallback content due to error')
        setContent(defaultContent)
      } finally {
        console.log('Setting loading to false')
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4a90a4] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">فشل في تحميل المحتوى. سيتم استخدام المحتوى الافتراضي.</p>
        </div>
      </div>
    )
  }

  const currentContent = content?.[language] || {
    nav: {
      home: language === "ar" ? "الرئيسية" : "Home",
      services: language === "ar" ? "الخدمات" : "Services",
      cases: language === "ar" ? "دراسات الحالة" : "Case Studies",
      blog: language === "ar" ? "المدونة" : "Blog",
      contact: language === "ar" ? "اتصل بنا" : "Contact"
    },
    hero: {
      title: language === "ar" ? "عمق الخبرة لحلول الأعمال" : "Depth of Experience for Business Solutions",
      subtitle: language === "ar" ? "نقدم حلولاً مبتكرة ومتخصصة" : "We provide innovative solutions",
      cta: language === "ar" ? "ابدأ رحلتك معنا" : "Start Your Journey"
    },
    services: {
      title: language === "ar" ? "خدماتنا" : "Our Services",
      subtitle: language === "ar" ? "نقدم مجموعة شاملة من الخدمات" : "We offer comprehensive services",
      items: []
    },
    cases: {
      title: language === "ar" ? "دراسات الحالة" : "Case Studies",
      subtitle: language === "ar" ? "قصص نجاح حقيقية" : "Real success stories",
      items: []
    },
    blog: {
      title: language === "ar" ? "المدونة" : "Blog",
      subtitle: language === "ar" ? "آخر الأخبار والمقالات" : "Latest news and articles",
      items: []
    },
    contact: {
      title: language === "ar" ? "تواصل معنا" : "Contact Us",
      subtitle: language === "ar" ? "نحن هنا لمساعدتك" : "We are here to help",
      info: {
        email: "info@depth-solutions.com",
        phone: "+966 11 123 4567",
        address: language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"
      }
    }
  }

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
              <img src="/images/depth-logo-horizontal.png" alt="Depth Logo" className="h-12 w-auto" />
            </div>

                         {/* Desktop Navigation */}
             <nav className="hidden md:flex items-center gap-8">
               <Link href="/" className="text-foreground hover:text-primary transition-colors">
                 {currentContent?.nav?.home}
               </Link>
               <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                 {currentContent?.nav?.services}
               </Link>
               <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                 {currentContent?.nav?.cases}
               </Link>
               <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                 {currentContent?.nav?.blog}
               </Link>
               <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                 {currentContent?.nav?.contact}
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
                   {currentContent?.nav?.home}
                 </Link>
                 <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                   {currentContent?.nav?.services}
                 </Link>
                 <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                   {currentContent?.nav?.cases}
                 </Link>
                 <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                   {currentContent?.nav?.blog}
                 </Link>
                 <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                   {currentContent?.nav?.contact}
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
                  src="/images/depth-logo-mainl.png"
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

      {/* Vision, Mission, Values Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision and Mission */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <Card className="border-[#4a90a4]/20 bg-gradient-to-br from-white to-blue-50/50 relative overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]"></div>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-[#1e3a5f]">
                    {language === "ar" ? "🎯 الرؤية" : "🎯 Vision"}
                  </CardTitle>
                </div>
                <CardDescription className="text-lg text-gray-700 leading-relaxed">
                  {currentContent.hero?.vision || (language === "ar" ? "أن نكون المرجع الأول في حلول الأعمال المتكاملة التي تصنع التميز والاستدامة." : "To be the first reference in integrated business solutions that create excellence and sustainability.")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#4a90a4]/20 bg-gradient-to-br from-white to-blue-50/50 relative overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4]"></div>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6bb6c7] to-[#4a90a4] rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-[#1e3a5f]">
                    {language === "ar" ? "📝 الرسالة" : "📝 Mission"}
                  </CardTitle>
                </div>
                <CardDescription className="text-lg text-gray-700 leading-relaxed">
                  {currentContent.hero?.mission || (language === "ar" ? "نبتكر حلول أعمال متكاملة تمكّن المنظمات من النمو وتحقيق الاستدامة." : "We innovate integrated business solutions that enable organizations to grow and achieve sustainability.")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
                {language === "ar" ? "🌟 القيم المؤسسية" : "🌟 Our Values"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentContent.hero?.values ? Object.entries(currentContent.hero.values).map(([key, value], idx) => (
                <Card key={key} className="border-[#4a90a4]/20 bg-white relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 bg-gradient-to-br ${['from-[#4a90a4] to-[#6bb6c7]', 'from-[#1e3a5f] to-[#4a90a4]', 'from-[#6bb6c7] to-[#4a90a4]'][idx % 3]} rounded-lg flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0`}>
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardDescription className="text-base text-gray-700 font-medium">
                          {value as string}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )) : (
                // Default values if not provided
                [
                  language === "ar" ? "الابتكار: تقديم حلول جديدة وفعالة" : "Innovation: Providing new and effective solutions",
                  language === "ar" ? "التميز: الالتزام بأعلى معايير الجودة" : "Excellence: Commitment to the highest quality standards",
                  language === "ar" ? "الاستدامة: التركيز على الأثر طويل المدى" : "Sustainability: Focus on long-term impact",
                  language === "ar" ? "الموثوقية: بناء علاقات قائمة على الثقة والمصداقية" : "Reliability: Building relationships based on trust and credibility",
                  language === "ar" ? "الشراكة: التعاون لتحقيق النجاح المشترك" : "Partnership: Collaboration to achieve mutual success"
                ].map((value, idx) => (
                  <Card key={idx} className="border-[#4a90a4]/20 bg-white relative overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start">
                        <div className={`w-10 h-10 bg-gradient-to-br ${['from-[#4a90a4] to-[#6bb6c7]', 'from-[#1e3a5f] to-[#4a90a4]', 'from-[#6bb6c7] to-[#4a90a4]'][idx % 3]} rounded-lg flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0`}>
                          <Star className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardDescription className="text-base text-gray-700 font-medium">
                            {value}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Strategic Objectives */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
                {language === "ar" ? "🎯 الأهداف الاستراتيجية" : "🎯 Strategic Objectives"}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-4">
                {currentContent.hero?.objectives ? currentContent.hero.objectives.map((objective: string, idx: number) => (
                  <div key={idx} className="flex items-start p-4 bg-white rounded-lg border border-[#4a90a4]/20">
                    <CheckCircle className="h-6 w-6 text-[#4a90a4] mr-3 rtl:mr-0 rtl:ml-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">{objective}</p>
                  </div>
                )) : (
                  // Default objectives if not provided
                  [
                    language === "ar" ? "الريادة في تقديم حلول أعمال متكاملة ومبتكرة" : "Leadership in providing integrated and innovative business solutions",
                    language === "ar" ? "تمكين المنظمات من تحقيق النمو والتميز المؤسسي" : "Enabling organizations to achieve growth and institutional excellence",
                    language === "ar" ? "إثراء المعرفة عبر البحث والتطوير وصناعة الدراسات التطبيقية" : "Enriching knowledge through research, development and creating applied studies",
                    language === "ar" ? "صناعة منصات معرفية للتأثير وبناء الشراكات" : "Creating knowledge platforms for influence and building partnerships",
                    language === "ar" ? "تعزيز الاستدامة من خلال الابتكار والكفاءة التشغيلية" : "Enhancing sustainability through innovation and operational efficiency"
                  ].map((objective, idx) => (
                    <div key={idx} className="flex items-start p-4 bg-white rounded-lg border border-[#4a90a4]/20">
                      <CheckCircle className="h-6 w-6 text-[#4a90a4] mr-3 rtl:mr-0 rtl:ml-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{objective}</p>
                    </div>
                  ))
                )}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(currentContent.services.items || []).slice(0, 6).map((svc: any, idx: number) => {
              const icons = [Users, Target, TrendingUp, Award, Users, Target];
              const IconComponent = icons[idx % icons.length];
              return (
                <Card key={idx} className="text-center service-card-hover border-[#4a90a4]/20 bg-gradient-to-br from-white to-blue-50/50 relative overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${['from-[#4a90a4] to-[#6bb6c7]', 'from-[#1e3a5f] to-[#4a90a4]', 'from-[#6bb6c7] to-[#4a90a4]'][idx % 3]}`}></div>
                  <CardHeader>
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${['from-[#4a90a4] to-[#6bb6c7]', 'from-[#1e3a5f] to-[#4a90a4]', 'from-[#6bb6c7] to-[#4a90a4]'][idx % 3]} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-[#1e3a5f] mb-2">{svc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 mb-4">{svc.description}</CardDescription>
                    {svc.features && svc.features.length > 0 && (
                      <div className="text-left">
                        <ul className="space-y-2">
                          {svc.features.slice(0, 3).map((feature: string, featureIdx: number) => (
                            <li key={featureIdx} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-[#4a90a4] mr-2 rtl:mr-0 rtl:ml-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {svc.features.length > 3 && (
                          <p className="text-sm text-[#4a90a4] mt-2">
                            {language === "ar" ? `+${svc.features.length - 3} خدمات أخرى` : `+${svc.features.length - 3} more services`}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white px-8 py-3 text-lg rounded-full shadow-lg">
                {language === "ar" ? "عرض جميع الخدمات" : "View All Services"}
                <ChevronRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
              </Button>
            </Link>
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
             {(currentContent.cases.items || []).map((cs: any, idx: number) => (
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
             {(currentContent.blog.items || []).slice(0,2).map((post: any, idx: number) => (
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
               <form onSubmit={handleSubmit}>
                 <CardContent className="space-y-6">
                   {/* Status Messages */}
                   {submitStatus === 'success' && (
                     <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                       <p className="text-green-800 text-center">
                         {language === "ar" ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." : "Your message has been sent successfully! We'll contact you soon."}
                       </p>
                     </div>
                   )}
                   {submitStatus === 'error' && (
                     <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                       <p className="text-red-800 text-center">
                         {language === "ar" ? "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى." : "An error occurred while sending your message. Please try again."}
                       </p>
                     </div>
                   )}

                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                         {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                       </label>
                       <Input
                         name="name"
                         value={formData.name}
                         onChange={handleInputChange}
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
                         name="email"
                         type="email"
                         value={formData.email}
                         onChange={handleInputChange}
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
                         name="phone"
                         value={formData.phone}
                         onChange={handleInputChange}
                         placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
                         className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                         {language === "ar" ? "اسم الشركة" : "Company Name"}
                       </label>
                       <Input
                         name="company"
                         value={formData.company}
                         onChange={handleInputChange}
                         placeholder={language === "ar" ? "اسم الشركة" : "Company Name"}
                         className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                       />
                     </div>
                   </div>

                   <div>
                     <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                       {language === "ar" ? "الخدمة المطلوبة" : "Required Service"}
                     </label>
                     <select 
                       name="service"
                       value={formData.service}
                       onChange={handleInputChange}
                       className="w-full px-3 py-2 border border-[#4a90a4]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]"
                     >
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
                       name="message"
                       value={formData.message}
                       onChange={handleInputChange}
                       placeholder={language === "ar" ? "الرسالة" : "Message"}
                       rows={5}
                       className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                       required
                     />
                   </div>

                   <Button 
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white border-0 shadow-lg disabled:opacity-50"
                   >
                     <Send className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                     {isSubmitting 
                       ? (language === "ar" ? "جاري الإرسال..." : "Sending...")
                       : (language === "ar" ? "إرسال الرسالة" : "Send Message")
                     }
                   </Button>
                 </CardContent>
               </form>
             </Card>

            {/* Contact Information */}
            <div className="space-y-8">
                             <div className="flex items-start gap-6 p-6 bg-white rounded-2xl card-glow border border-[#4a90a4]/20 relative">
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

                             <div className="flex items-start gap-6 p-6 bg-white rounded-2xl card-glow border border-[#4a90a4]/20 relative">
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

                             <div className="flex items-start gap-6 p-6 bg-white rounded-2xl card-glow border border-[#4a90a4]/20 relative">
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
                  src="/images/depth-logo-horizontal.png"
                  alt="Depth Logo"
                  className="h-16 w-auto mx-auto mb-4 brightness-0 invert"
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
