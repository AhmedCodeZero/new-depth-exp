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

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_requests_email ON service_requests(email);

-- إنشاء trigger لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_requests_updated_at 
    BEFORE UPDATE ON service_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- إنشاء RLS (Row Level Security) للأمان
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- إنشاء policy للقراءة والكتابة
CREATE POLICY "Allow all operations on service_requests" ON service_requests
    FOR ALL USING (true);