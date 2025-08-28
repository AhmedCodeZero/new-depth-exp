import { NextResponse } from "next/server"
import { listPages } from "@/lib/content"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({ pages: listPages() }, { headers: { "Cache-Control": "no-store" } })
}


