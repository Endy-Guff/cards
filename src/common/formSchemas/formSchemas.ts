import { z } from 'zod'
export type AddPackSchema = z.infer<typeof addPackSchema>
export type AddCardSchema = z.infer<typeof addCardSchema>

export const addPackSchema = z.object({
  namePack: z.string(),
  private: z.boolean().default(false),
})

export const addCardSchema = z.object({
  question: z.string(),
  answer: z.string(),
})
