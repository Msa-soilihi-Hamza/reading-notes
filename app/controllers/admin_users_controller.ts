import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { adminCreateUserValidator, adminUpdateUserValidator } from '#validators/admin'

export default class AdminUsersController {
  async index({ view }: HttpContext) {
    const users = await User.query().orderBy('created_at', 'desc')
    return view.render('pages/admin/users/index', { users })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/users/create')
  }

  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(adminCreateUserValidator)
    await User.create(data)
    session.flash('success', 'Utilisateur cree avec succes')
    return response.redirect('/admin/users')
  }

  async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return view.render('pages/admin/users/edit', { editUser: user })
  }

  async update({ params, request, response, session }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = await request.validateUsing(adminUpdateUserValidator, {
      meta: { userId: user.id },
    })

    user.fullName = data.fullName
    user.email = data.email
    user.role = data.role

    if (data.password) {
      user.password = data.password
    }

    await user.save()
    session.flash('success', 'Utilisateur modifie avec succes')
    return response.redirect('/admin/users')
  }

  async destroy({ params, response, session, auth }: HttpContext) {
    const user = await User.findOrFail(params.id)

    if (user.id === auth.user!.id) {
      session.flash('errors', 'Vous ne pouvez pas supprimer votre propre compte depuis ici')
      return response.redirect('/admin/users')
    }

    await user.delete()
    session.flash('success', 'Utilisateur supprime avec succes')
    return response.redirect('/admin/users')
  }
}
