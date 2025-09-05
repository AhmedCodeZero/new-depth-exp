import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// قائمة الصفحات المحمية
const PROTECTED_PATHS = ['/admin']

// التحقق من صحة الجلسة
function isValidSession(sessionToken: string): boolean {
  try {
    const decoded = JSON.parse(atob(sessionToken))
    
    // التحقق من وجود البيانات المطلوبة
    if (!decoded.email || !decoded.timestamp || !decoded.random) {
      return false
    }

    // التحقق من أن الجلسة لم تنته صلاحيتها (24 ساعة)
    const sessionAge = Date.now() - decoded.timestamp
    const maxAge = 24 * 60 * 60 * 1000 // 24 ساعة بالميلي ثانية
    
    if (sessionAge > maxAge) {
      return false
    }

    // التحقق من أن البريد الإلكتروني مسموح
    const authorizedEmails = [
      'dr.safar7@gmail.com',
      'ahmedcodzero@gmail.com'
    ]
    
    return authorizedEmails.includes(decoded.email)
  } catch (error) {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // التحقق من أن المسار محمي
  const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  
  if (isProtectedPath) {
    // استثناء صفحة تسجيل الدخول
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // التحقق من وجود رمز الجلسة
    const sessionToken = request.cookies.get('admin_session')?.value || 
                        request.headers.get('authorization')?.replace('Bearer ', '') ||
                        request.headers.get('x-admin-session')

    if (!sessionToken || !isValidSession(sessionToken)) {
      // إعادة التوجيه إلى صفحة تسجيل الدخول
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
