import z from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string({ required_error: 'Este campo es requerido.' })
      .min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres.',
      })
      .max(30, {
        message: 'El nombre de usuario no puede tener más de 30 caracteres.',
      }),
    email: z
      .string({ required_error: 'Este campo es requerido.' })
      .email({ message: 'El correo electrónico no es válido.' }),
    password: z
      .string({ required_error: 'Este campo es requerido.' })
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    confirmPassword: z
      .string({ required_error: 'Este campo es requerido.' })
      .min(6, {
        message:
          'La confirmación de la contraseña debe tener al menos 6 caracteres.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });
