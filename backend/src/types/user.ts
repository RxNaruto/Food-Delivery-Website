import {z} from 'zod';

export const signupTypes = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    mobile: z.number()
})

export const loginTypes = z.object({
    username: z.string().email(),
    password: z.string().min(6)
  
})