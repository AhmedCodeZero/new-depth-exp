import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    console.log('Updating service request:', id, body);
    
    // تحديث حالة الطلب في Supabase
    const { data, error } = await supabase
      .from('service_requests')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update service request', details: error.message },
        { status: 500 }
      );
    }

    console.log('Service request updated successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'Service request updated successfully',
      data: data?.[0]
    });

  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}