import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Ce middleware effectue une vérification "silencieuse" de l'utilisateur.
 * Contrairement à 'AuthMiddleware', il ne redirige JAMAIS l'utilisateur vers le login.
 */
export default class SilentAuthMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
  ) {
    /**
     * .check() demande à Adonis : "Regarde dans les cookies si quelqu'un est connecté".
     * - Si OUI : Il remplit 'ctx.auth.user' avec les infos de la personne.
     * - Si NON : Il ne fait rien et ne renvoie pas d'erreur.
     */
    await ctx.auth.check()

    /**
     * On laisse la requête continuer normalement vers le contrôleur.
     * Que l'utilisateur soit connecté ou non, la page s'affichera.
     */
    return next()
  }
}