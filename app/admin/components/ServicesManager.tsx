"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  duration: string
  image?: string
}

interface ServicesManagerProps {
  services: Service[]
  onSave: (services: Service[]) => void
  lang: "ar" | "en"
}

export default function ServicesManager({ services, onSave, lang }: ServicesManagerProps) {
  const [servicesList, setServicesList] = useState<Service[]>(services)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newService, setNewService] = useState<Partial<Service>>({})
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAdd = () => {
    if (!newService.title || !newService.description) return
    
    const service: Service = {
      id: Date.now().toString(),
      title: newService.title,
      description: newService.description,
      features: newService.features || [],
      price: newService.price || "",
      duration: newService.duration || "",
      image: newService.image
    }
    
    setServicesList([...servicesList, service])
    setNewService({})
    setShowAddForm(false)
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    setEditingId(null)
    onSave(servicesList)
  }

  const handleDelete = (id: string) => {
    setServicesList(servicesList.filter(s => s.id !== id))
    onSave(servicesList.filter(s => s.id !== id))
  }

  const updateService = (id: string, field: keyof Service, value: any) => {
    setServicesList(servicesList.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const addFeature = (id: string) => {
    const service = servicesList.find(s => s.id === id)
    if (service) {
      const newFeature = prompt(lang === "ar" ? "أدخل الميزة الجديدة:" : "Enter new feature:")
      if (newFeature) {
        updateService(id, "features", [...service.features, newFeature])
      }
    }
  }

  const removeFeature = (id: string, featureIndex: number) => {
    const service = servicesList.find(s => s.id === id)
    if (service) {
      const newFeatures = service.features.filter((_, index) => index !== featureIndex)
      updateService(id, "features", newFeatures)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {lang === "ar" ? "إدارة الخدمات" : "Services Management"}
        </h3>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {lang === "ar" ? "إضافة خدمة" : "Add Service"}
        </Button>
      </div>

      {/* Add New Service Form */}
      {showAddForm && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">
              {lang === "ar" ? "إضافة خدمة جديدة" : "Add New Service"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "عنوان الخدمة *" : "Service Title *"}
                </label>
                <Input
                  value={newService.title || ""}
                  onChange={(e) => setNewService({...newService, title: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: الاستشارات الإدارية" : "e.g., Management Consulting"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "السعر" : "Price"}
                </label>
                <Input
                  value={newService.price || ""}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: 5000 ريال" : "e.g., $5000"}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "وصف الخدمة *" : "Service Description *"}
              </label>
              <Textarea
                value={newService.description || ""}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                rows={3}
                placeholder={lang === "ar" ? "وصف مفصل للخدمة..." : "Detailed service description..."}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "مدة الخدمة" : "Duration"}
                </label>
                <Input
                  value={newService.duration || ""}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: 3 أشهر" : "e.g., 3 months"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "رابط الصورة" : "Image URL"}
                </label>
                <Input
                  value={newService.image || ""}
                  onChange={(e) => setNewService({...newService, image: e.target.value})}
                  placeholder={lang === "ar" ? "رابط الصورة (اختياري)" : "Image URL (optional)"}
                />
              </div>
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

      {/* Services List */}
      <div className="space-y-4">
        {servicesList.map((service) => (
          <Card key={service.id} className="border border-gray-200">
            <CardContent className="p-6">
              {editingId === service.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "العنوان" : "Title"}
                      </label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(service.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "السعر" : "Price"}
                      </label>
                      <Input
                        value={service.price}
                        onChange={(e) => updateService(service.id, "price", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "الوصف" : "Description"}
                    </label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => updateService(service.id, "description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "المدة" : "Duration"}
                      </label>
                      <Input
                        value={service.duration}
                        onChange={(e) => updateService(service.id, "duration", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "رابط الصورة" : "Image URL"}
                      </label>
                      <Input
                        value={service.image || ""}
                        onChange={(e) => updateService(service.id, "image", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Features Management */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">
                        {lang === "ar" ? "المزايا" : "Features"}
                      </label>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addFeature(service.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {lang === "ar" ? "إضافة ميزة" : "Add Feature"}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...service.features]
                              newFeatures[index] = e.target.value
                              updateService(service.id, "features", newFeatures)
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFeature(service.id, index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(service.id)} className="bg-green-600 hover:bg-green-700">
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
                      <h4 className="text-lg font-semibold text-gray-900">{service.title}</h4>
                      <p className="text-gray-600 mt-1">{service.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {lang === "ar" ? "تعديل" : "Edit"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {lang === "ar" ? "حذف" : "Delete"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    {service.price && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {lang === "ar" ? "السعر:" : "Price:"}
                        </span>
                        <span className="ml-2 text-gray-600">{service.price}</span>
                      </div>
                    )}
                    {service.duration && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {lang === "ar" ? "المدة:" : "Duration:"}
                        </span>
                        <span className="ml-2 text-gray-600">{service.duration}</span>
                      </div>
                    )}
                    {service.image && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {lang === "ar" ? "الصورة:" : "Image:"}
                        </span>
                        <span className="ml-2 text-gray-600 text-blue-600 underline">
                          <a href={service.image} target="_blank" rel="noopener noreferrer">
                            {lang === "ar" ? "عرض" : "View"}
                          </a>
                        </span>
                      </div>
                    )}
                  </div>

                  {service.features.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-700 mb-2">
                        {lang === "ar" ? "المزايا:" : "Features:"}
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {servicesList.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>{lang === "ar" ? "لا توجد خدمات مضافة بعد" : "No services added yet"}</p>
        </div>
      )}
    </div>
  )
}
