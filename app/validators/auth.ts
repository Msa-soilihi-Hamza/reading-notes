import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const registerValidator = vine.compile(
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
      .minLength(12)
      .maxLength(180)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/)
      .confirmed(),
  })
)

registerValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'Ce champ est requis',
  'string': 'Le champ doit etre une chaine de caracteres',
  'email': "L'adresse email n'est pas valide",
  'password.minLength': 'Le mot de passe doit faire au moins 12 caracteres',
  'password.regex': 'Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un symbole',
  'password_confirmation.confirmed': 'Les mots de passe ne correspondent pas',
  'fullName.minLength': 'Le nom est trop court',
  'database.unique': 'Cette valeur est deja utilisee',
  'email.database.unique': 'Cette adresse email est deja utilisee',
  'email.unique': 'Cette adresse email est deja utilisee',
})

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })
)

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'Ce champ est requis',
  'email': "L'adresse email n'est pas valide",
})
