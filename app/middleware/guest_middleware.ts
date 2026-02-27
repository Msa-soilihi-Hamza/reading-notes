import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class GuestMiddleware {
  /**
   * C'est l'adresse de redirection. 
   * Si tu es déjà connecté, on te renvoie vers l'accueil ('/').
   */
  redirectTo = '/'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    /**
     * La boucle 'for' vérifie tes différents systèmes de connexion (web, api, etc.).
     * Par défaut, elle regarde ta session "web".
     */
    for (let guard of options.guards || [ctx.auth.defaultGuard]) {
      
      /**
       * .check() demande : "Est-ce que cet utilisateur est déjà connecté ?"
       */
      if (await ctx.auth.use(guard).check()) {
        
        /**
         * SI OUI : On le redirige vers l'accueil. 
         * On ne veut pas qu'il puisse voir la page de Login s'il est déjà là !
         */
        return ctx.response.redirect(this.redirectTo, true)
      }
    }

    /**
     * SI NON (s'il n'est pas connecté) : On le laisse passer au contrôleur.
     * C'est bien un "invité", il a le droit de voir la page de connexion.
     */
    return next()
  }
}