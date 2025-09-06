import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Simple service request received:', body);
    
    // التحقق من البيانات المطلوبة
    const requiredFields = ['fullName', 'email', 'phone', 'projectDescription'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // حفظ البيانات في ملف JSON محلي
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const serviceRequest = {
      id: Date.now().toString(),
      ...body,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    const filePath = path.join(dataDir, 'service-requests.json');
    let requests = [];
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      requests = JSON.parse(fileContent);
    }
    
    requests.push(serviceRequest);
    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

    console.log('Service request saved to file:', serviceRequest);

    return NextResponse.json({
      success: true,
      message: 'Service request submitted successfully',
      data: serviceRequest
    });

  } catch (error) {
    console.error('Error processing service request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'service-requests.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        }
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const requests = JSON.parse(fileContent);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    let filteredRequests = requests;
    if (status && status !== 'all') {
      filteredRequests = requests.filter((req: any) => req.status === status);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedRequests,
      pagination: {
        page,
        limit,
        total: filteredRequests.length,
        totalPages: Math.ceil(filteredRequests.length / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'service-requests.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'No service requests found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const requests = JSON.parse(fileContent);
    
    const requestIndex = requests.findIndex((req: any) => req.id === id);
    if (requestIndex === -1) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    // تحديث حالة الطلب
    requests[requestIndex] = {
      ...requests[requestIndex],
      ...body,
      updated_at: new Date().toISOString()
    };

    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Service request updated successfully',
      data: requests[requestIndex]
    });

  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

