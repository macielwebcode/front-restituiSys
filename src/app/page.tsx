'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>()
  const handlerFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return
    }
    setFile(fileObj)
  }
  const handlerClick = async (event: any) => {
    event.preventDefault()
    if (!file) return
    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if (!res.ok) throw new Error(await res.text())
      const message = await res.json()
      console.log(message.success)
    } catch (e: any) {
      console.error(e)
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="pdf-file" className="text-6xl font-bold text-red-600">Upload PDF</Label>
        <Input id="pdf-file" type="file" onChange={handlerFileChange} />
        <Button onClick={handlerClick}>OK</Button>
      </div>
      
    </main>
  )
}
