# دليل نشر المشروع على Vercel

## إعداد متغيرات البيئة في Vercel

بعد رفع المشروع إلى GitHub، تحتاج إلى إضافة متغيرات البيئة في Vercel:

### 1. الدخول إلى Vercel Dashboard
- اذهب إلى [vercel.com](https://vercel.com)
- سجل دخولك واختر مشروعك

### 2. إضافة متغيرات البيئة
- اذهب إلى **Settings** > **Environment Variables**
- أضف المتغيرات التالية:

```
NEXT_PUBLIC_SUPABASE_URL=https://lhrtlvnpslkjjqcofryx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocnRsdm5wc2xrampxY29mcnl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MTQ5NjksImV4cCI6MjA3MjE5MDk2OX0.5QOfkT0OdSSNE9H-sz24xiPY9kEvawLw3ZILqF4AzEk
```

### 3. إعادة النشر
- بعد إضافة المتغيرات، اذهب إلى **Deployments**
- اضغط على **Redeploy** للمشروع الأخير

## ملاحظات مهمة

- تأكد من أن متغيرات البيئة مضافة لجميع البيئات (Production, Preview, Development)
- لا تضع المفاتيح في الكود مباشرة لأسباب أمنية
- ملف `.env.local` لا يتم رفعه إلى Git تلقائياً

## التحقق من النشر

بعد النشر، تأكد من:
1. الموقع يعمل بشكل صحيح
2. نماذج التواصل تعمل
3. لوحة الإدارة تعمل
4. قاعدة البيانات متصلة

## استكشاف الأخطاء

إذا واجهت مشاكل:
1. تحقق من متغيرات البيئة في Vercel
2. تأكد من أن قاعدة البيانات Supabase تعمل
3. راجع logs في Vercel Dashboard
