import z from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Este campo es requerido.' })
    .email({ message: 'El correo electrónico no es válido.' }),
  password: z
    .string({ required_error: 'Este campo es requerido.' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});
