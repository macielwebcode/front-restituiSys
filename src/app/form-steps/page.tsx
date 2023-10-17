'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import styles from './styles.module.css'


import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})

export default function RadioGroupForm () {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit (data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <main className="flex px-6 drop-shadow-2xl">
          <section className="bg-white p-10 flex flex-col rounded justify-center">

            <form>
              <fieldset className={styles.fieldset}>

                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Acessar Sistema
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Login</label>
                    <input id="" name="yes-" type="text" className="block border-gray-300 text-indigo-600 focus:ring-indigo-600"></input>
                  </div>
                  <div className="flex items-center gap-x-3">

                    <label className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                    <input id="" name="no-" type="password" className="block border-gray-300 text-indigo-600 focus:ring-indigo-600"></input>
                  </div>
                </div>
              </fieldset>







              <div className="mt-6 flex items-center justify-center gap-x-6">
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Acessar</button>
              </div>

            </form>
          </section>

        </main>
      </div>
    </>

  )
}
