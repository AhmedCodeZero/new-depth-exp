"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft, CheckCircle, Send, User, Mail, Phone, Building, MessageSquare, Calendar, DollarSign, Globe, Menu, X } from 'lucide-react';

interface ServiceData {
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
}

interface FormData {
  // معلومات العميل
  fullName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  
  // تفاصيل الخدمة
  serviceTitle: string;
  serviceDescription: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  
  // متطلبات إضافية
  specificRequirements: string;
  expectedDelivery: string;
  previousExperience: string;
}

const ServiceRequestPage = () => {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    serviceTitle: '',
    serviceDescription: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    specificRequirements: '',
    expectedDelivery: '',
    previousExperience: ''
  });

  // خدمات افتراضية
  const services = {
    consulting: {
      title: language === 'ar' ? 'حلول الأعمال والاستشارات الإدارية' : 'Business Solutions & Management Consulting',
      description: language === 'ar' ? 'استشارات متخصصة لتطوير استراتيجيات العمل وتحسين الأداء التشغيلي' : 'Specialized consulting for business strategy development and operational performance improvement',
      features: [
        language === 'ar' ? 'إعداد الخطط الاستراتيجية' : 'Strategic planning',
        language === 'ar' ? 'تطوير السياسات واللوائح' : 'Policy and regulation development',
        language === 'ar' ? 'إعادة هندسة العمليات' : 'Process re-engineering'
      ],
      price: language === 'ar' ? 'حسب نطاق المشروع' : 'Based on project scope',
      duration: language === 'ar' ? '3-12 شهر' : '3-12 months'
    },
    research: {
      title: language === 'ar' ? 'خدمات البحث والتطوير' : 'Research & Development Services',
      description: language === 'ar' ? 'إعداد الدراسات والبحوث المتخصصة وتطوير الحلول المبتكرة' : 'Specialized studies and research preparation with innovative solution development',
      features: [
        language === 'ar' ? 'الدراسات الميدانية' : 'Field studies',
        language === 'ar' ? 'استطلاعات الرأي' : 'Opinion polls',
        language === 'ar' ? 'التحليل الإحصائي' : 'Statistical analysis'
      ],
      price: language === 'ar' ? '15,000 - 80,000 ريال' : '15,000 - 80,000 SAR',
      duration: language === 'ar' ? '2-8 أشهر' : '2-8 months'
    },
    training: {
      title: language === 'ar' ? 'التدريب وبناء القدرات' : 'Training & Capacity Building',
      description: language === 'ar' ? 'برامج تدريبية متخصصة لتطوير المهارات وبناء القدرات المؤسسية' : 'Specialized training programs for skills development and institutional capacity building',
      features: [
        language === 'ar' ? 'البرامج التدريبية المتخصصة' : 'Specialized training programs',
        language === 'ar' ? 'ورش العمل التفاعلية' : 'Interactive workshops',
        language === 'ar' ? 'برامج التطوير المهني' : 'Professional development programs'
      ],
      price: language === 'ar' ? '5,000 - 25,000 ريال' : '5,000 - 25,000 SAR',
      duration: language === 'ar' ? '1-6 أشهر' : '1-6 months'
    }
  };

  useEffect(() => {
    if (serviceParam && services[serviceParam as keyof typeof services]) {
      const service = services[serviceParam as keyof typeof services];
      setSelectedService(service);
      setFormData(prev => ({
        ...prev,
        serviceTitle: service.title,
        serviceDescription: service.description
      }));
    }
  }, [serviceParam, language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const requestData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      console.log('Submitting service request:', requestData);

      const response = await fetch('/api/service-requests-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setSubmitStatus('success');
        // إعادة تعيين النموذج
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          serviceTitle: selectedService?.title || '',
          serviceDescription: selectedService?.description || '',
          projectDescription: '',
          timeline: '',
          budget: '',
          specificRequirements: '',
          expectedDelivery: '',
          previousExperience: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full text-center p-8 shadow-2xl border-0">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Request Submitted Successfully!'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'ar' 
              ? 'شكراً لك على ثقتك بنا. سيتواصل معك فريقنا خلال 24 ساعة لمناقشة تفاصيل مشروعك.'
              : 'Thank you for trusting us. Our team will contact you within 24 hours to discuss your project details.'
            }
          </p>
          <div className="space-y-4">
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white px-8 py-3 rounded-full">
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Button>
            </Link>
            <Link href="/services" className="block">
              <Button variant="outline" className="border-2 border-[#4a90a4] text-[#4a90a4] hover:bg-[#4a90a4]/10 px-8 py-3 rounded-full">
                {language === 'ar' ? 'تصفح الخدمات' : 'Browse Services'}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === "ar" ? "font-arabic" : "font-sans"}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 border-b border-gray-200/30 shadow-lg">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Link href="/">
                  <img src="/images/depth-logo-horizontal.png" alt="Depth Logo" className="relative h-16 w-auto transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm cursor-pointer" />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-2 py-2 shadow-lg">
              <Link href="/" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/about" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'من نحن' : 'About Us'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/services" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'الخدمات' : 'Services'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/cases" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'دراسات الحالة' : 'Case Studies'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/blog" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'المدونة' : 'Blog'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/contact" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{language === 'ar' ? 'اتصل بنا' : 'Contact'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 border-[#4a90a4]/40 hover:from-[#4a90a4]/20 hover:to-[#6bb6c7]/20 hover:border-[#4a90a4]/60 transition-all duration-300 hover:scale-105 rounded-full px-4 py-2 font-medium text-[#1e3a5f] hover:text-[#4a90a4] shadow-md hover:shadow-lg"
              >
                <Globe className="h-4 w-4" />
                <span className="font-semibold">{language === "ar" ? "EN" : "عربي"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'ar' ? 'طلب خدمة' : 'Service Request'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'املأ النموذج أدناه وسيتواصل معك فريقنا لمناقشة احتياجاتك وتقديم أفضل الحلول'
                : 'Fill out the form below and our team will contact you to discuss your needs and provide the best solutions'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* معلومات الخدمة المختارة */}
          {selectedService && (
            <Card className="mb-8 bg-gradient-to-r from-[#4a90a4]/5 to-[#6bb6c7]/5 border-[#4a90a4]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e3a5f] flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3 text-[#4a90a4]" />
                  {language === 'ar' ? 'الخدمة المختارة' : 'Selected Service'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{selectedService.title}</h3>
                <p className="text-gray-600 mb-4">{selectedService.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-[#1e3a5f]">
                      {language === 'ar' ? 'السعر المتوقع:' : 'Expected Price:'}
                    </span>
                    <span className="ml-2 rtl:ml-0 rtl:mr-2">{selectedService.price}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1e3a5f]">
                      {language === 'ar' ? 'المدة المتوقعة:' : 'Expected Duration:'}
                    </span>
                    <span className="ml-2 rtl:ml-0 rtl:mr-2">{selectedService.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* نموذج طلب الخدمة */}
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center">
                <MessageSquare className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3" />
                {language === 'ar' ? 'تفاصيل طلب الخدمة' : 'Service Request Details'}
              </CardTitle>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="p-8 space-y-8">
                {/* معلومات العميل */}
                <div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center">
                    <User className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {language === 'ar' ? 'معلومات العميل' : 'Client Information'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                      </label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                        className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                        className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'اسم الشركة/المؤسسة' : 'Company/Organization Name'}
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'أدخل اسم الشركة' : 'Enter company name'}
                        className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'المنصب/الوظيفة' : 'Position/Job Title'}
                      </label>
                      <Input
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'أدخل منصبك أو وظيفتك' : 'Enter your position or job title'}
                        className="h-12 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* تفاصيل المشروع */}
                <div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center">
                    <Building className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {language === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'وصف المشروع' : 'Project Description'} *
                      </label>
                      <Textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'اشرح تفاصيل مشروعك والأهداف المرجوة' : 'Explain your project details and desired objectives'}
                        rows={6}
                        className="border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl resize-none"
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                          {language === 'ar' ? 'الجدول الزمني المفضل' : 'Preferred Timeline'}
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                        >
                          <option value="">{language === 'ar' ? 'اختر الجدول الزمني' : 'Select timeline'}</option>
                          <option value="urgent">{language === 'ar' ? 'عاجل (أقل من شهر)' : 'Urgent (Less than 1 month)'}</option>
                          <option value="normal">{language === 'ar' ? 'عادي (1-3 أشهر)' : 'Normal (1-3 months)'}</option>
                          <option value="flexible">{language === 'ar' ? 'مرن (3-6 أشهر)' : 'Flexible (3-6 months)'}</option>
                          <option value="long-term">{language === 'ar' ? 'طويل المدى (أكثر من 6 أشهر)' : 'Long-term (More than 6 months)'}</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                          {language === 'ar' ? 'الميزانية المتوقعة' : 'Expected Budget'}
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl"
                        >
                          <option value="">{language === 'ar' ? 'اختر نطاق الميزانية' : 'Select budget range'}</option>
                          <option value="5000-15000">{language === 'ar' ? '5,000 - 15,000 ريال' : '5,000 - 15,000 SAR'}</option>
                          <option value="15000-30000">{language === 'ar' ? '15,000 - 30,000 ريال' : '15,000 - 30,000 SAR'}</option>
                          <option value="30000-50000">{language === 'ar' ? '30,000 - 50,000 ريال' : '30,000 - 50,000 SAR'}</option>
                          <option value="50000-100000">{language === 'ar' ? '50,000 - 100,000 ريال' : '50,000 - 100,000 SAR'}</option>
                          <option value="100000+">{language === 'ar' ? 'أكثر من 100,000 ريال' : 'More than 100,000 SAR'}</option>
                          <option value="custom">{language === 'ar' ? 'أخرى (سيتم التواصل)' : 'Custom (Will be discussed)'}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* متطلبات إضافية */}
                <div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-6">
                    {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'متطلبات خاصة' : 'Special Requirements'}
                      </label>
                      <Textarea
                        name="specificRequirements"
                        value={formData.specificRequirements}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'أي متطلبات أو ملاحظات خاصة' : 'Any special requirements or notes'}
                        rows={4}
                        className="border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl resize-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold mb-2 text-[#1e3a5f]">
                        {language === 'ar' ? 'الخبرة السابقة مع خدمات مماثلة' : 'Previous Experience with Similar Services'}
                      </label>
                      <Textarea
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleInputChange}
                        placeholder={language === 'ar' ? 'اختياري: هل لديك خبرة سابقة مع خدمات مماثلة؟' : 'Optional: Do you have previous experience with similar services?'}
                        rows={3}
                        className="border-2 border-gray-200 focus:border-[#4a90a4] rounded-xl resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* أزرار الإرسال */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <div className="relative group flex-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <Button 
                      type="submit" 
                      disabled={submitStatus === 'submitting'}
                      className="relative w-full h-14 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] hover:from-[#1e3a5f]/90 hover:to-[#4a90a4]/90 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 border-0 group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <Send className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                        {submitStatus === 'submitting' 
                          ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
                          : (language === 'ar' ? 'إرسال طلب الخدمة' : 'Submit Service Request')
                        }
                      </span>
                    </Button>
                  </div>
                  
                  <Link href="/" className="sm:w-auto">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full sm:w-auto h-14 border-2 border-[#4a90a4] text-[#4a90a4] hover:bg-[#4a90a4]/10 px-8 rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </Link>
                </div>

                {/* رسائل الحالة */}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-sm">
                    <p className="text-red-800 text-center font-medium">
                      {language === 'ar' 
                        ? 'حدث خطأ في إرسال طلبك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
                        : 'An error occurred while submitting your request. Please try again or contact us directly.'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </form>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f1419] to-[#1e3a5f] text-white py-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="group inline-block mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="/images/depth-logo-horizontal.png"
                  alt="Depth Logo"
                  className="relative h-20 w-auto mx-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-xl text-white/90 mb-4 leading-relaxed font-medium">
                {language === "ar" 
                  ? "عمق الخبرة لحلول الأعمال - شريكك في النجاح والتميز" 
                  : "Depth of Experience for Business Solutions - Your Partner in Success and Excellence"
                }
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] mx-auto rounded-full mb-6"></div>
              <p className="text-white/70 text-lg">
                {language === "ar" 
                  ? "نحن نؤمن أن النجاح يتحقق من خلال الشراكة والابتكار والتميز في الخدمة" 
                  : "We believe success is achieved through partnership, innovation, and excellence in service"
                }
              </p>
            </div>
            
            <div className="border-t border-white/20 pt-8">
              <p className="text-white/60 text-lg">
                {language === "ar" ? "© 2024 عمق - جميع الحقوق محفوظة" : "© 2024 Depth - All rights reserved"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </footer>
    </div>
  );
};

export default ServiceRequestPage;

