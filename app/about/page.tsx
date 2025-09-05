"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Eye, 
  Heart, 
  Star, 
  CheckCircle, 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ContentData {
  ar: {
    nav: {
      home: string;
      about: string;
      services: string;
      cases: string;
      blog: string;
      contact: string;
    };
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      vision: string;
      mission: string;
      values: {
        innovation: string;
        excellence: string;
        sustainability: string;
        reliability: string;
        partnership: string;
      };
      objectives: string[];
    };
  };
  en: {
    nav: {
      home: string;
      about: string;
      services: string;
      cases: string;
      blog: string;
      contact: string;
    };
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      vision: string;
      mission: string;
      values: {
        innovation: string;
        excellence: string;
        sustainability: string;
        reliability: string;
        partnership: string;
      };
      objectives: string[];
    };
  };
}

const AboutPage = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [currentContent, setCurrentContent] = useState<ContentData['ar'] | ContentData['en']>({
    nav: { home: '', about: '', services: '', cases: '', blog: '', contact: '' },
    hero: { 
      title: '', 
      subtitle: '', 
      cta: '',
      vision: '',
      mission: '',
      values: { innovation: '', excellence: '', sustainability: '', reliability: '', partnership: '' },
      objectives: []
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/about');
        const data = await response.json();
        setCurrentContent(data.data[language]);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const valueIcons = [
    { key: 'innovation', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { key: 'excellence', icon: Award, color: 'from-yellow-500 to-orange-500' },
    { key: 'sustainability', icon: Target, color: 'from-green-500 to-emerald-500' },
    { key: 'reliability', icon: CheckCircle, color: 'from-purple-500 to-pink-500' },
    { key: 'partnership', icon: Users, color: 'from-indigo-500 to-blue-500' }
  ];

  return (
    <div className={`min-h-screen ${language === "ar" ? "font-arabic" : "font-sans"}`} dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 border-b border-gray-200/30 shadow-lg">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src="/images/depth-logo-horizontal.png" alt="Depth Logo" className="relative h-16 w-auto transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-2 py-2 shadow-lg">
              <Link href="/" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.home}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/about" className="relative px-6 py-3 text-[#1e3a5f] font-medium bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 rounded-full shadow-md">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.about || (language === 'ar' ? 'من نحن' : 'About Us')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/services" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.services}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/cases" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.cases}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/blog" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.blog}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
              <Link href="/contact" className="relative px-6 py-3 text-gray-800 hover:text-[#1e3a5f] font-medium transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md group">
                <span className="relative z-10 font-semibold">{currentContent?.nav?.contact}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 border-[#4a90a4]/40 hover:from-[#4a90a4]/20 hover:to-[#6bb6c7]/20 hover:border-[#4a90a4]/60 transition-all duration-300 hover:scale-105 rounded-full px-4 py-2 font-medium text-[#1e3a5f] hover:text-[#4a90a4] shadow-md hover:shadow-lg"
              >
                <span className="font-semibold">{language === "ar" ? "EN" : "عربي"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#1e3a5f] via-[#4a90a4] to-[#6bb6c7] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {currentContent.hero?.subtitle || (language === 'ar' 
                ? 'مؤسسة متخصصة في تقديم حلول استراتيجية وإدارية متكاملة، تجمع بين الاستشارات الإدارية، البحث والتطوير، التدريب وبناء القدرات، وتنظيم الفعاليات والمعارض.'
                : 'A specialized institution providing integrated strategic and administrative solutions, combining management consulting, research and development, training and capacity building, and organizing events and exhibitions.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Vision and Mission */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/40 shadow-2xl group-hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-t-3xl"></div>

                {/* Floating icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-2xl flex items-center justify-center shadow-xl">
                    <Eye className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
                    {language === "ar" ? "🎯 الرؤية" : "🎯 Vision"}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#4a90a4] to-[#6bb6c7] rounded-full"></div>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  {currentContent.hero?.vision || (language === "ar" ? "أن نكون المرجع الأول في حلول الأعمال المتكاملة التي تصنع التميز والاستدامة." : "To be the first reference in integrated business solutions that create excellence and sustainability.")}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full"></div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/40 shadow-2xl group-hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6bb6c7] to-[#4a90a4] rounded-t-3xl"></div>

                {/* Floating icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6bb6c7] to-[#1e3a5f] rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-[#6bb6c7] to-[#1e3a5f] rounded-2xl flex items-center justify-center shadow-xl">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#6bb6c7] to-[#1e3a5f] bg-clip-text text-transparent mb-4">
                    {language === "ar" ? "📝 الرسالة" : "📝 Mission"}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#6bb6c7] to-[#1e3a5f] rounded-full"></div>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  {currentContent.hero?.mission || (language === "ar" ? "نبتكر حلول أعمال متكاملة تمكّن المنظمات من النمو وتحقيق الاستدامة." : "We innovate integrated business solutions that enable organizations to grow and achieve sustainability.")}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-[#6bb6c7]/10 to-[#1e3a5f]/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 rounded-full mb-6">
                <span className="px-4 py-2 bg-white rounded-full text-[#4a90a4] font-medium shadow-sm">
                  {language === "ar" ? "قيمنا المؤسسية" : "Our Core Values"}
                </span>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
                {language === "ar" ? "🌟 القيم التي تحركنا" : "🌟 Values That Drive Us"}
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "ar" 
                  ? "نؤمن بقيم أساسية تشكل أساس عملنا وتحدد طريقة تفاعلنا مع عملائنا وشركائنا"
                  : "We believe in core values that form the foundation of our work and define how we interact with our clients and partners"
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valueIcons.map((value, idx) => {
                const IconComponent = value.icon;
                const valueText = currentContent.hero?.values?.[value.key as keyof typeof currentContent.hero.values] || '';
                
                return (
                  <div key={value.key} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-xl group-hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold text-[#1e3a5f] mb-3">
                        {valueText.split(':')[0]}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {valueText.split(':')[1]?.trim() || valueText}
                      </p>
                      
                      {/* Decorative line */}
                      <div className={`mt-4 h-1 bg-gradient-to-r ${value.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategic Objectives */}
          <div>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-[#1e3a5f]/10 to-[#4a90a4]/10 rounded-full mb-6">
                <span className="px-4 py-2 bg-white rounded-full text-[#1e3a5f] font-medium shadow-sm">
                  {language === "ar" ? "أهدافنا الاستراتيجية" : "Our Strategic Objectives"}
                </span>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] bg-clip-text text-transparent mb-4">
                {language === "ar" ? "🎯 الأهداف التي نسعى لتحقيقها" : "🎯 Goals We Strive to Achieve"}
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === "ar" 
                  ? "خارطة طريق واضحة نحو التميز والريادة في مجال حلول الأعمال"
                  : "A clear roadmap towards excellence and leadership in the field of business solutions"
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {(currentContent.hero?.objectives || []).map((objective: string, idx: number) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/5 to-[#4a90a4]/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg group-hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1e3a5f] to-[#4a90a4] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium flex-1">
                        {objective}
                      </p>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1e3a5f] to-[#4a90a4] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'ar' ? 'جاهزون لبدء رحلة النجاح معاً؟' : 'Ready to Start the Journey of Success Together?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى عملائنا الناجحين واكتشف كيف يمكن لخبرتنا أن تساعدك في تحقيق أهدافك'
              : 'Join our successful clients and discover how our expertise can help you achieve your goals'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-[#1e3a5f] hover:bg-white/90 px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                {language === 'ar' ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full">
                {language === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f1419] to-[#1e3a5f] text-white py-16 overflow-hidden">
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
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </footer>
    </div>
  );
};

export default AboutPage;

