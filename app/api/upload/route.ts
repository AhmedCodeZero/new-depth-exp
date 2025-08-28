import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`
    const filePath = path.join(uploadsDir, safeName)
    fs.writeFileSync(filePath, buffer)
    const url = `/uploads/${safeName}`
    return NextResponse.json({ url })
  } catch (e) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}



