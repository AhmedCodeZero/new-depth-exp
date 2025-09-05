"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"

const AUTHORIZED_USERS = [
  { email: "dr.safar7@gmail.com", password: "Dd@112233" },
  { email: "ahmedcodzero@gmail.com", password: "Asdfahmad@depth" }
]

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log('محاولة تسجيل الدخول:', { email, password: '***' })
      
      // التحقق من بيانات المستخدم
      const user = AUTHORIZED_USERS.find(u => u.email === email && u.password === password)
      
      if (!user) {
        console.log('بيانات الدخول غير صحيحة')
        setError("بيانات الدخول غير صحيحة")
        setIsLoading(false)
        return
      }

      console.log('تم العثور على مستخدم:', user.email)

      // إنشاء رمز جلسة آمن
      const sessionToken = btoa(JSON.stringify({
        email: user.email,
        timestamp: Date.now(),
        random: Math.random().toString(36).substring(2)
      }))

      console.log('تم إنشاء رمز الجلسة:', sessionToken)

      // حفظ الرمز في localStorage والكوكيز
      localStorage.setItem('admin_session', sessionToken)
      
      // تعيين الكوكيز
      document.cookie = `admin_session=${sessionToken}; path=/; max-age=${24 * 60 * 60}; samesite=strict`
      
      console.log('تم حفظ الجلسة، إعادة التوجيه...')
      
      // إعادة التوجيه إلى لوحة التحكم
      router.push('/admin')
      
    } catch (err) {
      console.error('خطأ في تسجيل الدخول:', err)
      setError("حدث خطأ في تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1e3a5f] to-[#0f1419] relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-[#6bb6c7]/10 to-[#4a90a4]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-[#1e3a5f]/10 to-[#4a90a4]/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-full mb-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium border border-white/20">
              <Shield className="w-5 h-5 inline mr-2" />
              لوحة التحكم الآمنة
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              تسجيل الدخول
            </span>
          </h1>
          <p className="text-white/80">
            يرجى تسجيل الدخول للوصول إلى لوحة التحكم
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a90a4]/5 to-[#6bb6c7]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white rounded-t-lg relative z-10">
            <CardTitle className="flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <Lock className="w-5 h-5" />
              </div>
              تسجيل الدخول الآمن
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="pr-10 h-12 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="pr-10 pl-10 h-12 border-2 border-gray-200 focus:border-[#4a90a4] focus:ring-4 focus:ring-[#4a90a4]/10 rounded-xl transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-3" />
                    تسجيل الدخول
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">تنبيه أمني</h4>
                  <p className="text-sm text-blue-700">
                    هذه الصفحة محمية بأعلى معايير الأمان. جميع محاولات الوصول غير المصرح بها يتم تسجيلها ومراقبتها.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2024 عمق - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </div>
  )
}
