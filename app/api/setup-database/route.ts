import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    console.log('Setting up database...');
    
    // إنشاء جدول service_requests
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS service_requests (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        position VARCHAR(255),
        service_title VARCHAR(500),
        service_description TEXT,
        project_description TEXT NOT NULL,
        timeline VARCHAR(100),
        budget VARCHAR(100),
        specific_requirements TEXT,
        expected_delivery VARCHAR(255),
        previous_experience TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'completed')),
        notes TEXT,
        assigned_to VARCHAR(255),
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // تنفيذ SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL });

    if (error) {
      console.error('Error creating table:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      });
    }

    // إنشاء فهارس
    const createIndexesSQL = `
      CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
      CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_service_requests_email ON service_requests(email);
    `;

    await supabase.rpc('exec_sql', { sql: createIndexesSQL });

    // إنشاء RLS
    const createRLSSQL = `
      ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
      CREATE POLICY IF NOT EXISTS "Allow all operations on service_requests" ON service_requests
        FOR ALL USING (true);
    `;

    await supabase.rpc('exec_sql', { sql: createRLSSQL });

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully'
    });

  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}

