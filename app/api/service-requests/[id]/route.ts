import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Error fetching service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // الحقول المسموح بتحديثها
    const allowedFields = ['status', 'notes', 'assigned_to'];
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    // تحديث الحقول المسموحة فقط
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const { data, error } = await supabase
      .from('service_requests')
      .update(updateData)
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update service request' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    // إرسال إشعار بالتحديث (اختياري)
    if (body.status && data[0].email) {
      try {
        await sendStatusUpdateEmail(data[0], body.status);
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // لا نفشل الطلب إذا فشل الإشعار بالبريد الإلكتروني
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Service request updated successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('service_requests')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete service request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service request deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// دالة إرسال إشعار تحديث الحالة
async function sendStatusUpdateEmail(request: any, newStatus: string) {
  const statusMessages = {
    pending: 'في انتظار المراجعة',
    in_review: 'قيد المراجعة من قبل فريقنا',
    approved: 'تم الموافقة على طلبك وسيتم التواصل معك قريباً',
    rejected: 'نعتذر، لم يتم الموافقة على طلبك في الوقت الحالي',
    completed: 'تم إنجاز مشروعك بنجاح'
  };

  const statusMessage = statusMessages[newStatus as keyof typeof statusMessages] || newStatus;

  const emailContent = {
    to: request.email,
    subject: `تحديث حالة طلب الخدمة - ${request.full_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a5f, #4a90a4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">عمق الخبرة لحلول الأعمال</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">تحديث حالة طلب الخدمة</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1e3a5f; margin-bottom: 20px;">مرحباً ${request.full_name}</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4a90a4; margin-top: 0;">حالة طلبك الحالية:</h3>
            <p style="font-size: 18px; font-weight: bold; color: #1e3a5f; margin: 10px 0;">
              ${statusMessage}
            </p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            نشكرك على ثقتك بنا. سنقوم بإبقائك على اطلاع بأي تطورات جديدة.
          </p>

          <div style="background: #e9f4f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #1e3a5f; margin-top: 0;">تفاصيل طلبك:</h4>
            <p><strong>رقم الطلب:</strong> ${request.id}</p>
            <p><strong>الخدمة:</strong> ${request.service_title || 'غير محدد'}</p>
            <p><strong>تاريخ الإرسال:</strong> ${new Date(request.submitted_at).toLocaleDateString('ar-SA')}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://depth-exp.com'}/contact" 
               style="background: linear-gradient(135deg, #1e3a5f, #4a90a4); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              تواصل معنا
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="text-align: center; color: #888; font-size: 14px;">
            <p>عمق الخبرة لحلول الأعمال</p>
            <p>info@depth-exp.com | +966 XX XXX XXXX</p>
            <p style="margin-top: 10px;">
              تم الإرسال في: ${new Date().toLocaleString('ar-SA')}
            </p>
          </div>
        </div>
      </div>
    `
  };

  // هنا يمكن إضافة كود إرسال البريد الإلكتروني الفعلي
  console.log('Status update email would be sent:', emailContent);
}

