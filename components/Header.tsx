"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  language: 'ar' | 'en';
  onLanguageToggle: () => void;
  currentContent?: {
    nav?: {
      home: string;
      services: string;
      cases: string;
      blog: string;
      contact: string;
    };
  };
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  language, 
  onLanguageToggle, 
  currentContent,
  currentPage 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: currentContent?.nav?.home || (language === 'ar' ? 'الرئيسية' : 'Home'), key: 'home' },
    { href: '/about', label: language === 'ar' ? 'من نحن' : 'About Us', key: 'about' },
    { href: '/services', label: currentContent?.nav?.services || (language === 'ar' ? 'الخدمات' : 'Services'), key: 'services' },
    { href: '/cases', label: currentContent?.nav?.cases || (language === 'ar' ? 'عملاؤنا' : 'Our Clients'), key: 'cases' },
    { href: '/blog', label: currentContent?.nav?.blog || (language === 'ar' ? 'المدونة' : 'Blog'), key: 'blog' },
    { href: '/contact', label: currentContent?.nav?.contact || (language === 'ar' ? 'اتصل بنا' : 'Contact'), key: 'contact' },
  ];

  return (
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
            {navLinks.map((link) => (
              <Link 
                key={link.key}
                href={link.href} 
                className={`relative px-6 py-3 font-medium transition-all duration-300 rounded-full group ${
                  currentPage === link.key 
                    ? 'text-[#1e3a5f] bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20 shadow-md' 
                    : 'text-gray-800 hover:text-[#1e3a5f] hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10 hover:shadow-md'
                }`}
              >
                <span className="relative z-10 font-semibold">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a90a4]/0 to-[#6bb6c7]/0 group-hover:from-[#4a90a4]/20 group-hover:to-[#6bb6c7]/20 rounded-full transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageToggle}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#4a90a4]/10 to-[#6bb6c7]/10 border-[#4a90a4]/40 hover:from-[#4a90a4]/20 hover:to-[#6bb6c7]/20 hover:border-[#4a90a4]/60 transition-all duration-300 hover:scale-105 rounded-full px-4 py-2 font-medium text-[#1e3a5f] hover:text-[#4a90a4] shadow-md hover:shadow-lg"
            >
              <Globe className="h-4 w-4" />
              <span className="font-semibold">{language === "ar" ? "EN" : "عربي"}</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-[#4a90a4]/10 transition-all duration-300 rounded-full p-3 hover:shadow-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-[#1e3a5f]" /> : <Menu className="h-5 w-5 text-[#1e3a5f]" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200/30 bg-white/95 backdrop-blur-sm rounded-b-3xl shadow-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.key}
                  href={link.href} 
                  className={`px-6 py-4 font-semibold transition-all duration-300 rounded-full mx-4 hover:shadow-md ${
                    currentPage === link.key 
                      ? 'text-[#1e3a5f] bg-gradient-to-r from-[#4a90a4]/20 to-[#6bb6c7]/20' 
                      : 'text-gray-800 hover:text-[#1e3a5f] hover:bg-gradient-to-r hover:from-[#4a90a4]/10 hover:to-[#6bb6c7]/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

