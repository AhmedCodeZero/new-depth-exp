"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building,
  Calendar,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
    document.documentElement.setAttribute("lang", language === "ar" ? "en" : "ar")
    document.documentElement.setAttribute("dir", language === "ar" ? "ltr" : "rtl")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'حدث خطأ أثناء إرسال الرسالة'
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'حدث خطأ في الاتصال بالخادم'
      })
    } finally {
      setIsSubmitting(false)
    }
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
        title: "تواصل معنا",
        subtitle: "نحن هنا لمساعدتك في تحقيق أهدافك وتطوير أعمالك",
        backToHome: "العودة للرئيسية",
      },
      form: {
        title: "أرسل لنا رسالة",
        subtitle: "املأ النموذج وسنتواصل معك في أقرب وقت ممكن",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        company: "اسم الشركة",
        service: "الخدمة المطلوبة",
        message: "الرسالة",
        send: "إرسال الرسالة",
        services: {
          consulting: "الاستشارات الإدارية",
          strategy: "التخطيط الاستراتيجي",
          digital: "التحول الرقمي",
          training: "التدريب والتطوير",
          other: "أخرى",
        },
      },
      contact: {
        title: "معلومات التواصل",
        subtitle: "تواصل معنا عبر القنوات التالية",
        office: {
          title: "المكتب الرئيسي",
          address: "شارع الملك فهد، الرياض 12345، المملكة العربية السعودية",
          phone: "+966 11 123 4567",
          email: "info@depth-solutions.com",
        },
        hours: {
          title: "ساعات العمل",
          weekdays: "الأحد - الخميس: 9:00 ص - 6:00 م",
          weekend: "الجمعة - السبت: مغلق",
        },
        response: {
          title: "وقت الاستجابة",
          email: "البريد الإلكتروني: خلال 24 ساعة",
          phone: "الهاتف: فوري خلال ساعات العمل",
        },
      },
      faq: {
        title: "الأسئلة الشائعة",
        subtitle: "إجابات على أكثر الأسئلة شيوعاً",
        questions: [
          {
            question: "كم تستغرق مدة تنفيذ المشاريع؟",
            answer: "تختلف مدة التنفيذ حسب نوع وحجم المشروع، وتتراوح عادة من 3 إلى 12 شهراً.",
          },
          {
            question: "هل تقدمون استشارة مجانية؟",
            answer: "نعم، نقدم استشارة مجانية أولية لمدة ساعة لمناقشة احتياجاتكم وكيفية مساعدتكم.",
          },
          {
            question: "ما هي طرق الدفع المتاحة؟",
            answer: "نقبل التحويل البنكي والشيكات، مع إمكانية تقسيط المبلغ حسب مراحل المشروع.",
          },
          {
            question: "هل تعملون مع الشركات الصغيرة؟",
            answer: "نعم، نعمل مع الشركات من جميع الأحجام، من الشركات الناشئة إلى المؤسسات الكبيرة.",
          },
        ],
      },
      cta: {
        title: "مستعد لبدء مشروعك؟",
        subtitle: "احجز استشارة مجانية اليوم ودعنا نساعدك في تحقيق أهدافك",
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
        title: "Contact Us",
        subtitle: "We are here to help you achieve your goals and develop your business",
        backToHome: "Back to Home",
      },
      form: {
        title: "Send Us a Message",
        subtitle: "Fill out the form and we will contact you as soon as possible",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        company: "Company Name",
        service: "Required Service",
        message: "Message",
        send: "Send Message",
        services: {
          consulting: "Management Consulting",
          strategy: "Strategic Planning",
          digital: "Digital Transformation",
          training: "Training & Development",
          other: "Other",
        },
      },
      contact: {
        title: "Contact Information",
        subtitle: "Reach us through the following channels",
        office: {
          title: "Main Office",
          address: "King Fahd Street, Riyadh 12345, Saudi Arabia",
          phone: "+966 11 123 4567",
          email: "info@depth-solutions.com",
        },
        hours: {
          title: "Working Hours",
          weekdays: "Sunday - Thursday: 9:00 AM - 6:00 PM",
          weekend: "Friday - Saturday: Closed",
        },
        response: {
          title: "Response Time",
          email: "Email: Within 24 hours",
          phone: "Phone: Immediate during working hours",
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Answers to the most common questions",
        questions: [
          {
            question: "How long do projects take to complete?",
            answer: "Project duration varies depending on type and size, typically ranging from 3 to 12 months.",
          },
          {
            question: "Do you offer free consultation?",
            answer: "Yes, we offer a free initial consultation for one hour to discuss your needs and how we can help.",
          },
          {
            question: "What payment methods are available?",
            answer:
              "We accept bank transfers and checks, with the possibility of installment payments based on project phases.",
          },
          {
            question: "Do you work with small companies?",
            answer: "Yes, we work with companies of all sizes, from startups to large enterprises.",
          },
        ],
      },
      cta: {
        title: "Ready to Start Your Project?",
        subtitle: "Book a free consultation today and let us help you achieve your goals",
        button: "Book Free Consultation",
      },
    },
  }

  const [remoteContent, setRemoteContent] = useState<any | null>(null)
  useEffect(() => {
    const bust = Date.now()
    fetch(`/api/content/contact?bust=${bust}`, { cache: "no-store" as RequestCache })
      .then((r) => r.json())
      .then((d) => setRemoteContent(d.data))
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
                {currentContent.nav.services}
              </Link>
              <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.cases}
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                {currentContent.nav.blog}
              </Link>
              <Link href="/contact" className="text-primary font-medium">
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
                  {currentContent.nav.services}
                </Link>
                <Link href="/cases" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.cases}
                </Link>
                <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                  {currentContent.nav.blog}
                </Link>
                <Link href="/contact" className="text-primary font-medium">
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

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="card-glow border-[#4a90a4]/20 bg-white relative overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]"></div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e3a5f] flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3 text-[#4a90a4]" />
                  {currentContent.form.title}
                </CardTitle>
                <p className="text-gray-600">{currentContent.form.subtitle}</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                        {currentContent.form.name} *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={currentContent.form.name}
                        className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                        {currentContent.form.email} *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={currentContent.form.email}
                        className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                        {currentContent.form.phone}
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={currentContent.form.phone}
                        className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                        {currentContent.form.company}
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={currentContent.form.company}
                        className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                      {currentContent.form.service}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#4a90a4]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90a4] focus:border-[#4a90a4]"
                    >
                      <option value="">{currentContent.form.service}</option>
                      <option value="consulting">{currentContent.form.services.consulting}</option>
                      <option value="strategy">{currentContent.form.services.strategy}</option>
                      <option value="digital">{currentContent.form.services.digital}</option>
                      <option value="training">{currentContent.form.services.training}</option>
                      <option value="other">{currentContent.form.services.other}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#1e3a5f]">
                      {currentContent.form.message} *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={currentContent.form.message}
                      rows={5}
                      className="border-[#4a90a4]/30 focus:border-[#4a90a4]"
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <div className={`p-3 rounded-md text-sm ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white border-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                        {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {currentContent.form.send}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="card-glow border-[#4a90a4]/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e3a5f] flex items-center">
                    <Building className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3 text-[#4a90a4]" />
                    {currentContent.contact.title}
                  </CardTitle>
                  <p className="text-gray-600">{currentContent.contact.subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#1e3a5f] mb-3">{currentContent.contact.office.title}</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-[#4a90a4] mr-8 rtl:mr-0 rtl:ml-8 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{currentContent.contact.office.address}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-[#4a90a4] mr-8 rtl:mr-0 rtl:ml-8 flex-shrink-0" />
                        <span className="text-gray-600">{currentContent.contact.office.phone}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-[#4a90a4] mr-8 rtl:mr-0 rtl:ml-8 flex-shrink-0" />
                        <span className="text-gray-600">{currentContent.contact.office.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-glow border-[#4a90a4]/20 bg-gradient-to-br from-[#4a90a4]/5 to-[#6bb6c7]/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#1e3a5f] flex items-center">
                      <Clock className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#4a90a4]" />
                      {currentContent.contact.hours.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{currentContent.contact.hours.weekdays}</p>
                      <p>{currentContent.contact.hours.weekend}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-glow border-[#4a90a4]/20 bg-gradient-to-br from-[#6bb6c7]/5 to-[#4a90a4]/10">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#1e3a5f] flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#4a90a4]" />
                      {currentContent.contact.response.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{currentContent.contact.response.email}</p>
                      <p>{currentContent.contact.response.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f]/5 via-[#4a90a4]/5 to-[#6bb6c7]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
              {currentContent.faq.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{currentContent.faq.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {currentContent.faq.questions.map((faq, index) => (
              <Card key={index} className="card-glow border-[#4a90a4]/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-[#1e3a5f] flex items-start">
                    <MessageSquare className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3 mt-0.5 text-[#4a90a4] flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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
            <Button
              size="lg"
              className="bg-white text-[#1e3a5f] hover:bg-white/90 px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
              {currentContent.cta.button}
              <ChevronRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
            </Button>
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
