import { z } from 'zod'
export type AddPackSchema = z.infer<typeof addPackSchema>

export const addPackSchema = z.object({
  namePack: z.string(),
  private: z.boolean().default(false),
})
