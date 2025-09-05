import fs from "fs"
import path from "path"

type SupportedPageKey = "home" | "about" | "services" | "cases" | "blog" | "contact"

const CONTENT_DIR = path.join(process.cwd(), "content")

export function getContentFilePath(page: SupportedPageKey): string {
  return path.join(CONTENT_DIR, `${page}.json`)
}

export function readPageContent<T = unknown>(page: SupportedPageKey): T {
  const filePath = getContentFilePath(page)
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as T
}

export function writePageContent(page: SupportedPageKey, data: unknown): void {
  const filePath = getContentFilePath(page)
  const formatted = JSON.stringify(data, null, 2)
  fs.writeFileSync(filePath, formatted, "utf-8")
}

export function listPages(): SupportedPageKey[] {
  return ["home", "about", "services", "cases", "blog", "contact"]
}




