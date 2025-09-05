"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ServicesManager from "./components/ServicesManager"
import CasesManager from "./components/CasesManager"
import BlogManager from "./components/BlogManager"
import HomeManager from "./components/HomeManager"
import ServiceRequestsManager from "./components/ServiceRequestsManager"

type PageKey = "home" | "services" | "cases" | "blog" | "contact"

const PAGES: PageKey[] = ["home", "services", "cases", "blog", "contact"]

export default function AdminPage() {
  const router = useRouter()
  const [selectedPage, setSelectedPage] = useState<PageKey>("home")
  const [adminToken, setAdminToken] = useState("")
  const [jsonText, setJsonText] = useState("")
  const [isDirty, setIsDirty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [lang, setLang] = useState<"ar" | "en">("ar")
  const [servicesItems, setServicesItems] = useState<any[]>([])
  const [casesItems, setCasesItems] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<"json" | "services" | "cases" | "blog" | "contact" | "home" | "contact-messages" | "service-requests">("json")
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [contactFaq, setContactFaq] = useState<any[]>([])
  const [contactOffice, setContactOffice] = useState<any>({})
  const [homeHero, setHomeHero] = useState<any>({})
  const [contactMessages, setContactMessages] = useState<any[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [messagesPage, setMessagesPage] = useState(1)
  const [messagesTotal, setMessagesTotal] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/admin/login')
  }

  // إضافة event listeners للتشخيص
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log('تم النقر على:', e.target)
      console.log('Event path:', e.composedPath())
    }

    const handlePointerDown = (e: PointerEvent) => {
      console.log('Pointer down on:', e.target)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  const fetchPage = async (page: PageKey) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`/api/content/${page}?bust=${Date.now()}`, { cache: 'no-store' as RequestCache })
      const data = await res.json()
      setJsonText(JSON.stringify(data.data, null, 2))
      if (page === "services") {
        const arr = data.data?.[lang]?.services?.items || []
        setServicesItems(arr)
      }
      if (page === "cases") {
        const arr = data.data?.[lang]?.cases?.items || []
        setCasesItems(arr)
      }
      if (page === "blog") {
        const arr = data.data?.[lang]?.posts || []
        setBlogPosts(arr)
      }
      if (page === "contact") {
        const arr = data.data?.[lang]?.faq?.questions || []
        setContactFaq(arr)
        setContactOffice(data.data?.[lang]?.contact?.office || {})
      }
      if (page === "home") {
        setHomeHero(data.data?.[lang]?.hero || {})
        const homeSvcs = data.data?.[lang]?.services?.items || []
        const homeCases = data.data?.[lang]?.cases?.items || []
        setServicesItems(homeSvcs)
        setCasesItems(homeCases)
      }
      setIsDirty(false)
    } catch (e) {
      setError("فشل تحميل المحتوى")
    } finally {
      setLoading(false)
    }
  }

  const fetchContactMessages = async (page: number = 1, status: string = 'all') => {
    setMessagesLoading(true)
    try {
      const response = await fetch(`/api/admin/contact-messages?page=${page}&status=${status}`)
      const data = await response.json()
      
      if (response.ok) {
        setContactMessages(data.messages)
        setMessagesTotal(data.total)
        setMessagesPage(data.page)
      }
    } catch (error) {
      console.error('Failed to fetch contact messages:', error)
    } finally {
      setMessagesLoading(false)
    }
  }

  const updateMessageStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/contact-messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      
      if (response.ok) {
        fetchContactMessages(messagesPage, selectedStatus)
      }
    } catch (error) {
      console.error('Failed to update message status:', error)
    }
  }

  // التحقق من الجلسة
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // التحقق من localStorage أولاً
        const sessionToken = localStorage.getItem('admin_session')
        if (!sessionToken) {
          router.push('/admin/login')
          return
        }

        // التحقق من صحة الجلسة
        const response = await fetch('/api/admin/verify-session', {
          headers: {
            'x-admin-session': sessionToken
          }
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('admin_session')
          router.push('/admin/login')
        }
      } catch (error) {
        localStorage.removeItem('admin_session')
        router.push('/admin/login')
      } finally {
        setAuthLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchPage(selectedPage)
    }
  }, [selectedPage, lang, isAuthenticated])

  useEffect(() => {
    if (activeTab === 'contact-messages' && isAuthenticated) {
      fetchContactMessages(1, selectedStatus)
    }
  }, [activeTab, selectedStatus, isAuthenticated])

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const parsed = JSON.parse(jsonText)
      if (activeTab === "services") {
        parsed[lang] = parsed[lang] || {}
        parsed[lang].services = parsed[lang].services || {}
        parsed[lang].services.items = servicesItems
      }
      if (activeTab === "cases") {
        parsed[lang] = parsed[lang] || {}
        parsed[lang].cases = parsed[lang].cases || {}
        parsed[lang].cases.items = casesItems
      }
      if (activeTab === "blog") {
        parsed[lang] = parsed[lang] || {}
        parsed[lang].posts = blogPosts
      }
      if (activeTab === "contact") {
        parsed[lang] = parsed[lang] || {}
        parsed[lang].faq = parsed[lang].faq || {}
        parsed[lang].faq.questions = contactFaq
        parsed[lang].contact = parsed[lang].contact || {}
        parsed[lang].contact.office = contactOffice
      }
      if (activeTab === "home") {
        parsed[lang] = parsed[lang] || {}
        parsed[lang].hero = homeHero
        parsed[lang].services = parsed[lang].services || {}
        parsed[lang].services.items = servicesItems
        parsed[lang].cases = parsed[lang].cases || {}
        parsed[lang].cases.items = casesItems
      }
      const res = await fetch(`/api/content/${selectedPage}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
        },
        body: JSON.stringify(parsed),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Failed to save")
      }
      setSuccess("تم حفظ المحتوى بنجاح")
      setIsDirty(false)
      await fetchPage(selectedPage)
    } catch (e: any) {
      setError(e.message || "حدث خطأ")
    } finally {
      setLoading(false)
    }
  }

  const getPageTitle = (page: PageKey) => {
    const titles = {
      home: "الرئيسية",
      services: "الخدمات", 
      cases: "عملاؤنا",
      blog: "المدونة",
      contact: "التواصل"
    }
    return titles[page]
  }

  // شاشة التحميل
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1e3a5f] to-[#0f1419] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4a90a4] mx-auto"></div>
          <p className="mt-4 text-lg text-white">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  // إذا لم يكن مصادق عليه
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1e3a5f] to-[#0f1419] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-[#6bb6c7]/10 to-[#4a90a4]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-[#1e3a5f]/10 to-[#4a90a4]/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-full">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20">
                  لوحة التحكم
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="mr-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                تسجيل الخروج
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                لوحة تحكم المحتوى
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              إدارة المحتوى والرسائل والخدمات في موقع عمق
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] mx-auto mt-6 rounded-full"></div>
          </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pages Navigation */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white rounded-t-lg relative z-10">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  الصفحات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {PAGES.map((p) => (
                  <button
                    key={p}
                    onClick={(e) => {
                      console.log('تم النقر على صفحة:', p)
                      console.log('Event:', e)
                      setSelectedPage(p)
                    }}
                    className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedPage === p 
                        ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-xl' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${selectedPage === p ? 'bg-white' : 'bg-[#4a90a4]'}`}></div>
                      {getPageTitle(p)}
                    </div>
                  </button>
                ))}
                
                {/* Language Toggle */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">اللغة</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={lang === "ar" ? "default" : "outline"} 
                      onClick={() => setLang("ar")}
                      className={lang === "ar" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      عربي
                    </Button>
                    <Button 
                      variant={lang === "en" ? "default" : "outline"} 
                      onClick={() => setLang("en")}
                      className={lang === "en" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      EN
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  إحصائيات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">الرسائل الجديدة</span>
                  <span className="text-lg font-bold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">المقالات</span>
                  <span className="text-lg font-bold text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">الخدمات</span>
                  <span className="text-lg font-bold text-purple-600">6</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a90a4]/5 to-[#6bb6c7]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white rounded-t-lg relative z-10">
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  تحرير: {getPageTitle(selectedPage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Admin Token Input */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    رمز المسؤول (ADMIN_TOKEN)
                  </label>
                  <Input
                    placeholder="أدخل رمز المسؤول للحفظ"
                    value={adminToken}
                    onChange={(e) => setAdminToken(e.target.value)}
                    type="password"
                    className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200/50">
                  <button 
                    onClick={(e) => {
                      console.log('تم النقر على تبويب JSON')
                      console.log('Event:', e)
                      setActiveTab("json")
                    }}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                      activeTab === "json" 
                        ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    JSON
                  </button>
                  {selectedPage === "services" && (
                    <button 
                      onClick={() => setActiveTab("services")}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === "services" 
                          ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      الخدمات
                    </button>
                  )}
                  {selectedPage === "cases" && (
                    <button 
                      onClick={() => setActiveTab("cases")}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === "cases" 
                          ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      عملاؤنا
                    </button>
                  )}
                  {selectedPage === "blog" && (
                    <button 
                      onClick={() => setActiveTab("blog")}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === "blog" 
                          ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      المدونة
                    </button>
                  )}
                  {selectedPage === "contact" && (
                    <button 
                      onClick={() => setActiveTab("contact")}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === "contact" 
                          ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      التواصل
                    </button>
                  )}
                  {selectedPage === "home" && (
                    <button 
                      onClick={() => setActiveTab("home")}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === "home" 
                          ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      الرئيسية
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveTab("contact-messages")}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                      activeTab === "contact-messages" 
                        ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    رسائل التواصل
                  </button>
                  <button 
                    onClick={() => setActiveTab("service-requests")}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                      activeTab === "service-requests" 
                        ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-[#4a90a4] border border-gray-200'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    طلبات الخدمة
                  </button>
                </div>

                {/* Content Tabs */}
                {activeTab === "json" && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">JSON</label>
                    <Textarea
                      className="font-mono text-sm"
                      rows={20}
                      value={jsonText}
                      onChange={(e) => {
                        setJsonText(e.target.value)
                        setIsDirty(true)
                      }}
                      placeholder="محتوى JSON..."
                    />
                  </div>
                )}

                {/* Contact Messages Tab */}
                {activeTab === "contact-messages" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">رسائل التواصل</h3>
                      <div className="flex gap-2">
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value as any)}
                          className="px-3 py-2 border rounded-md"
                        >
                          <option value="all">جميع الرسائل</option>
                          <option value="new">جديدة</option>
                          <option value="read">مقروءة</option>
                          <option value="replied">تم الرد</option>
                        </select>
                      </div>
                    </div>

                    {messagesLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">جاري التحميل...</p>
                      </div>
                    ) : contactMessages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        لا توجد رسائل
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contactMessages.map((message) => (
                          <div key={message.id} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-gray-900">{message.name}</span>
                                  <span className="text-sm text-gray-500">({message.email})</span>
                                  {message.phone && (
                                    <span className="text-sm text-gray-500">• {message.phone}</span>
                                  )}
                                </div>
                                {message.company && (
                                  <p className="text-sm text-gray-600 mb-1">الشركة: {message.company}</p>
                                )}
                                {message.service && (
                                  <p className="text-sm text-gray-600 mb-2">الخدمة: {message.service}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                  message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {message.status === 'new' ? 'جديدة' :
                                   message.status === 'read' ? 'مقروءة' : 'تم الرد'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(message.created_at).toLocaleDateString('ar-SA')}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-md mb-3">
                              <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
                            </div>

                            <div className="flex gap-2">
                              {message.status === 'new' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateMessageStatus(message.id, 'read')}
                                >
                                  تحديد كمقروءة
                                </Button>
                              )}
                              {message.status !== 'replied' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateMessageStatus(message.id, 'replied')}
                                >
                                  تحديد كمنتهية
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`mailto:${message.email}?subject=رد على رسالتك&body=مرحباً ${message.name}،%0D%0A%0D%0Aشكراً لك على رسالتك.%0D%0A%0D%0Aمع تحياتي،%0D%0Aفريق عمق`)}
                              >
                                رد عبر البريد
                              </Button>
                            </div>
                          </div>
                        ))}

                        {/* Pagination */}
                        {messagesTotal > 20 && (
                          <div className="flex justify-center items-center gap-2 mt-6">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={messagesPage === 1}
                              onClick={() => fetchContactMessages(messagesPage - 1, selectedStatus)}
                            >
                              السابق
                            </Button>
                            <span className="text-sm text-gray-600">
                              صفحة {messagesPage} من {Math.ceil(messagesTotal / 20)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={messagesPage >= Math.ceil(messagesTotal / 20)}
                              onClick={() => fetchContactMessages(messagesPage + 1, selectedStatus)}
                            >
                              التالي
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === "services" && (
                  <ServicesManager
                    services={servicesItems}
                    onSave={(services) => {
                      setServicesItems(services)
                      setIsDirty(true)
                    }}
                    lang={lang}
                  />
                )}

                {/* Cases Tab */}
                {activeTab === "cases" && (
                  <CasesManager
                    cases={casesItems}
                    onSave={(cases) => {
                      setCasesItems(cases)
                      setIsDirty(true)
                    }}
                    lang={lang}
                  />
                )}

                {/* Blog Tab */}
                {activeTab === "blog" && (
                  <BlogManager
                    posts={blogPosts}
                    onSave={(posts) => {
                      setBlogPosts(posts)
                      setIsDirty(true)
                    }}
                    lang={lang}
                  />
                )}

                {/* Home Tab */}
                {activeTab === "home" && (
                  <HomeManager />
                )}

                {/* Service Requests Tab */}
                {activeTab === "service-requests" && (
                  <ServiceRequestsManager />
                )}

                {/* Other tabs content would go here - simplified for brevity */}
                {activeTab !== "json" && activeTab !== "contact-messages" && activeTab !== "services" && activeTab !== "cases" && activeTab !== "blog" && activeTab !== "home" && activeTab !== "service-requests" && (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>محتوى التحرير سيظهر هنا</p>
                  </div>
                )}

                {/* Status Messages */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {success}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={() => fetchPage(selectedPage)} 
                    variant="outline" 
                    disabled={loading}
                    className="flex-1"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    إعادة التحميل
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={loading || !isDirty}
                    className="flex-1 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white border-0"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جارٍ الحفظ...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        حفظ
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
