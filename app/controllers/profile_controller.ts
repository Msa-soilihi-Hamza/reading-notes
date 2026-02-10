import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { updateProfileValidator, updatePasswordValidator } from '#validators/profile'

export default class ProfileController {
  async edit({ view }: HttpContext) {
    return view.render('pages/profile/edit')
  }

  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    const data = await request.validateUsing(updateProfileValidator)

    user.fullName = data.fullName
    await user.save()

    session.flash('success', 'Profil mis a jour avec succes')
    return response.redirect('/profile')
  }

  async updatePassword({ request, response, auth, session }: HttpContext) {
    const { currentPassword, password } = await request.validateUsing(updatePasswordValidator)
    const user = auth.user!

    const isValid = await hash.verify(user.password, currentPassword)
    if (!isValid) {
      session.flash('errors', 'L\'ancien mot de passe est incorrect')
      return response.redirect('/profile')
    }

    user.password = password
    await user.save()

    session.flash('success', 'Mot de passe modifie avec succes')
    return response.redirect('/profile')
  }

  async destroy({ response, auth, session }: HttpContext) {
    const user = auth.user!
    await auth.use('web').logout()
    await user.delete()
    session.flash('success', 'Votre compte a ete supprime')
    return response.redirect('/login')
  }
}
