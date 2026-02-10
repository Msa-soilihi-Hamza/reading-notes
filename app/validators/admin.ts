import vine from '@vinejs/vine'

export const adminCreateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(180)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    role: vine.enum(['admin', 'user']),
  })
)

export const adminUpdateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .where('email', value)
          .whereNot('id', field.meta.userId)
          .first()
        return !user
      }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(180)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .optional(),
    role: vine.enum(['admin', 'user']),
  })
)
