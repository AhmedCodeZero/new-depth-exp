"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  duration: string
  challenge: string
  solution: string
  results: string
  image?: string
}

interface CasesManagerProps {
  cases: CaseStudy[]
  onSave: (cases: CaseStudy[]) => void
  lang: "ar" | "en"
}

export default function CasesManager({ cases, onSave, lang }: CasesManagerProps) {
  const [casesList, setCasesList] = useState<CaseStudy[]>(cases)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCase, setNewCase] = useState<Partial<CaseStudy>>({})
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAdd = () => {
    if (!newCase.title || !newCase.client || !newCase.challenge) return
    
    const caseStudy: CaseStudy = {
      id: Date.now().toString(),
      title: newCase.title,
      client: newCase.client,
      industry: newCase.industry || "",
      duration: newCase.duration || "",
      challenge: newCase.challenge,
      solution: newCase.solution || "",
      results: newCase.results || "",
      image: newCase.image
    }
    
    setCasesList([...casesList, caseStudy])
    setNewCase({})
    setShowAddForm(false)
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    setEditingId(null)
    onSave(casesList)
  }

  const handleDelete = (id: string) => {
    setCasesList(casesList.filter(c => c.id !== id))
    onSave(casesList.filter(c => c.id !== id))
  }

  const updateCase = (id: string, field: keyof CaseStudy, value: any) => {
    setCasesList(casesList.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {lang === "ar" ? "إدارة دراسات الحالة" : "Case Studies Management"}
        </h3>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {lang === "ar" ? "إضافة دراسة حالة" : "Add Case Study"}
        </Button>
      </div>

      {/* Add New Case Form */}
      {showAddForm && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              {lang === "ar" ? "إضافة دراسة حالة جديدة" : "Add New Case Study"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "عنوان المشروع *" : "Project Title *"}
                </label>
                <Input
                  value={newCase.title || ""}
                  onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: تطوير استراتيجية النمو" : "e.g., Growth Strategy Development"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "اسم العميل *" : "Client Name *"}
                </label>
                <Input
                  value={newCase.client || ""}
                  onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: شركة التقنية المتقدمة" : "e.g., Advanced Tech Company"}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "الصناعة" : "Industry"}
                </label>
                <Input
                  value={newCase.industry || ""}
                  onChange={(e) => setNewCase({...newCase, industry: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: التكنولوجيا" : "e.g., Technology"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "مدة المشروع" : "Project Duration"}
                </label>
                <Input
                  value={newCase.duration || ""}
                  onChange={(e) => setNewCase({...newCase, duration: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: 6 أشهر" : "e.g., 6 months"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "التحدي الرئيسي *" : "Main Challenge *"}
              </label>
              <Textarea
                value={newCase.challenge || ""}
                onChange={(e) => setNewCase({...newCase, challenge: e.target.value})}
                rows={3}
                placeholder={lang === "ar" ? "وصف التحدي الذي واجهه العميل..." : "Describe the challenge the client faced..."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "الحل المقدم" : "Solution Provided"}
              </label>
              <Textarea
                value={newCase.solution || ""}
                onChange={(e) => setNewCase({...newCase, solution: e.target.value})}
                rows={3}
                placeholder={lang === "ar" ? "وصف الحل الذي قدمناه..." : "Describe the solution we provided..."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "النتائج المحققة" : "Results Achieved"}
              </label>
              <Textarea
                value={newCase.results || ""}
                onChange={(e) => setNewCase({...newCase, results: e.target.value})}
                rows={3}
                placeholder={lang === "ar" ? "وصف النتائج المحققة..." : "Describe the results achieved..."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "رابط الصورة" : "Image URL"}
              </label>
              <Input
                value={newCase.image || ""}
                onChange={(e) => setNewCase({...newCase, image: e.target.value})}
                placeholder={lang === "ar" ? "رابط الصورة (اختياري)" : "Image URL (optional)"}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {lang === "ar" ? "إضافة" : "Add"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                <X className="w-4 h-4 mr-2" />
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cases List */}
      <div className="space-y-4">
        {casesList.map((caseStudy) => (
          <Card key={caseStudy.id} className="border border-gray-200">
            <CardContent className="p-6">
              {editingId === caseStudy.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "العنوان" : "Title"}
                      </label>
                      <Input
                        value={caseStudy.title}
                        onChange={(e) => updateCase(caseStudy.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "العميل" : "Client"}
                      </label>
                      <Input
                        value={caseStudy.client}
                        onChange={(e) => updateCase(caseStudy.id, "client", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "الصناعة" : "Industry"}
                      </label>
                      <Input
                        value={caseStudy.industry}
                        onChange={(e) => updateCase(caseStudy.id, "industry", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "المدة" : "Duration"}
                      </label>
                      <Input
                        value={caseStudy.duration}
                        onChange={(e) => updateCase(caseStudy.id, "duration", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "التحدي" : "Challenge"}
                    </label>
                    <Textarea
                      value={caseStudy.challenge}
                      onChange={(e) => updateCase(caseStudy.id, "challenge", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "الحل" : "Solution"}
                    </label>
                    <Textarea
                      value={caseStudy.solution}
                      onChange={(e) => updateCase(caseStudy.id, "solution", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "النتائج" : "Results"}
                    </label>
                    <Textarea
                      value={caseStudy.results}
                      onChange={(e) => updateCase(caseStudy.id, "results", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "رابط الصورة" : "Image URL"}
                    </label>
                    <Input
                      value={caseStudy.image || ""}
                      onChange={(e) => updateCase(caseStudy.id, "image", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(caseStudy.id)} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      {lang === "ar" ? "حفظ" : "Save"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setEditingId(null)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      {lang === "ar" ? "إلغاء" : "Cancel"}
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{caseStudy.title}</h4>
                      <p className="text-gray-600 mt-1">
                        {lang === "ar" ? "العميل:" : "Client:"} {caseStudy.client}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(caseStudy.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {lang === "ar" ? "تعديل" : "Edit"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(caseStudy.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {lang === "ar" ? "حذف" : "Delete"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                    {caseStudy.industry && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {lang === "ar" ? "الصناعة:" : "Industry:"}
                        </span>
                        <span className="ml-2 text-gray-600">{caseStudy.industry}</span>
                      </div>
                    )}
                    {caseStudy.duration && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {lang === "ar" ? "المدة:" : "Duration:"}
                        </span>
                        <span className="ml-2 text-gray-600">{caseStudy.duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">
                        {lang === "ar" ? "التحدي:" : "Challenge:"}
                      </h5>
                      <p className="text-gray-600 text-sm">{caseStudy.challenge}</p>
                    </div>
                    
                    {caseStudy.solution && (
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          {lang === "ar" ? "الحل:" : "Solution:"}
                        </h5>
                        <p className="text-gray-600 text-sm">{caseStudy.solution}</p>
                      </div>
                    )}
                    
                    {caseStudy.results && (
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">
                          {lang === "ar" ? "النتائج:" : "Results:"}
                        </h5>
                        <p className="text-gray-600 text-sm">{caseStudy.results}</p>
                      </div>
                    )}
                  </div>

                  {caseStudy.image && (
                    <div className="mt-4">
                      <span className="font-medium text-gray-700">
                        {lang === "ar" ? "الصورة:" : "Image:"}
                      </span>
                      <span className="ml-2 text-gray-600 text-blue-600 underline">
                        <a href={caseStudy.image} target="_blank" rel="noopener noreferrer">
                          {lang === "ar" ? "عرض" : "View"}
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {casesList.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>{lang === "ar" ? "لا توجد دراسات حالة مضافة بعد" : "No case studies added yet"}</p>
        </div>
      )}
    </div>
  )
}
