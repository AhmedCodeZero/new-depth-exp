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
    nav: { home: "الرئيسية", services: "الخدمات", cases: "عملاؤنا", blog: "المدونة", contact: "اتصل بنا" },
    hero: { title: "عمق الخبرة لحلول الأعمال", subtitle: "نقدم حلولاً مبتكرة ومتخصصة لتطوير أعمالكم وتحقيق أهدافكم الاستراتيجية", cta: "ابدأ رحلتك معنا" },
    services: { title: "خدماتنا", subtitle: "نقدم مجموعة شاملة من الخدمات المصممة لتلبية احتياجات عملك", items: [] },
    cases: { title: "عملاؤنا", subtitle: "قصص نجاح عملائنا تروي كيف ساعدناهم في تحقيق أهدافهم", items: [] },
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
          console.log('Content data:', result.data)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1c] via-[#1e3a5f] to-[#0f1419]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4a90a4] mx-auto"></div>
          <p className="mt-4 text-lg text-white">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1c] via-[#1e3a5f] to-[#0f1419]">
        <div className="text-center">
          <p className="text-lg text-red-400">فشل في تحميل المحتوى. سيتم استخدام المحتوى الافتراضي.</p>
        </div>
      </div>
    )
  }

  const currentContent = content?.[language] || defaultContent[language]
  
  // Debug logging
  console.log('Current content:', currentContent)
  console.log('Content loaded:', !!content)
  console.log('Language:', language)

  return (
    <div
      className={`min-h-screen ${language === "ar" ? "font-arabic" : "font-sans"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 border-b border-gray-200/30 shadow-lg">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="/images/depth-logo-horizontal.png" alt="Depth Logo" className="relative h-16 w-auto transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-2 py-2 shadow-lg">
              <Link href="/" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.home}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/about" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'من نحن' : 'About Us'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/services" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.services}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/cases" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.cases}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/blog" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.blog}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/contact" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.contact}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 border-[#4a90a4]/40 hover:from-[#4a90a4]/20 hover:to-[#6bb6c7]/20 hover:border-[#4a90a4]/60 transition-all duration-300 hover:scale-105 rounded-full px-4 py-2 font-medium text-[#1e3a5f] hover:text-[#4a90a4] shadow-md hover:shadow-lg"
              >
                <Globe className="h-4 w-4" />
                <span className="font-semibold">{language === "ar" ? "EN" : "عربي"}</span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover:bg-[#4a90a4]/10 transition-all duration-300 rounded-full p-3 hover:shadow-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-[#1e3a5f]" /> : <Menu className="h-5 w-5 text-[#1e3a5f]" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-200/30 bg-white/95 backdrop-blur-sm rounded-b-3xl shadow-xl">
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="px-6 py-4 text-gray-800 hover:text-[#1e3a5f] font-semibold hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 transition-all duration-300 rounded-full mx-4 hover:shadow-md">
                  {currentContent?.nav?.home}
                </Link>
                <Link href="/about" className="px-6 py-4 text-gray-800 hover:text-[#1e3a5f] font-semibold hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 transition-all duration-300 rounded-full mx-4 hover:shadow-md">
                  {language === 'ar' ? 'من نحن' : 'About Us'}
                </Link>
                <Link href="/services" className="px-6 py-4 text-gray-800 hover:text-[#1e3a5f] font-semibold hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 transition-all duration-300 rounded-full mx-4 hover:shadow-md">
                  {currentContent?.nav?.services}
                </Link>
                <Link href="/cases" className="px-6 py-4 text-gray-800 hover:text-[#1e3a5f] font-semibold hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 transition-all duration-300 rounded-full mx-4 hover:shadow-md">
                  {currentContent?.nav?.cases}
                </Link>
                <Link href="/blog" className="px-6 py-4 text-gray-800 hover:text-[#1e3a5f] font-semibold hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 transition-all duration-300 rounded-full mx-4 hover:shadow-md">
                  {currentContent?.nav?.blog}
                </Link>
                <Link href="/contact" className="px-6 py-4 text-gray-800 hover:text-[#1e3a5f] font-semibold hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 transition-all duration-300 rounded-full mx-4 hover:shadow-md">
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
          {/* Enhanced background with floating particles effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a90a4]/20 to-transparent"></div>
          </div>
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-[#6bb6c7]/10 to-[#4a90a4]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-[#1e3a5f]/10 to-[#4a90a4]/10 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="flex justify-center lg:justify-start order-1 lg:order-1">
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

            <div className="text-center lg:text-right order-2 lg:order-2" dir={language === "ar" ? "rtl" : "ltr"}>
              <div className="glass-effect-hero rounded-3xl p-8 lg:p-12 backdrop-blur-xl border border-white/30 shadow-2xl relative group">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 via-[#6bb6c7]/20 to-[#4a90a4]/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg relative z-10">
                  <span className="text-white drop-shadow-2xl bg-gradient-to-r from-white to-blue-100 bg-clip-text">{currentContent.hero.title}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed font-light drop-shadow-md relative z-10">
                  {currentContent.hero.subtitle}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 relative z-10">
                  <div className="text-center group">
                    <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text">15+</div>
                      <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                        {language === "ar" ? "سنوات خبرة" : "Years Experience"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text">200+</div>
                      <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                        {language === "ar" ? "مشروع ناجح" : "Successful Projects"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#6bb6c7]/20 to-[#4a90a4]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text">98%</div>
                      <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                        {language === "ar" ? "رضا العملاء" : "Client Satisfaction"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text">50+</div>
                      <div className="text-sm md:text-base text-white/80 drop-shadow-md">
                        {language === "ar" ? "عميل سعيد" : "Happy Clients"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#6bb6c7]/20 to-[#4a90a4]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA with multiple buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end relative z-10">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="relative bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                      <span className="relative z-10">{currentContent.hero.cta}</span>
                      <ChevronRight className="relative z-10 ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      size="lg"
                      className="relative border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/5 hover:border-white/50 transition-all duration-300 hover:scale-105 group"
                    >
                      <span className="relative z-10">{language === "ar" ? "تعرف علينا أكثر" : "Learn More"}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full mb-6">
              <span className="px-4 py-2 bg-white rounded-full text-[#4a90a4] font-medium shadow-sm">
                {language === "ar" ? "خدماتنا المتميزة" : "Our Premium Services"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-6">
              {currentContent.services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{currentContent.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(currentContent.services.items || []).slice(0, 6).map((svc: any, idx: number) => {
              const icons = [Users, Target, TrendingUp, Award, Users, Target];
              const IconComponent = icons[idx % icons.length];
              const gradients = ['from-[#4a90a4] to-[#6bb6c7]', 'from-[#1e3a5f] to-[#4a90a4]', 'from-[#6bb6c7] to-[#4a90a4]'];
              return (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % 3]} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <Card className="relative text-center bg-white/90 backdrop-blur-sm border border-white/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${gradients[idx % 3]}`}></div>
                    <CardHeader className="pb-4">
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % 3]} rounded-2xl blur-lg opacity-30`}></div>
                        <div className={`relative mx-auto w-20 h-20 bg-gradient-to-br ${gradients[idx % 3]} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-[#1e3a5f] mb-3 font-bold">{svc.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">{svc.description}</CardDescription>
                      {svc.features && svc.features.length > 0 && (
                        <div className="text-left">
                          <div className="space-y-3">
                            {svc.features.slice(0, 3).map((feature: string, featureIdx: number) => (
                              <div key={featureIdx} className="flex items-start">
                                <div className={`w-5 h-5 bg-gradient-to-br ${gradients[idx % 3]} rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 mt-0.5 flex-shrink-0`}>
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-gray-700 leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                          {svc.features.length > 3 && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 font-medium">
                                {language === "ar" ? `+${svc.features.length - 3} خدمات أخرى` : `+${svc.features.length - 3} more services`}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Service Request Button */}
                      <div className="mt-6">
                        <Link href={`/request-service?service=${['consulting', 'research', 'training', 'events', 'digital', 'nonprofit', 'media'][idx % 7]}&title=${encodeURIComponent(svc.title)}`}>
                          <Button className={`w-full bg-gradient-to-r ${gradients[idx % 3]} text-white hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl`}>
                            طلب هذه الخدمة
                          </Button>
                        </Link>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradients[idx % 3]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Link href="/services">
                <Button className="relative bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <span className="relative z-10">{language === "ar" ? "عرض جميع الخدمات" : "View All Services"}</span>
                  <ChevronRight className="relative z-10 ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="py-24 bg-gradient-to-br from-slate-900 via-[#1e3a5f] to-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 left-20 w-64 h-64 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-full mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20">
                {language === "ar" ? "قصص نجاحنا" : "Our Success Stories"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {currentContent.cases.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">{currentContent.cases.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {(currentContent.cases.items || []).map((cs: any, idx: number) => {
              const gradient = idx % 2 ? 'from-[#6bb6c7] to-[#4a90a4]' : 'from-[#4a90a4] to-[#6bb6c7]';
              return (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm border border-white/60 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 rounded-3xl">
                    <div className={`h-64 bg-gradient-to-br ${gradient.replace('from-', 'from-').replace('to-', 'to-')} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                      
                      {/* Floating result badge */}
                      <div className="absolute top-6 right-6">
                        <Badge className={`bg-gradient-to-r ${gradient} text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-sm`}>
                          {cs.result}
                        </Badge>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>
                    </div>
                    
                    <CardHeader className="p-8">
                      <CardTitle className="text-2xl text-[#1e3a5f] mb-4 font-bold leading-tight group-hover:text-[#4a90a4] transition-colors duration-300">
                        {cs.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-8 pb-8">
                      <CardDescription className="text-lg text-gray-700 leading-relaxed">
                        {cs.description}
                      </CardDescription>
                      
                      {/* Hover indicator line */}
                      <div className={`mt-6 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`}></div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 left-1/4 w-48 h-48 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full mb-6">
              <span className="px-4 py-2 bg-white rounded-full text-[#4a90a4] font-medium shadow-sm">
                {language === "ar" ? "رؤى ومقالات" : "Insights & Articles"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-6">
              {currentContent.blog.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{currentContent.blog.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {(currentContent.blog.items || []).slice(0,2).map((post: any, idx: number) => {
              const gradient = idx % 2 ? 'from-[#4a90a4]/10 to-[#6bb6c7]/20' : 'from-[#1e3a5f]/10 to-[#4a90a4]/20';
              return (
                <div key={post.id || idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4a90a4]/5 to-[#6bb6c7]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Card className="relative bg-white/90 backdrop-blur-sm border border-white/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden">
                    <div className={`h-56 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Date badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#4a90a4] text-sm font-medium shadow-sm">
                          {post.date}
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-full"></div>
                      <div className="absolute top-1/2 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"></div>
                      <div className="absolute top-1/4 right-8 w-4 h-4 bg-white/30 rounded-full backdrop-blur-sm"></div>
                    </div>
                    
                    <CardHeader className="p-8">
                      <CardTitle className="text-2xl text-[#1e3a5f] font-bold leading-tight group-hover:text-[#4a90a4] transition-colors duration-300">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-8 pb-8">
                      <CardDescription className="text-lg text-gray-700 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                      
                      {/* Read more indicator */}
                      <div className="mt-6 flex items-center text-[#4a90a4] font-medium group-hover:text-[#1e3a5f] transition-colors duration-300">
                        <span>{language === "ar" ? "اقرأ المزيد" : "Read More"}</span>
                        <ChevronRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      
                      {/* Hover indicator line */}
                      <div className="mt-4 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-slate-900 via-[#1e3a5f] to-slate-900 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-full mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20">
                {language === "ar" ? "تواصل معنا" : "Get In Touch"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              {currentContent.contact.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">{currentContent.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Card className="relative bg-white/95 backdrop-blur-sm border border-white/60 shadow-2xl group-hover:shadow-3xl transition-all duration-300 rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]"></div>
                <CardHeader className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-[#1e3a5f] font-bold">
                        {language === "ar" ? "إرسال رسالة" : "Send Message"}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{language === "ar" ? "املأ النموذج وسنتواصل معك في أقرب وقت ممكن" : "Fill out the form and we will contact you as soon as possible"}</p>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6 p-8">
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-sm">
                        <p className="text-green-800 text-center font-medium">
                          {language === "ar" ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." : "Your message has been sent successfully! We'll contact you soon."}
                        </p>
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-sm">
                        <p className="text-red-800 text-center font-medium">
                          {language === "ar" ? "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى." : "An error occurred while sending your message. Please try again."}
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-3 text-[#1e3a5f]">
                          {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={language === "ar" ? "الاسم الكامل" : "Full Name"}
                          className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300 hover:border-[#4a90a4]/50 bg-white/80 backdrop-blur-sm"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-3 text-[#1e3a5f]">
                          {language === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                          className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300 hover:border-[#4a90a4]/50 bg-white/80 backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-3 text-[#1e3a5f]">
                          {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
                          className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300 hover:border-[#4a90a4]/50 bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-3 text-[#1e3a5f]">
                          {language === "ar" ? "اسم الشركة" : "Company Name"}
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder={language === "ar" ? "اسم الشركة" : "Company Name"}
                          className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300 hover:border-[#4a90a4]/50 bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-3 text-[#1e3a5f]">
                        {language === "ar" ? "الخدمة المطلوبة" : "Required Service"}
                      </label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300 hover:border-[#4a90a4]/50 bg-white/80 backdrop-blur-sm appearance-none"
                      >
                        <option value="">{language === "ar" ? "اختر الخدمة المطلوبة" : "Select Required Service"}</option>
                        <option value="consulting">{language === "ar" ? "الاستشارات الإدارية" : "Management Consulting"}</option>
                        <option value="strategy">{language === "ar" ? "التخطيط الاستراتيجي" : "Strategic Planning"}</option>
                        <option value="digital">{language === "ar" ? "التحول الرقمي" : "Digital Transformation"}</option>
                        <option value="training">{language === "ar" ? "التدريب والتطوير" : "Training & Development"}</option>
                        <option value="other">{language === "ar" ? "أخرى" : "Other"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-3 text-[#1e3a5f]">
                        {language === "ar" ? "الرسالة" : "Message"} *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={language === "ar" ? "أخبرنا عن متطلباتك ومشروعك" : "Tell us about your requirements and project"}
                        rows={6}
                        className="border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300 hover:border-[#4a90a4]/50 bg-white/80 backdrop-blur-sm resize-none"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full h-14 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 border-0 group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          <Send className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                          {isSubmitting 
                            ? (language === "ar" ? "جاري الإرسال..." : "Sending...")
                            : (language === "ar" ? "إرسال الرسالة" : "Send Message")
                          }
                        </span>
                      </Button>
                    </div>
                 </CardContent>
               </form>
             </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact info cards with enhanced design */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-start gap-6 p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl group-hover:shadow-2xl border border-white/60 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-[#1e3a5f] group-hover:text-[#4a90a4] transition-colors duration-300">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{currentContent.contact.info.email}</p>
                    <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6bb6c7]/10 to-[#4a90a4]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-start gap-6 p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl group-hover:shadow-2xl border border-white/60 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#6bb6c7] to-[#4a90a4] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-[#1e3a5f] group-hover:text-[#4a90a4] transition-colors duration-300">
                      {language === "ar" ? "الهاتف" : "Phone"}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{currentContent.contact.info.phone}</p>
                    <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/10 to-[#4a90a4]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-start gap-6 p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl group-hover:shadow-2xl border border-white/60 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90a4] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-[#1e3a5f] group-hover:text-[#4a90a4] transition-colors duration-300">
                      {language === "ar" ? "العنوان" : "Address"}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{currentContent.contact.info.address}</p>
                    <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f1419] to-[#1e3a5f] text-white py-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="group inline-block mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="/images/depth-logo-horizontal.png"
                  alt="Depth Logo"
                  className="relative h-20 w-auto mx-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-xl text-white/90 mb-4 leading-relaxed font-medium">
                {language === "ar" 
                  ? "عمق الخبرة لحلول الأعمال - شريكك في النجاح والتميز" 
                  : "Depth of Experience for Business Solutions - Your Partner in Success and Excellence"
                }
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] mx-auto rounded-full mb-6"></div>
              <p className="text-white/70 text-lg">
                {language === "ar" 
                  ? "نحن نؤمن أن النجاح يتحقق من خلال الشراكة والابتكار والتميز في الخدمة" 
                  : "We believe success is achieved through partnership, innovation, and excellence in service"
                }
              </p>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <p className="text-white/60 text-lg">
                {language === "ar" ? "© 2024 عمق - جميع الحقوق محفوظة" : "© 2024 Depth - All rights reserved"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </footer>
    </div>
  )
}
