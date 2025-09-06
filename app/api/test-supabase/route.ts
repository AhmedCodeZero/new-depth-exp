import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key exists:', !!supabaseAnonKey);
    
    // اختبار الاتصال البسيط
    const { data, error } = await supabase
      .from('service_requests')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
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
      message: 'Supabase connection successful',
      data: data
    });

  } catch (error) {
    console.error('Error testing Supabase:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}

