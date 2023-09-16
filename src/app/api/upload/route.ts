import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto';
import path, { join } from 'path'
import fs, { writeFile }  from 'fs/promises'

import { env } from '@/lib/env';

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  
  if (!file || !file.type.includes('pdf')) {
    return NextResponse.json({ success: false })
  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const randomStringName = crypto.randomBytes(16).toString('hex');
  const fileExtension = path.extname(file.name);
  const newFileName = `${randomStringName}${fileExtension}`
  const uploadDirectory = env.PDF_UPDATE_PATH
  await fs.mkdir(uploadDirectory, { recursive: true });
  const pathFolder = join(uploadDirectory, newFileName)
  await writeFile(pathFolder, buffer)
  return NextResponse.json({ success: true })
}