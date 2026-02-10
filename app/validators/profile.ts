import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(180)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .confirmed(),
  })
)
