import {z} from 'zod';

export const adminsignupTypes = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    mobile: z.number(),

})

export const adminloginTypes = z.object({
    username: z.string().email(),
    password: z.string().min(6)
  
})

export const addingRestaurant = z.object({
    name: z.string(),
    address: z.string(),
    contact: z.number(),
    email: z.string().email()


})