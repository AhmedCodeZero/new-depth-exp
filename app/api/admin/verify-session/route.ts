import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTHORIZED_USERS = [
  { email: "dr.safar7@gmail.com", password: "Dd@112233" },
  { email: "ahmedcodzero@gmail.com", password: "Asdfahmad@depth" }
]

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
    const authorizedEmails = AUTHORIZED_USERS.map(user => user.email)
    return authorizedEmails.includes(decoded.email)
  } catch (error) {
    return false
  }
}

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get('admin_session')?.value || 
                      request.headers.get('authorization')?.replace('Bearer ', '') ||
                      request.headers.get('x-admin-session')

  if (!sessionToken) {
    return NextResponse.json({ 
      valid: false, 
      message: 'No session token provided' 
    }, { status: 401 })
  }

  if (!isValidSession(sessionToken)) {
    return NextResponse.json({ 
      valid: false, 
      message: 'Invalid or expired session' 
    }, { status: 401 })
  }

  return NextResponse.json({ 
    valid: true, 
    message: 'Session is valid' 
  })
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // التحقق من بيانات المستخدم
    const user = AUTHORIZED_USERS.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json({ 
        valid: false, 
        message: 'Invalid credentials' 
      }, { status: 401 })
    }

    // إنشاء رمز جلسة آمن
    const sessionToken = btoa(JSON.stringify({
      email: user.email,
      timestamp: Date.now(),
      random: Math.random().toString(36).substring(2)
    }))

    const response = NextResponse.json({ 
      valid: true, 
      message: 'Login successful',
      sessionToken 
    })

    // تعيين الكوكيز
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 ساعة
    })

    return response

  } catch (error) {
    return NextResponse.json({ 
      valid: false, 
      message: 'Server error' 
    }, { status: 500 })
  }
}
