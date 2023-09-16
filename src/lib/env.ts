import zod from 'zod'

const envSchema = zod.object({
  PDF_UPDATE_PATH: zod.string().nonempty()
})

export const env = envSchema.parse(process.env)