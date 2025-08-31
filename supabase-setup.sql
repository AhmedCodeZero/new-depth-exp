-- إنشاء جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- إنشاء دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء trigger لتحديث updated_at
CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON contact_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- إضافة تعليقات على الجدول
COMMENT ON TABLE contact_messages IS 'جدول رسائل التواصل من الموقع';
COMMENT ON COLUMN contact_messages.id IS 'المعرف الفريد للرسالة';
COMMENT ON COLUMN contact_messages.name IS 'اسم المرسل';
COMMENT ON COLUMN contact_messages.email IS 'البريد الإلكتروني للمرسل';
COMMENT ON COLUMN contact_messages.phone IS 'رقم الهاتف (اختياري)';
COMMENT ON COLUMN contact_messages.company IS 'اسم الشركة (اختياري)';
COMMENT ON COLUMN contact_messages.service IS 'الخدمة المطلوبة (اختياري)';
COMMENT ON COLUMN contact_messages.message IS 'نص الرسالة';
COMMENT ON COLUMN contact_messages.status IS 'حالة الرسالة: new, read, replied';
COMMENT ON COLUMN contact_messages.created_at IS 'تاريخ إنشاء الرسالة';
COMMENT ON COLUMN contact_messages.updated_at IS 'تاريخ آخر تحديث للرسالة';

-- إعداد RLS (Row Level Security) - اختياري للأمان
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات RLS (إذا كنت تريد استخدامها)
-- CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow authenticated read" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "Allow authenticated update" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
