import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    console.log('Creating service_requests table...');
    
    // محاولة إدراج بيانات تجريبية لاختبار الجدول
    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          full_name: 'Test User',
          email: 'test@example.com',
          phone: '1234567890',
          project_description: 'Test project description',
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting test data:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Table exists and working',
      data: data
    });

  } catch (error) {
    console.error('Error testing table:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}

