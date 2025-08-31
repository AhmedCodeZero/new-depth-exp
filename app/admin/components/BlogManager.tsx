"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image?: string
}

interface BlogManagerProps {
  posts: BlogPost[]
  onSave: (posts: BlogPost[]) => void
  lang: "ar" | "en"
}

export default function BlogManager({ posts, onSave, lang }: BlogManagerProps) {
  const [postsList, setPostsList] = useState<BlogPost[]>(posts)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({})
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAdd = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.content) return
    
    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: newPost.author || "",
      date: newPost.date || new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US"),
      category: newPost.category || "",
      image: newPost.image
    }
    
    setPostsList([...postsList, post])
    setNewPost({})
    setShowAddForm(false)
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = (id: string) => {
    setEditingId(null)
    onSave(postsList)
  }

  const handleDelete = (id: string) => {
    setPostsList(postsList.filter(p => p.id !== id))
    onSave(postsList.filter(p => p.id !== id))
  }

  const updatePost = (id: string, field: keyof BlogPost, value: any) => {
    setPostsList(postsList.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {lang === "ar" ? "إدارة المدونة" : "Blog Management"}
        </h3>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {lang === "ar" ? "إضافة مقال" : "Add Post"}
        </Button>
      </div>

      {/* Add New Post Form */}
      {showAddForm && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">
              {lang === "ar" ? "إضافة مقال جديد" : "Add New Blog Post"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "عنوان المقال *" : "Post Title *"}
                </label>
                <Input
                  value={newPost.title || ""}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: مستقبل التحول الرقمي" : "e.g., Future of Digital Transformation"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "الكاتب" : "Author"}
                </label>
                <Input
                  value={newPost.author || ""}
                  onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: أحمد محمد" : "e.g., Ahmed Mohamed"}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "التصنيف" : "Category"}
                </label>
                <Input
                  value={newPost.category || ""}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: التكنولوجيا" : "e.g., Technology"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {lang === "ar" ? "التاريخ" : "Date"}
                </label>
                <Input
                  value={newPost.date || ""}
                  onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                  placeholder={lang === "ar" ? "مثال: 15 يناير 2024" : "e.g., January 15, 2024"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "ملخص المقال *" : "Post Excerpt *"}
              </label>
              <Textarea
                value={newPost.excerpt || ""}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                rows={3}
                placeholder={lang === "ar" ? "ملخص مختصر للمقال..." : "Brief summary of the post..."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "محتوى المقال *" : "Post Content *"}
              </label>
              <Textarea
                value={newPost.content || ""}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows={8}
                placeholder={lang === "ar" ? "المحتوى الكامل للمقال..." : "Full post content..."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === "ar" ? "رابط الصورة" : "Image URL"}
              </label>
              <Input
                value={newPost.image || ""}
                onChange={(e) => setNewPost({...newPost, image: e.target.value})}
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

      {/* Posts List */}
      <div className="space-y-4">
        {postsList.map((post) => (
          <Card key={post.id} className="border border-gray-200">
            <CardContent className="p-6">
              {editingId === post.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "العنوان" : "Title"}
                      </label>
                      <Input
                        value={post.title}
                        onChange={(e) => updatePost(post.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "الكاتب" : "Author"}
                      </label>
                      <Input
                        value={post.author}
                        onChange={(e) => updatePost(post.id, "author", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "التصنيف" : "Category"}
                      </label>
                      <Input
                        value={post.category}
                        onChange={(e) => updatePost(post.id, "category", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {lang === "ar" ? "التاريخ" : "Date"}
                      </label>
                      <Input
                        value={post.date}
                        onChange={(e) => updatePost(post.id, "date", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "الملخص" : "Excerpt"}
                    </label>
                    <Textarea
                      value={post.excerpt}
                      onChange={(e) => updatePost(post.id, "excerpt", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "المحتوى" : "Content"}
                    </label>
                    <Textarea
                      value={post.content}
                      onChange={(e) => updatePost(post.id, "content", e.target.value)}
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {lang === "ar" ? "رابط الصورة" : "Image URL"}
                    </label>
                    <Input
                      value={post.image || ""}
                      onChange={(e) => updatePost(post.id, "image", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(post.id)} className="bg-green-600 hover:bg-green-700">
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
                      <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        {post.author && (
                          <span>{lang === "ar" ? "الكاتب:" : "Author:"} {post.author}</span>
                        )}
                        {post.date && (
                          <span>{lang === "ar" ? "التاريخ:" : "Date:"} {post.date}</span>
                        )}
                        {post.category && (
                          <span>{lang === "ar" ? "التصنيف:" : "Category:"} {post.category}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {lang === "ar" ? "تعديل" : "Edit"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {lang === "ar" ? "حذف" : "Delete"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">
                        {lang === "ar" ? "الملخص:" : "Excerpt:"}
                      </h5>
                      <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">
                        {lang === "ar" ? "المحتوى:" : "Content:"}
                      </h5>
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {post.content.length > 200 
                          ? `${post.content.substring(0, 200)}...` 
                          : post.content
                        }
                      </p>
                      {post.content.length > 200 && (
                        <Button
                          size="sm"
                          variant="link"
                          className="text-blue-600 p-0 h-auto"
                          onClick={() => alert(post.content)}
                        >
                          {lang === "ar" ? "قراءة المزيد" : "Read More"}
                        </Button>
                      )}
                    </div>
                  </div>

                  {post.image && (
                    <div className="mt-4">
                      <span className="font-medium text-gray-700">
                        {lang === "ar" ? "الصورة:" : "Image:"}
                      </span>
                      <span className="ml-2 text-gray-600 text-blue-600 underline">
                        <a href={post.image} target="_blank" rel="noopener noreferrer">
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

      {postsList.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>{lang === "ar" ? "لا توجد مقالات مضافة بعد" : "No blog posts added yet"}</p>
        </div>
      )}
    </div>
  )
}
