-- إنشاء جدول طلبات الخدمة
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- معلومات العميل
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    position VARCHAR(255),
    
    -- تفاصيل الخدمة
    service_title VARCHAR(500),
    service_description TEXT,
    project_description TEXT NOT NULL,
    timeline VARCHAR(100),
    budget VARCHAR(100),
    
    -- متطلبات إضافية
    specific_requirements TEXT,
    expected_delivery VARCHAR(255),
    previous_experience TEXT,
    
    -- حالة الطلب
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'completed')),
    
    -- ملاحظات إدارية
    notes TEXT,
    assigned_to VARCHAR(255),
    
    -- التواريخ
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

-- إنشاء policy للقراءة والكتابة (يمكن تخصيصها حسب الحاجة)
CREATE POLICY "Allow all operations on service_requests for authenticated users" ON service_requests
    FOR ALL USING (true);

-- إدراج بعض البيانات التجريبية (اختياري)
INSERT INTO service_requests (
    full_name, 
    email, 
    phone, 
    company, 
    position,
    service_title,
    project_description, 
    timeline, 
    budget,
    specific_requirements,
    status
) VALUES 
(
    'أحمد محمد علي',
    'ahmed@example.com',
    '+966501234567',
    'شركة التقنية المتقدمة',
    'مدير المشاريع',
    'حلول الأعمال والاستشارات الإدارية',
    'نحتاج إلى إعادة هيكلة العمليات الإدارية في الشركة وتطوير استراتيجية جديدة للنمو. المشروع يتضمن تحليل الوضع الحالي وتقديم توصيات للتحسين.',
    'normal',
    '50000-100000',
    'يفضل أن يكون الفريق لديه خبرة في القطاع التقني',
    'pending'
),
(
    'فاطمة الزهراني',
    'fatima@nonprofit.org',
    '+966502345678',
    'جمعية الخير الاجتماعية',
    'المديرة التنفيذية',
    'خدمات متخصصة للقطاع غير الربحي',
    'تحتاج الجمعية إلى تطوير نظام إدارة متطوعين وبناء استراتيجية جمع التبرعات. نريد أيضاً تحسين الحوكمة والامتثال للمعايير.',
    'flexible',
    '15000-30000',
    'نحتاج لتدريب الفريق على الأنظمة الجديدة',
    'in_review'
),
(
    'خالد السعدي',
    'khalid@tech-startup.com',
    '+966503456789',
    'شركة الابتكار التقني',
    'الرئيس التنفيذي',
    'التدريب وبناء القدرات',
    'شركة ناشئة تحتاج لبرنامج تدريبي شامل للموظفين في مجال القيادة وريادة الأعمال. نريد أيضاً ورش عمل للابتكار المؤسسي.',
    'urgent',
    '30000-50000',
    'التدريب يجب أن يكون باللغة العربية والإنجليزية',
    'approved'
);

-- عرض معلومات الجدول
\d service_requests;

