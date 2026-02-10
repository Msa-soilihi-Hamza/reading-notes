import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async register({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
