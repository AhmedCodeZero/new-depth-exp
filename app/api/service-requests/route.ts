import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Service request received:', body);
    
    // التحقق من البيانات المطلوبة
    const requiredFields = ['fullName', 'email', 'phone', 'projectDescription'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // إدراج البيانات في قاعدة البيانات
    console.log('Attempting to insert into service_requests table...');
    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          full_name: body.fullName,
          email: body.email,
          phone: body.phone,
          company: body.company || null,
          position: body.position || null,
          service_title: body.serviceTitle || null,
          service_description: body.serviceDescription || null,
          project_description: body.projectDescription,
          timeline: body.timeline || null,
          budget: body.budget || null,
          specific_requirements: body.specificRequirements || null,
          expected_delivery: body.expectedDelivery || null,
          previous_experience: body.previousExperience || null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save service request', details: error.message },
        { status: 500 }
      );
    }

    console.log('Service request saved successfully:', data);

    // إرسال إشعار بالبريد الإلكتروني (اختياري)
    try {
      await sendNotificationEmail(body);
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // لا نفشل الطلب إذا فشل الإشعار بالبريد الإلكتروني
    }

    return NextResponse.json({
      success: true,
      message: 'Service request submitted successfully',
      data: data?.[0]
    });

  } catch (error) {
    console.error('Error processing service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/service-requests called');
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    console.log('Querying service_requests table...');
    let query = supabase
      .from('service_requests')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // فلترة حسب الحالة
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    query = query.range(startIndex, startIndex + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch service requests', details: error.message },
        { status: 500 }
      );
    }

    console.log('Successfully fetched data:', data?.length || 0, 'records');

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// دالة إرسال الإشعار بالبريد الإلكتروني
async function sendNotificationEmail(requestData: any) {
  // يمكن استخدام خدمة مثل SendGrid أو Nodemailer
  // هذا مثال بسيط باستخدام fetch لخدمة بريد إلكتروني
  
  const emailContent = {
    to: 'info@depth-exp.com', // بريد الشركة
    subject: `طلب خدمة جديد من ${requestData.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">طلب خدمة جديد</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4a90a4;">معلومات العميل:</h3>
          <p><strong>الاسم:</strong> ${requestData.fullName}</p>
          <p><strong>البريد الإلكتروني:</strong> ${requestData.email}</p>
          <p><strong>الهاتف:</strong> ${requestData.phone}</p>
          ${requestData.company ? `<p><strong>الشركة:</strong> ${requestData.company}</p>` : ''}
          ${requestData.position ? `<p><strong>المنصب:</strong> ${requestData.position}</p>` : ''}
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4a90a4;">تفاصيل المشروع:</h3>
          ${requestData.serviceTitle ? `<p><strong>الخدمة:</strong> ${requestData.serviceTitle}</p>` : ''}
          <p><strong>وصف المشروع:</strong></p>
          <p style="white-space: pre-wrap;">${requestData.projectDescription}</p>
          ${requestData.timeline ? `<p><strong>الجدول الزمني:</strong> ${requestData.timeline}</p>` : ''}
          ${requestData.budget ? `<p><strong>الميزانية:</strong> ${requestData.budget}</p>` : ''}
        </div>

        ${requestData.specificRequirements ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4a90a4;">متطلبات خاصة:</h3>
          <p style="white-space: pre-wrap;">${requestData.specificRequirements}</p>
        </div>
        ` : ''}

        <p style="color: #6c757d; font-size: 14px;">
          تم الإرسال في: ${new Date().toLocaleString('ar-SA')}
        </p>
      </div>
    `
  };

  // هنا يمكن إضافة كود إرسال البريد الإلكتروني الفعلي
  console.log('Email notification would be sent:', emailContent);
}

