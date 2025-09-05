import { NextResponse } from "next/server"
import { listPages, readPageContent, writePageContent } from "@/lib/content"

export const dynamic = "force-dynamic"

function isAuthorized(request: Request): boolean {
  const headerToken = request.headers.get("authorization")?.replace("Bearer ", "") || ""
  const envToken = process.env.ADMIN_TOKEN || ""
  if (!envToken) {
    // If no ADMIN_TOKEN is set, allow writes (useful in local/dev)
    return true
  }
  return headerToken === envToken
}

export async function GET(
  _req: Request,
  { params }: { params: { page: string } },
) {
  const page = params.page as any
  console.log('API: Fetching content for page:', page)
  
  if (!listPages().includes(page)) {
    console.log('API: Invalid page:', page)
    return NextResponse.json({ error: "Invalid page" }, { status: 404 })
  }
  try {
    const data = readPageContent(page)
    console.log('API: Content loaded successfully for page:', page)
    console.log('API: Content preview:', JSON.stringify(data).substring(0, 200) + '...')
    return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } })
  } catch (err) {
    console.error('API: Error reading content for page:', page, err)
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { page: string } }) {
  if (!isAuthorized(request)) {
    console.log('API: Unauthorized request')
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const page = params.page as any
  console.log('API: Updating content for page:', page)
  
  if (!listPages().includes(page)) {
    console.log('API: Invalid page for update:', page)
    return NextResponse.json({ error: "Invalid page" }, { status: 404 })
  }
  try {
    const body = await request.json()
    console.log('API: Writing content for page:', page)
    console.log('API: Content preview:', JSON.stringify(body).substring(0, 200) + '...')
    writePageContent(page, body)
    console.log('API: Content written successfully for page:', page)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API: Error writing content for page:', page, err)
    return NextResponse.json({ error: "Failed to write content" }, { status: 500 })
  }
}


