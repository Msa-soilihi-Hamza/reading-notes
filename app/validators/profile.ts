import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
  })
)

updateProfileValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'Ce champ est requis',
  'fullName.minLength': 'Le nom est trop court',
})

export const updatePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string(),
    password: vine
      .string()
      .minLength(12)
      .maxLength(180)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/)
      .confirmed(),
  })
)

updatePasswordValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'Ce champ est requis',
  'password.minLength': 'Le nouveau mot de passe doit faire au moins 12 caracteres',
  'password.regex': 'Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un symbole',
  'password_confirmation.confirmed': 'Les nouveaux mots de passe ne correspondent pas',
})
