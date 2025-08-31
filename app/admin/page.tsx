"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type PageKey = "home" | "services" | "cases" | "blog" | "contact"

const PAGES: PageKey[] = ["home", "services", "cases", "blog", "contact"]

export default function AdminPage() {
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
  const [activeTab, setActiveTab] = useState<"json" | "services" | "cases" | "blog" | "contact" | "home" | "contact-messages">("json")
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [contactFaq, setContactFaq] = useState<any[]>([])
  const [contactOffice, setContactOffice] = useState<any>({})
  const [homeHero, setHomeHero] = useState<any>({})
  const [contactMessages, setContactMessages] = useState<any[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [messagesPage, setMessagesPage] = useState(1)
  const [messagesTotal, setMessagesTotal] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all')

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

  useEffect(() => {
    fetchPage(selectedPage)
  }, [selectedPage, lang])

  useEffect(() => {
    if (activeTab === 'contact-messages') {
      fetchContactMessages(1, selectedStatus)
    }
  }, [activeTab, selectedStatus])

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
      cases: "دراسات الحالة",
      blog: "المدونة",
      contact: "التواصل"
    }
    return titles[page]
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
            لوحة تحكم المحتوى
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            إدارة المحتوى والرسائل والخدمات في موقع عمق
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pages Navigation */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  الصفحات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {PAGES.map((p) => (
                  <Button
                    key={p}
                    onClick={() => setSelectedPage(p)}
                    variant={selectedPage === p ? "default" : "outline"}
                    className={`w-full justify-start transition-all duration-200 ${
                      selectedPage === p 
                        ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white shadow-lg transform scale-105' 
                        : 'hover:bg-[#4a90a4]/10 hover:border-[#4a90a4]/30'
                    }`}
                  >
                    {getPageTitle(p)}
                  </Button>
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
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
                <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
                  <Button 
                    variant={activeTab === "json" ? "default" : "outline"} 
                    onClick={() => setActiveTab("json")}
                    className={activeTab === "json" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    JSON
                  </Button>
                  {selectedPage === "services" && (
                    <Button 
                      variant={activeTab === "services" ? "default" : "outline"} 
                      onClick={() => setActiveTab("services")}
                      className={activeTab === "services" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      الخدمات
                    </Button>
                  )}
                  {selectedPage === "cases" && (
                    <Button 
                      variant={activeTab === "cases" ? "default" : "outline"} 
                      onClick={() => setActiveTab("cases")}
                      className={activeTab === "cases" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      دراسات الحالة
                    </Button>
                  )}
                  {selectedPage === "blog" && (
                    <Button 
                      variant={activeTab === "blog" ? "default" : "outline"} 
                      onClick={() => setActiveTab("blog")}
                      className={activeTab === "blog" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      المدونة
                    </Button>
                  )}
                  {selectedPage === "contact" && (
                    <Button 
                      variant={activeTab === "contact" ? "default" : "outline"} 
                      onClick={() => setActiveTab("contact")}
                      className={activeTab === "contact" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      التواصل
                    </Button>
                  )}
                  {selectedPage === "home" && (
                    <Button 
                      variant={activeTab === "home" ? "default" : "outline"} 
                      onClick={() => setActiveTab("home")}
                      className={activeTab === "home" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      الرئيسية
                    </Button>
                  )}
                  <Button 
                    variant={activeTab === "contact-messages" ? "default" : "outline"} 
                    onClick={() => setActiveTab("contact-messages")}
                    className={activeTab === "contact-messages" ? 'bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white' : ''}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    الطلبات
                  </Button>
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

                {/* Other tabs content would go here - simplified for brevity */}
                {activeTab !== "json" && (
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
  )
}
