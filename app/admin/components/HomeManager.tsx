"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Home, 
  Users, 
  Target, 
  FileText, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Globe
} from "lucide-react"

interface HomeContent {
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
    }
    services: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        imageUrl: string
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
    }
    services: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        imageUrl: string
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

export default function HomeManager() {
  const [content, setContent] = useState<HomeContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeLanguage, setActiveLanguage] = useState<"ar" | "en">("ar")
  const [editingService, setEditingService] = useState<number | null>(null)
  const [editingCase, setEditingCase] = useState<number | null>(null)
  const [editingBlog, setEditingBlog] = useState<number | null>(null)

  // Load content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/content/home')
        if (response.ok) {
          const data = await response.json()
          setContent(data)
        } else {
          setError('فشل في تحميل المحتوى')
        }
      } catch (error) {
        setError('خطأ في تحميل المحتوى')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  // Save content
  const handleSave = async () => {
    if (!content) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/content/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        setSuccess('تم حفظ المحتوى بنجاح')
      } else {
        setError('فشل في حفظ المحتوى')
      }
    } catch (error) {
      setError('خطأ في حفظ المحتوى')
    } finally {
      setSaving(false)
    }
  }

  // Add new service
  const addService = () => {
    if (!content) return

    const newService = {
      title: "خدمة جديدة",
      description: "وصف الخدمة الجديدة",
      imageUrl: ""
    }

    setContent({
      ...content,
      [activeLanguage]: {
        ...content[activeLanguage],
        services: {
          ...content[activeLanguage].services,
          items: [...content[activeLanguage].services.items, newService]
        }
      }
    })
  }

  // Delete service
  const deleteService = (index: number) => {
    if (!content) return

    const newItems = content[activeLanguage].services.items.filter((_, i) => i !== index)
    setContent({
      ...content,
      [activeLanguage]: {
        ...content[activeLanguage],
        services: {
          ...content[activeLanguage].services,
          items: newItems
        }
      }
    })
  }

  // Add new case
  const addCase = () => {
    if (!content) return

    const newCase = {
      title: "دراسة حالة جديدة",
      description: "وصف دراسة الحالة الجديدة",
      result: "النتيجة المحققة",
      imageUrl: ""
    }

    setContent({
      ...content,
      [activeLanguage]: {
        ...content[activeLanguage],
        cases: {
          ...content[activeLanguage].cases,
          items: [...content[activeLanguage].cases.items, newCase]
        }
      }
    })
  }

  // Delete case
  const deleteCase = (index: number) => {
    if (!content) return

    const newItems = content[activeLanguage].cases.items.filter((_, i) => i !== index)
    setContent({
      ...content,
      [activeLanguage]: {
        ...content[activeLanguage],
        cases: {
          ...content[activeLanguage].cases,
          items: newItems
        }
      }
    })
  }

  // Add new blog post
  const addBlogPost = () => {
    if (!content) return

    const newPost = {
      title: "مقال جديد",
      excerpt: "ملخص المقال الجديد",
      date: new Date().toLocaleDateString('ar-SA'),
      imageUrl: ""
    }

    setContent({
      ...content,
      [activeLanguage]: {
        ...content[activeLanguage],
        blog: {
          ...content[activeLanguage].blog,
          items: [...content[activeLanguage].blog.items, newPost]
        }
      }
    })
  }

  // Delete blog post
  const deleteBlogPost = (index: number) => {
    if (!content) return

    const newItems = content[activeLanguage].blog.items.filter((_, i) => i !== index)
    setContent({
      ...content,
      [activeLanguage]: {
        ...content[activeLanguage],
        blog: {
          ...content[activeLanguage].blog,
          items: newItems
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4a90a4] mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">جاري تحميل المحتوى...</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">فشل في تحميل المحتوى</p>
      </div>
    )
  }

  const currentContent = content?.[activeLanguage] || {
    nav: { home: "", services: "", cases: "", blog: "", contact: "" },
    hero: { title: "", subtitle: "", cta: "" },
    services: { title: "", subtitle: "", items: [] },
    cases: { title: "", subtitle: "", items: [] },
    blog: { title: "", subtitle: "", items: [] },
    contact: { 
      title: "", 
      subtitle: "", 
      name: "", 
      email: "", 
      phone: "", 
      company: "", 
      service: "", 
      message: "", 
      send: "",
      info: { email: "", phone: "", address: "" }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#1e3a5f] to-[#4a90a4] rounded-lg">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1e3a5f]">إدارة الصفحة الرئيسية</h2>
            <p className="text-gray-600">تعديل محتوى الصفحة الرئيسية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeLanguage === "ar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveLanguage("ar")}
              className="text-sm"
            >
              العربية
            </Button>
            <Button
              variant={activeLanguage === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveLanguage("en")}
              className="text-sm"
            >
              English
            </Button>
          </div>
          
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                حفظ...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                حفظ التغييرات
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{success}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            القسم الرئيسي
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            الخدمات
          </TabsTrigger>
          <TabsTrigger value="cases" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            دراسات الحالة
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            المدونة
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            التواصل
          </TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                القسم الرئيسي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
                <Input
                  value={currentContent.hero?.title || ""}
                  onChange={(e) => setContent({
                    ...content,
                    [activeLanguage]: {
                      ...content[activeLanguage],
                      hero: {
                        ...content[activeLanguage].hero,
                        title: e.target.value
                      }
                    }
                  })}
                  placeholder="العنوان الرئيسي"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <Textarea
                  value={currentContent.hero?.subtitle || ""}
                  onChange={(e) => setContent({
                    ...content,
                    [activeLanguage]: {
                      ...content[activeLanguage],
                      hero: {
                        ...content[activeLanguage].hero,
                        subtitle: e.target.value
                      }
                    }
                  })}
                  placeholder="العنوان الفرعي"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">نص الزر</label>
                <Input
                  value={currentContent.hero?.cta || ""}
                  onChange={(e) => setContent({
                    ...content,
                    [activeLanguage]: {
                      ...content[activeLanguage],
                      hero: {
                        ...content[activeLanguage].hero,
                        cta: e.target.value
                      }
                    }
                  })}
                  placeholder="نص الزر"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  الخدمات
                </CardTitle>
                <Button onClick={addService} size="sm" className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة خدمة
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                  <Input
                    value={currentContent.services?.title || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        services: {
                          ...content[activeLanguage].services,
                          title: e.target.value
                        }
                      }
                    })}
                    placeholder="عنوان قسم الخدمات"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف القسم</label>
                  <Input
                    value={currentContent.services?.subtitle || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        services: {
                          ...content[activeLanguage].services,
                          subtitle: e.target.value
                        }
                      }
                    })}
                    placeholder="وصف قسم الخدمات"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">قائمة الخدمات</h4>
                {(currentContent.services?.items || []).map((service, index) => (
                  <Card key={index} className="border-2 border-gray-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">الخدمة {index + 1}</Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingService(editingService === index ? null : index)}
                          >
                            {editingService === index ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteService(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">عنوان الخدمة</label>
                          <Input
                            value={service.title}
                            onChange={(e) => {
                              const newItems = [...(currentContent.services?.items || [])]
                              newItems[index] = { ...service, title: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  services: {
                                    ...content[activeLanguage].services,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="عنوان الخدمة"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">وصف الخدمة</label>
                          <Textarea
                            value={service.description}
                            onChange={(e) => {
                              const newItems = [...(currentContent.services?.items || [])]
                              newItems[index] = { ...service, description: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  services: {
                                    ...content[activeLanguage].services,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="وصف الخدمة"
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">رابط الصورة (اختياري)</label>
                          <Input
                            value={service.imageUrl}
                            onChange={(e) => {
                              const newItems = [...(currentContent.services?.items || [])]
                              newItems[index] = { ...service, imageUrl: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  services: {
                                    ...content[activeLanguage].services,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="رابط الصورة"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cases Section */}
        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  دراسات الحالة
                </CardTitle>
                <Button onClick={addCase} size="sm" className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة دراسة حالة
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                  <Input
                    value={currentContent.cases?.title || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        cases: {
                          ...content[activeLanguage].cases,
                          title: e.target.value
                        }
                      }
                    })}
                    placeholder="عنوان قسم دراسات الحالة"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف القسم</label>
                  <Input
                    value={currentContent.cases?.subtitle || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        cases: {
                          ...content[activeLanguage].cases,
                          subtitle: e.target.value
                        }
                      }
                    })}
                    placeholder="وصف قسم دراسات الحالة"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">قائمة دراسات الحالة</h4>
                {(currentContent.cases?.items || []).map((caseItem, index) => (
                  <Card key={index} className="border-2 border-gray-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">دراسة الحالة {index + 1}</Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCase(editingCase === index ? null : index)}
                          >
                            {editingCase === index ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteCase(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">عنوان دراسة الحالة</label>
                          <Input
                            value={caseItem.title}
                            onChange={(e) => {
                              const newItems = [...(currentContent.cases?.items || [])]
                              newItems[index] = { ...caseItem, title: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  cases: {
                                    ...content[activeLanguage].cases,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="عنوان دراسة الحالة"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">وصف دراسة الحالة</label>
                          <Textarea
                            value={caseItem.description}
                            onChange={(e) => {
                              const newItems = [...(currentContent.cases?.items || [])]
                              newItems[index] = { ...caseItem, description: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  cases: {
                                    ...content[activeLanguage].cases,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="وصف دراسة الحالة"
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">النتيجة المحققة</label>
                          <Input
                            value={caseItem.result}
                            onChange={(e) => {
                              const newItems = [...(currentContent.cases?.items || [])]
                              newItems[index] = { ...caseItem, result: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  cases: {
                                    ...content[activeLanguage].cases,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="النتيجة المحققة"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">رابط الصورة (اختياري)</label>
                          <Input
                            value={caseItem.imageUrl}
                            onChange={(e) => {
                              const newItems = [...(currentContent.cases?.items || [])]
                              newItems[index] = { ...caseItem, imageUrl: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  cases: {
                                    ...content[activeLanguage].cases,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="رابط الصورة"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Section */}
        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  المدونة
                </CardTitle>
                <Button onClick={addBlogPost} size="sm" className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4]">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مقال
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                  <Input
                    value={currentContent.blog?.title || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        blog: {
                          ...content[activeLanguage].blog,
                          title: e.target.value
                        }
                      }
                    })}
                    placeholder="عنوان قسم المدونة"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف القسم</label>
                  <Input
                    value={currentContent.blog?.subtitle || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        blog: {
                          ...content[activeLanguage].blog,
                          subtitle: e.target.value
                        }
                      }
                    })}
                    placeholder="وصف قسم المدونة"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">قائمة المقالات</h4>
                {(currentContent.blog?.items || []).map((post, index) => (
                  <Card key={index} className="border-2 border-gray-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">المقال {index + 1}</Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingBlog(editingBlog === index ? null : index)}
                          >
                            {editingBlog === index ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteBlogPost(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">عنوان المقال</label>
                          <Input
                            value={post.title}
                            onChange={(e) => {
                              const newItems = [...(currentContent.blog?.items || [])]
                              newItems[index] = { ...post, title: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  blog: {
                                    ...content[activeLanguage].blog,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="عنوان المقال"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">ملخص المقال</label>
                          <Textarea
                            value={post.excerpt}
                            onChange={(e) => {
                              const newItems = [...(currentContent.blog?.items || [])]
                              newItems[index] = { ...post, excerpt: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  blog: {
                                    ...content[activeLanguage].blog,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="ملخص المقال"
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">التاريخ</label>
                          <Input
                            value={post.date}
                            onChange={(e) => {
                              const newItems = [...(currentContent.blog?.items || [])]
                              newItems[index] = { ...post, date: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  blog: {
                                    ...content[activeLanguage].blog,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="تاريخ المقال"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">رابط الصورة (اختياري)</label>
                          <Input
                            value={post.imageUrl}
                            onChange={(e) => {
                              const newItems = [...(currentContent.blog?.items || [])]
                              newItems[index] = { ...post, imageUrl: e.target.value }
                              setContent({
                                ...content,
                                [activeLanguage]: {
                                  ...content[activeLanguage],
                                  blog: {
                                    ...content[activeLanguage].blog,
                                    items: newItems
                                  }
                                }
                              })
                            }}
                            placeholder="رابط الصورة"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Section */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                معلومات التواصل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                  <Input
                    value={currentContent.contact?.title || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        contact: {
                          ...content[activeLanguage].contact,
                          title: e.target.value
                        }
                      }
                    })}
                    placeholder="عنوان قسم التواصل"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">وصف القسم</label>
                  <Input
                    value={currentContent.contact?.subtitle || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        contact: {
                          ...content[activeLanguage].contact,
                          subtitle: e.target.value
                        }
                      }
                    })}
                    placeholder="وصف قسم التواصل"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <Input
                    value={currentContent.contact?.info?.email || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        contact: {
                          ...content[activeLanguage].contact,
                          info: {
                            ...content[activeLanguage].contact.info,
                            email: e.target.value
                          }
                        }
                      }
                    })}
                    placeholder="البريد الإلكتروني"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                  <Input
                    value={currentContent.contact?.info?.phone || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        contact: {
                          ...content[activeLanguage].contact,
                          info: {
                            ...content[activeLanguage].contact.info,
                            phone: e.target.value
                          }
                        }
                      }
                    })}
                    placeholder="رقم الهاتف"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">العنوان</label>
                  <Input
                    value={currentContent.contact?.info?.address || ""}
                    onChange={(e) => setContent({
                      ...content,
                      [activeLanguage]: {
                        ...content[activeLanguage],
                        contact: {
                          ...content[activeLanguage].contact,
                          info: {
                            ...content[activeLanguage].contact.info,
                            address: e.target.value
                          }
                        }
                      }
                    })}
                    placeholder="العنوان"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
