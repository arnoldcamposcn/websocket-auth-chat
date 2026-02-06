import z from "zod";

export const updateProfileSchema = z.object({
    email: z
      .string()
      .email("Debe ser una dirección de correo electrónico válida")
      .optional()
      .or(z.literal("")),
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos",
      })
      .max(30, "El nombre de usuario no puede exceder 30 caracteres")
      .optional()
      .or(z.literal("")),
    displayName: z
      .string()
      .max(100, "El nombre no puede exceder 100 caracteres")
      .optional()
      .or(z.literal("")),
    avatar: z
      .string()
      .url("Debe ser una URL válida")
      .optional()
      .or(z.literal("")),
    bio: z
      .string()
      .max(500, "La biografía no puede exceder 500 caracteres")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .optional()
      .or(z.literal("")),
    location: z
      .string()
      .max(100, "La ubicación no puede exceder 100 caracteres")
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .url("Debe ser una URL válida")
      .optional()
      .or(z.literal("")),
  });
  
  export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;