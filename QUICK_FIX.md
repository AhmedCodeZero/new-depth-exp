# إصلاح سريع للمشكلة

## المشكلة:
1. الفورم لا يعمل ولا يرسل
2. تبويب "الطلبات" لا يظهر في لوحة التحكم

## الحل:

### 1. إنشاء جدول contact_messages في Supabase:

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك: `https://lhrtlvnpslkjjqcofryx.supabase.co`
3. اذهب إلى **SQL Editor**
4. انسخ والصق الكود التالي:

```sql
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

-- إنشاء فهارس
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
```

5. اضغط **Run**

### 2. اختبار النظام:

1. اذهب إلى `/contact` في الموقع
2. املأ النموذج وأرسل رسالة
3. اذهب إلى `/admin` في الموقع
4. اضغط على تبويب "الطلبات"
5. تحقق من ظهور الرسالة

### 3. إذا لم تظهر الرسائل:

1. تحقق من وحدة تحكم المتصفح (F12) للأخطاء
2. تحقق من سجلات Supabase
3. تأكد من أن الجدول تم إنشاؤه بشكل صحيح

## ملاحظات:

- تم تثبيت Supabase ✅
- تم إنشاء جميع الملفات ✅
- المشكلة الوحيدة هي إنشاء الجدول في Supabase

## للتواصل:

إذا استمرت المشكلة، تحقق من:
1. صحة بيانات الاتصال في `lib/supabase.ts`
2. أن الجدول تم إنشاؤه في Supabase
3. سجلات الأخطاء في وحدة تحكم المتصفح
