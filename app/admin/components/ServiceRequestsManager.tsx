"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit
} from 'lucide-react';

interface ServiceRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  service_title?: string;
  service_description?: string;
  project_description: string;
  timeline?: string;
  budget?: string;
  specific_requirements?: string;
  expected_delivery?: string;
  previous_experience?: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed';
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

const ServiceRequestsManager = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRequests();
  }, [currentPage, statusFilter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: statusFilter
      });

      const response = await fetch(`/api/service-requests?${params}`);
      const data = await response.json();

      if (data.success) {
        setRequests(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchRequests();
        if (selectedRequest?.id === requestId) {
          setSelectedRequest({ ...selectedRequest, status: newStatus as any });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'في الانتظار', icon: Clock },
      in_review: { color: 'bg-blue-100 text-blue-800', text: 'قيد المراجعة', icon: AlertCircle },
      approved: { color: 'bg-green-100 text-green-800', text: 'موافق عليه', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', text: 'مرفوض', icon: XCircle },
      completed: { color: 'bg-purple-100 text-purple-800', text: 'مكتمل', icon: CheckCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config?.icon || Clock;

    return (
      <Badge className={`${config?.color} border-0 flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config?.text || status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = requests.filter(request =>
    request.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90a4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1e3a5f]">طلبات الخدمة</h2>
          <p className="text-gray-600">إدارة ومتابعة طلبات الخدمات الواردة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث بالاسم، البريد الإلكتروني، أو الشركة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90a4]"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">في الانتظار</option>
                <option value="in_review">قيد المراجعة</option>
                <option value="approved">موافق عليه</option>
                <option value="rejected">مرفوض</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-[#1e3a5f]">{requests.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-[#4a90a4]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {requests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">موافق عليها</p>
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold text-purple-600">
                  {requests.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4a90a4] to-[#6bb6c7] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#1e3a5f]">{request.full_name}</CardTitle>
                    <p className="text-gray-600">{request.company || 'عميل فردي'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRequest(request)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    عرض
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{request.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{request.phone}</span>
                </div>
                {request.service_title && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>{request.service_title}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(request.submitted_at)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-[#1e3a5f] mb-2">وصف المشروع:</h4>
                <p className="text-gray-700 line-clamp-3">{request.project_description}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {request.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'in_review')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        بدء المراجعة
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateRequestStatus(request.id, 'rejected')}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        رفض
                      </Button>
                    </>
                  )}
                  {request.status === 'in_review' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        موافقة
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateRequestStatus(request.id, 'rejected')}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        رفض
                      </Button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <Button
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'completed')}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      تم الإنجاز
                    </Button>
                  )}
                </div>
                <div className="flex gap-1">
                  {request.timeline && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {request.timeline}
                    </Badge>
                  )}
                  {request.budget && (
                    <Badge variant="outline" className="text-xs">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {request.budget}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            السابق
          </Button>
          <span className="flex items-center px-4 py-2 text-sm text-gray-600">
            صفحة {currentPage} من {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            التالي
          </Button>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#1e3a5f]">تفاصيل طلب الخدمة</h3>
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* معلومات العميل */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      معلومات العميل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-semibold">الاسم: </span>
                      {selectedRequest.full_name}
                    </div>
                    <div>
                      <span className="font-semibold">البريد الإلكتروني: </span>
                      {selectedRequest.email}
                    </div>
                    <div>
                      <span className="font-semibold">الهاتف: </span>
                      {selectedRequest.phone}
                    </div>
                    {selectedRequest.company && (
                      <div>
                        <span className="font-semibold">الشركة: </span>
                        {selectedRequest.company}
                      </div>
                    )}
                    {selectedRequest.position && (
                      <div>
                        <span className="font-semibold">المنصب: </span>
                        {selectedRequest.position}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* تفاصيل الطلب */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      تفاصيل الطلب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-semibold">الحالة: </span>
                      {getStatusBadge(selectedRequest.status)}
                    </div>
                    <div>
                      <span className="font-semibold">تاريخ الإرسال: </span>
                      {formatDate(selectedRequest.submitted_at)}
                    </div>
                    {selectedRequest.service_title && (
                      <div>
                        <span className="font-semibold">الخدمة: </span>
                        {selectedRequest.service_title}
                      </div>
                    )}
                    {selectedRequest.timeline && (
                      <div>
                        <span className="font-semibold">الجدول الزمني: </span>
                        {selectedRequest.timeline}
                      </div>
                    )}
                    {selectedRequest.budget && (
                      <div>
                        <span className="font-semibold">الميزانية: </span>
                        {selectedRequest.budget}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* وصف المشروع */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>وصف المشروع</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{selectedRequest.project_description}</p>
                </CardContent>
              </Card>

              {/* متطلبات خاصة */}
              {selectedRequest.specific_requirements && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>متطلبات خاصة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{selectedRequest.specific_requirements}</p>
                  </CardContent>
                </Card>
              )}

              {/* الخبرة السابقة */}
              {selectedRequest.previous_experience && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>الخبرة السابقة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{selectedRequest.previous_experience}</p>
                  </CardContent>
                </Card>
              )}

              {/* أزرار العمليات */}
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  إغلاق
                </Button>
                <Button className="bg-[#4a90a4] hover:bg-[#4a90a4]/90">
                  تعديل الحالة
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestsManager;

