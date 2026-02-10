import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(255),
    category: vine.string().trim().maxLength(100).optional(),
    description: vine.string().trim().optional(),
    ingredients: vine.string().trim().optional(),
    instructions: vine.string().trim().optional(),
    cookingTime: vine.number().positive().optional(),
    servings: vine.number().positive().optional(),
    difficulty: vine.enum(['facile', 'moyen', 'difficile']),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(255),
    category: vine.string().trim().maxLength(100).optional(),
    description: vine.string().trim().optional(),
    ingredients: vine.string().trim().optional(),
    instructions: vine.string().trim().optional(),
    cookingTime: vine.number().positive().optional(),
    servings: vine.number().positive().optional(),
    difficulty: vine.enum(['facile', 'moyen', 'difficile']),
  })
)
