import z from 'zod'

export const signInValidationSchema = z.object({
  email_id: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
});

export const signUpValidationschema = z.object({
    user_name : z.string().min(5, 'User Name must atleast contain 5 characters'),
    email_id: z.string().email('Invlaid Email'),
    phone_number : z.string()
                .length(10, 'Phone number must be exactly 10 characters')
                .regex(/^\d{10}$/, 'Phone number must contain only digits'),
    password : z.string().min(8, 'Password Should contain 8 Characters'),
    cpassword : z.string().min(8, 'Password Should contain 8 Characters')
}).refine(data => data.cpassword === data.password, {
    message:'The Passwords does\'nt match',
    path:["cpassword"]
})