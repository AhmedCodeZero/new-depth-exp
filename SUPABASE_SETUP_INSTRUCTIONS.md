# تعليمات إعداد Supabase لطلبات الخدمة

## الخطوة 1: إنشاء جدول service_requests في Supabase

### 1.1 الدخول إلى Supabase Dashboard
1. اذهب إلى [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. من القائمة الجانبية، اضغط على **"SQL Editor"**

### 1.2 تنفيذ SQL لإنشاء الجدول
انسخ والصق هذا الكود في SQL Editor:

```sql
-- إنشاء جدول طلبات الخدمة
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
```

### 1.3 تنفيذ الكود
1. اضغط على **"Run"** لتنفيذ الكود
2. تأكد من ظهور رسالة نجاح

## الخطوة 2: التحقق من إعدادات RLS

### 2.1 فتح إعدادات الجدول
1. من القائمة الجانبية، اضغط على **"Table Editor"**
2. اختر جدول **"service_requests"**

### 2.2 التحقق من RLS
1. اضغط على **"Settings"** (أيقونة الترس)
2. تأكد من تفعيل **"Row Level Security"**
3. تأكد من وجود Policy **"Allow all operations on service_requests"**

## الخطوة 3: اختبار النظام

### 3.1 اختبار إرسال طلب خدمة
1. اذهب إلى صفحة طلب الخدمة في موقعك
2. املأ النموذج وأرسله
3. تأكد من ظهور رسالة نجاح

### 3.2 اختبار لوحة التحكم
1. اذهب إلى لوحة التحكم
2. اضغط على تبويب **"طلبات الخدمة"**
3. تأكد من ظهور الطلب المرسل

### 3.3 اختبار تحديث الحالة
1. في لوحة التحكم، اضغط على طلب خدمة
2. غيّر الحالة (مثل: in_review, approved)
3. تأكد من حفظ التغيير

## الخطوة 4: إضافة بيانات تجريبية (اختياري)

إذا كنت تريد إضافة بيانات تجريبية للاختبار:

```sql
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
    'نحتاج إلى إعادة هيكلة العمليات الإدارية في الشركة وتطوير استراتيجية جديدة للنمو.',
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
    'تحتاج الجمعية إلى تطوير نظام إدارة متطوعين وبناء استراتيجية جمع التبرعات.',
    'flexible',
    '15000-30000',
    'نحتاج لتدريب الفريق على الأنظمة الجديدة',
    'in_review'
);
```

## استكشاف الأخطاء

### إذا لم تظهر طلبات الخدمة في لوحة التحكم:

1. **تحقق من Console في المتصفح:**
   - اضغط F12
   - اذهب إلى تبويب Console
   - ابحث عن أخطاء

2. **تحقق من Network في المتصفح:**
   - اضغط F12
   - اذهب إلى تبويب Network
   - أعد تحميل الصفحة
   - ابحث عن طلبات `/api/service-requests`

3. **تحقق من Supabase Logs:**
   - اذهب إلى Supabase Dashboard
   - اضغط على **"Logs"** من القائمة الجانبية
   - ابحث عن أخطاء

### إذا فشل إرسال طلب الخدمة:

1. **تحقق من متغيرات البيئة:**
   - تأكد من وجود `.env.local`
   - تأكد من صحة `NEXT_PUBLIC_SUPABASE_URL`
   - تأكد من صحة `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **تحقق من الجدول:**
   - تأكد من إنشاء جدول `service_requests`
   - تأكد من وجود البيانات في الجدول

## ملاحظات مهمة

- **الأمان**: تم تفعيل RLS لحماية البيانات
- **الأداء**: تم إنشاء فهارس لتحسين سرعة الاستعلامات
- **التحديث التلقائي**: تم إعداد trigger لتحديث `updated_at` تلقائياً
- **النسخ الاحتياطي**: البيانات محفوظة في Supabase ويمكن استردادها

## الدعم

إذا واجهت أي مشاكل، تحقق من:
1. رسائل الخطأ في Console
2. سجلات Supabase
3. إعدادات RLS
4. صحة متغيرات البيئة

