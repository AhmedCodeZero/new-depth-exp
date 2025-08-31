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
        // Prepare editable arrays
        const homeSvcs = data.data?.[lang]?.services?.items || []
        const homeCases = data.data?.[lang]?.cases?.items || []
        ;(setServicesItems as any)(homeSvcs)
        ;(setCasesItems as any)(homeCases)
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
        // Refresh messages
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
      // Refresh current page data to reflect persisted changes
      await fetchPage(selectedPage)
    } catch (e: any) {
      setError(e.message || "حدث خطأ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم المحتوى</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>الصفحات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PAGES.map((p) => (
              <Button
                key={p}
                onClick={() => setSelectedPage(p)}
                variant={selectedPage === p ? "default" : "outline"}
                className="w-full justify-start"
              >
                {p}
              </Button>
            ))}
            <div className="pt-4">
              <label className="block text-sm mb-2">اللغة</label>
              <div className="flex gap-2">
                <Button variant={lang === "ar" ? "default" : "outline"} onClick={() => setLang("ar")}>
                  عربي
                </Button>
                <Button variant={lang === "en" ? "default" : "outline"} onClick={() => setLang("en")}>
                  EN
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>تحرير: {selectedPage}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm mb-2">رمز المسؤول (ADMIN_TOKEN)</label>
              <Input
                placeholder="أدخل رمز المسؤول للحفظ"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={activeTab === "json" ? "default" : "outline"} onClick={() => setActiveTab("json")}>
                JSON
              </Button>
              {selectedPage === "services" && (
                <Button variant={activeTab === "services" ? "default" : "outline"} onClick={() => setActiveTab("services")}>
                  الخدمات
                </Button>
              )}
              {selectedPage === "cases" && (
                <Button variant={activeTab === "cases" ? "default" : "outline"} onClick={() => setActiveTab("cases")}>
                  دراسات الحالة
                </Button>
              )}
              {selectedPage === "blog" && (
                <Button variant={activeTab === "blog" ? "default" : "outline"} onClick={() => setActiveTab("blog")}>
                  المدونة
                </Button>
              )}
              {selectedPage === "contact" && (
                <Button variant={activeTab === "contact" ? "default" : "outline"} onClick={() => setActiveTab("contact")}>
                  تواصل
                </Button>
              )}
              {selectedPage === "home" && (
                <Button variant={activeTab === "home" ? "default" : "outline"} onClick={() => setActiveTab("home")}>
                  الرئيسية
                </Button>
              )}
              <Button 
                variant={activeTab === "contact-messages" ? "default" : "outline"} 
                onClick={() => setActiveTab("contact-messages")}
              >
                الطلبات
              </Button>
            </div>
            {activeTab === "json" && (
              <div>
              <label className="block text-sm mb-2">JSON</label>
              <Textarea
                className="font-mono"
                rows={24}
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value)
                  setIsDirty(true)
                }}
              />
              </div>
            )}
            {activeTab === "blog" && selectedPage === "blog" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">المقالات ({lang})</div>
                  <Button
                    onClick={() => {
                      setBlogPosts([...(blogPosts || []), { id: Date.now(), title: "", excerpt: "", content: "", author: "", date: "", readTime: "", category: "", tags: [], featured: false, imageUrl: "" }])
                      setIsDirty(true)
                    }}
                  >
                    إضافة مقال
                  </Button>
                </div>
                <div className="space-y-4">
                  {blogPosts?.map((it, idx) => (
                    <div key={it.id || idx} className="border rounded-md p-3 space-y-2">
                      <div className="grid md:grid-cols-2 gap-2">
                        <Input placeholder="العنوان" value={it.title} onChange={(e) => { const n=[...blogPosts]; n[idx].title=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                        <Input placeholder="الكاتب" value={it.author || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].author=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                        <Input placeholder="التاريخ" value={it.date || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].date=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                        <Input placeholder="دقائق القراءة" value={it.readTime || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].readTime=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                        <Input placeholder="التصنيف" value={it.category || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].category=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                        <Input placeholder="رابط الصورة" value={it.imageUrl || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].imageUrl=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                      </div>
                      <Textarea placeholder="الملخص" value={it.excerpt || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].excerpt=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                      <Textarea placeholder="المحتوى" value={it.content || ""} onChange={(e) => { const n=[...blogPosts]; n[idx].content=e.target.value; setBlogPosts(n); setIsDirty(true) }} />
                      <Textarea placeholder="الوسوم (مفصولة بفواصل)" value={(it.tags || []).join(", ")} onChange={(e) => { const n=[...blogPosts]; n[idx].tags=e.target.value.split(",").map((s)=>s.trim()).filter(Boolean); setBlogPosts(n); setIsDirty(true) }} />
                      <div className="flex gap-2 items-center">
                        <label className="text-sm">مقال مميز</label>
                        <input type="checkbox" checked={!!it.featured} onChange={(e) => { const n=[...blogPosts]; n[idx].featured=e.target.checked; setBlogPosts(n); setIsDirty(true) }} />
                        <Button variant="outline"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = async () => {
                              const file = (input.files && input.files[0]) || null
                              if (!file) return
                              const fd = new FormData()
                              fd.append("file", file)
                              const res = await fetch("/api/upload", { method: "POST", body: fd })
                              const d = await res.json()
                              if (d.url) {
                                const n=[...blogPosts]; n[idx].imageUrl=d.url; setBlogPosts(n); setIsDirty(true)
                              }
                            }
                            input.click()
                          }}
                        >رفع صورة</Button>
                        <Button variant="destructive" onClick={() => { const n=[...blogPosts]; n.splice(idx,1); setBlogPosts(n); setIsDirty(true) }}>حذف</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "contact" && selectedPage === "contact" && (
              <div className="space-y-3">
                <div className="font-medium">معلومات المكتب ({lang})</div>
                <div className="grid md:grid-cols-2 gap-2">
                  <Input placeholder="العنوان" value={contactOffice?.address || ""} onChange={(e) => { setContactOffice({ ...(contactOffice||{}), address: e.target.value }); setIsDirty(true) }} />
                  <Input placeholder="الهاتف" value={contactOffice?.phone || ""} onChange={(e) => { setContactOffice({ ...(contactOffice||{}), phone: e.target.value }); setIsDirty(true) }} />
                  <Input placeholder="البريد" value={contactOffice?.email || ""} onChange={(e) => { setContactOffice({ ...(contactOffice||{}), email: e.target.value }); setIsDirty(true) }} />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="font-medium">الأسئلة الشائعة</div>
                  <Button onClick={() => { setContactFaq([...(contactFaq||[]), { question: "", answer: "" }]); setIsDirty(true) }}>إضافة سؤال</Button>
                </div>
                <div className="space-y-3">
                  {contactFaq?.map((f, idx) => (
                    <div key={idx} className="grid md:grid-cols-2 gap-2">
                      <Input placeholder="السؤال" value={f.question} onChange={(e) => { const n=[...contactFaq]; n[idx].question=e.target.value; setContactFaq(n); setIsDirty(true) }} />
                      <Input placeholder="الإجابة" value={f.answer} onChange={(e) => { const n=[...contactFaq]; n[idx].answer=e.target.value; setContactFaq(n); setIsDirty(true) }} />
                      <div className="md:col-span-2 text-right">
                        <Button variant="destructive" onClick={() => { const n=[...contactFaq]; n.splice(idx,1); setContactFaq(n); setIsDirty(true) }}>حذف</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "home" && selectedPage === "home" && (
              <div className="space-y-3">
                <div className="font-medium">الرئيسية ({lang})</div>
                <div className="grid md:grid-cols-2 gap-2">
                  <Input placeholder="العنوان" value={homeHero?.title || ""} onChange={(e) => { setHomeHero({ ...(homeHero||{}), title: e.target.value }); setIsDirty(true) }} />
                  <Input placeholder="زر الدعوة" value={homeHero?.cta || ""} onChange={(e) => { setHomeHero({ ...(homeHero||{}), cta: e.target.value }); setIsDirty(true) }} />
                </div>
                <Textarea placeholder="الوصف" value={homeHero?.subtitle || ""} onChange={(e) => { setHomeHero({ ...(homeHero||{}), subtitle: e.target.value }); setIsDirty(true) }} />
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">خدمات الرئيسية</div>
                    <Button onClick={() => { setServicesItems([...(servicesItems||[]), { title: "", description: "", imageUrl: "" }]); setIsDirty(true) }}>إضافة</Button>
                  </div>
                  <div className="space-y-3">
                    {servicesItems?.map((it, idx) => (
                      <div key={idx} className="grid md:grid-cols-2 gap-2 items-start">
                        <Input placeholder="العنوان" value={it.title||""} onChange={(e)=>{ const n=[...servicesItems]; n[idx].title=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                        <Input placeholder="رابط الصورة" value={it.imageUrl||""} onChange={(e)=>{ const n=[...servicesItems]; n[idx].imageUrl=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                        <Textarea className="md:col-span-2" placeholder="الوصف" value={it.description||""} onChange={(e)=>{ const n=[...servicesItems]; n[idx].description=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                        <div className="md:col-span-2 text-right">
                          <Button variant="outline" onClick={()=>{ const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.onchange=async()=>{ const f=(input.files&&input.files[0])||null; if(!f) return; const fd=new FormData(); fd.append('file', f); const res=await fetch('/api/upload',{method:'POST',body:fd}); const d=await res.json(); if(d.url){ const n=[...servicesItems]; n[idx].imageUrl=d.url; setServicesItems(n); setIsDirty(true)} }; input.click() }}>رفع صورة</Button>
                          <Button variant="destructive" onClick={()=>{ const n=[...servicesItems]; n.splice(idx,1); setServicesItems(n); setIsDirty(true) }}>حذف</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">حالات الرئيسية</div>
                    <Button onClick={() => { setCasesItems([...(casesItems||[]), { title: "", description: "", result: "", imageUrl: "" }]); setIsDirty(true) }}>إضافة</Button>
                  </div>
                  <div className="space-y-3">
                    {casesItems?.map((it, idx) => (
                      <div key={idx} className="grid md:grid-cols-2 gap-2 items-start">
                        <Input placeholder="العنوان" value={it.title||""} onChange={(e)=>{ const n=[...casesItems]; n[idx].title=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Input placeholder="النتيجة" value={it.result||""} onChange={(e)=>{ const n=[...casesItems]; n[idx].result=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Input placeholder="رابط الصورة" value={it.imageUrl||""} onChange={(e)=>{ const n=[...casesItems]; n[idx].imageUrl=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Textarea className="md:col-span-2" placeholder="الوصف" value={it.description||""} onChange={(e)=>{ const n=[...casesItems]; n[idx].description=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <div className="md:col-span-2 text-right">
                          <Button variant="outline" onClick={()=>{ const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.onchange=async()=>{ const f=(input.files&&input.files[0])||null; if(!f) return; const fd=new FormData(); fd.append('file', f); const res=await fetch('/api/upload',{method:'POST',body:fd}); const d=await res.json(); if(d.url){ const n=[...casesItems]; n[idx].imageUrl=d.url; setCasesItems(n); setIsDirty(true)} }; input.click() }}>رفع صورة</Button>
                          <Button variant="destructive" onClick={()=>{ const n=[...casesItems]; n.splice(idx,1); setCasesItems(n); setIsDirty(true) }}>حذف</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "services" && selectedPage === "services" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">الخدمات ({lang})</div>
                  <Button
                    onClick={() => {
                      setServicesItems([...(servicesItems || []), { title: "", description: "", features: [], price: "", duration: "", imageUrl: "" }])
                      setIsDirty(true)
                    }}
                  >
                    إضافة خدمة
                  </Button>
                </div>
                <div className="space-y-4">
                  {servicesItems?.map((it, idx) => (
                    <div key={idx} className="border rounded-md p-3 space-y-2">
                      <div className="grid md:grid-cols-2 gap-2">
                        <Input placeholder="العنوان" value={it.title} onChange={(e) => { const n=[...servicesItems]; n[idx].title=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                        <Input placeholder="المدة" value={it.duration || ""} onChange={(e) => { const n=[...servicesItems]; n[idx].duration=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                        <Input placeholder="السعر" value={it.price || ""} onChange={(e) => { const n=[...servicesItems]; n[idx].price=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                        <Input placeholder="رابط الصورة" value={it.imageUrl || ""} onChange={(e) => { const n=[...servicesItems]; n[idx].imageUrl=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                      </div>
                      <Textarea placeholder="الوصف" value={it.description} onChange={(e) => { const n=[...servicesItems]; n[idx].description=e.target.value; setServicesItems(n); setIsDirty(true) }} />
                      <Textarea placeholder="المزايا (كل سطر ميزة)" value={(it.features || []).join("\n")} onChange={(e) => { const n=[...servicesItems]; n[idx].features=e.target.value.split("\n").filter(Boolean); setServicesItems(n); setIsDirty(true) }} />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = async () => {
                              const file = (input.files && input.files[0]) || null
                              if (!file) return
                              const fd = new FormData()
                              fd.append("file", file)
                              const res = await fetch("/api/upload", { method: "POST", body: fd })
                              const d = await res.json()
                              if (d.url) {
                                const n=[...servicesItems]; n[idx].imageUrl=d.url; setServicesItems(n); setIsDirty(true)
                              }
                            }
                            input.click()
                          }}
                        >رفع صورة</Button>
                        <Button variant="destructive" onClick={() => { const n=[...servicesItems]; n.splice(idx,1); setServicesItems(n); setIsDirty(true) }}>حذف</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "cases" && selectedPage === "cases" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">دراسات الحالة ({lang})</div>
                  <Button
                    onClick={() => {
                      setCasesItems([...(casesItems || []), { title: "", client: "", industry: "", duration: "", challenge: "", challengeText: "", solution: "", solutionText: "", results: "", metrics: [], testimonial: "", clientName: "", clientPosition: "", imageUrl: "" }])
                      setIsDirty(true)
                    }}
                  >
                    إضافة دراسة
                  </Button>
                </div>
                <div className="space-y-4">
                  {casesItems?.map((it, idx) => (
                    <div key={idx} className="border rounded-md p-3 space-y-2">
                      <div className="grid md:grid-cols-2 gap-2">
                        <Input placeholder="العنوان" value={it.title} onChange={(e) => { const n=[...casesItems]; n[idx].title=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Input placeholder="العميل" value={it.client || ""} onChange={(e) => { const n=[...casesItems]; n[idx].client=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Input placeholder="الصناعة" value={it.industry || ""} onChange={(e) => { const n=[...casesItems]; n[idx].industry=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Input placeholder="المدة" value={it.duration || ""} onChange={(e) => { const n=[...casesItems]; n[idx].duration=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                        <Input placeholder="رابط الصورة" value={it.imageUrl || ""} onChange={(e) => { const n=[...casesItems]; n[idx].imageUrl=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                      </div>
                      <Textarea placeholder="النص: التحدي" value={it.challengeText || ""} onChange={(e) => { const n=[...casesItems]; n[idx].challengeText=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                      <Textarea placeholder="النص: الحل" value={it.solutionText || ""} onChange={(e) => { const n=[...casesItems]; n[idx].solutionText=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                      <Textarea placeholder="الشهادة/التوصية" value={it.testimonial || ""} onChange={(e) => { const n=[...casesItems]; n[idx].testimonial=e.target.value; setCasesItems(n); setIsDirty(true) }} />
                      <Textarea placeholder="المؤشرات (label:value لكل سطر)" value={(it.metrics || []).map((m:any)=>`${m.label}:${m.value}`).join("\n")} onChange={(e) => { const n=[...casesItems]; n[idx].metrics=e.target.value.split("\n").filter(Boolean).map((ln)=>{ const [label,...rest]=ln.split(":"); return { label: label?.trim(), value: rest.join(":").trim() } }); setCasesItems(n); setIsDirty(true) }} />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = async () => {
                              const file = (input.files && input.files[0]) || null
                              if (!file) return
                              const fd = new FormData()
                              fd.append("file", file)
                              const res = await fetch("/api/upload", { method: "POST", body: fd })
                              const d = await res.json()
                              if (d.url) {
                                const n=[...casesItems]; n[idx].imageUrl=d.url; setCasesItems(n); setIsDirty(true)
                              }
                            }
                            input.click()
                          }}
                        >رفع صورة</Button>
                        <Button variant="destructive" onClick={() => { const n=[...casesItems]; n.splice(idx,1); setCasesItems(n); setIsDirty(true) }}>حذف</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <div className="flex gap-2">
              <Button onClick={() => fetchPage(selectedPage)} variant="outline" disabled={loading}>
                إعادة التحميل
              </Button>
              <Button onClick={handleSave} disabled={loading || !isDirty}>
                {loading ? "جارٍ الحفظ..." : "حفظ"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


