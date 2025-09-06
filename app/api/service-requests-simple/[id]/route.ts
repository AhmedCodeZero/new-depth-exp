import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

