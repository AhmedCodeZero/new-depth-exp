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
  if (!listPages().includes(page)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 404 })
  }
  try {
    const data = readPageContent(page)
    return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } })
  } catch (err) {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { page: string } }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const page = params.page as any
  if (!listPages().includes(page)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 404 })
  }
  try {
    const body = await request.json()
    writePageContent(page, body)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Failed to write content" }, { status: 500 })
  }
}


