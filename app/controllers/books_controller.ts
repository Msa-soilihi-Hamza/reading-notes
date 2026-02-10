import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator } from '#validators/book'

export default class BooksController {
  /**
   * All users: list all recipes
   */
  async index({ view }: HttpContext) {
    const books = await Book.query().orderBy('created_at', 'desc')
    return view.render('pages/books/index', { books })
  }

  /**
   * All users: show a single recipe
   */
  async show({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/books/show', { book })
  }

  /**
   * User: list my own recipes
   */
  async myRecipes({ view, auth }: HttpContext) {
    const books = await Book.query()
      .where('user_id', auth.user!.id)
      .orderBy('created_at', 'desc')
    return view.render('pages/books/my-recipes', { books })
  }

  /**
   * User: show create form
   */
  async userCreate({ view }: HttpContext) {
    return view.render('pages/books/create')
  }

  /**
   * User: store new recipe
   */
  async userStore({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(createBookValidator)
    await Book.create({
      ...data,
      userId: auth.user!.id,
    })
    session.flash('success', 'Recette creee avec succes')
    return response.redirect('/my-recipes')
  }

  /**
   * User: show edit form (own recipe only)
   */
  async userEdit({ view, params, auth, response, session }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    if (book.userId !== auth.user!.id) {
      session.flash('errors', 'Vous ne pouvez modifier que vos propres recettes')
      return response.redirect('/my-recipes')
    }
    return view.render('pages/books/edit', { book })
  }

  /**
   * User: update own recipe
   */
  async userUpdate({ request, response, params, auth, session }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    if (book.userId !== auth.user!.id) {
      session.flash('errors', 'Vous ne pouvez modifier que vos propres recettes')
      return response.redirect('/my-recipes')
    }
    const data = await request.validateUsing(updateBookValidator)
    book.merge(data)
    await book.save()
    session.flash('success', 'Recette mise a jour avec succes')
    return response.redirect('/my-recipes')
  }

  /**
   * User: delete own recipe
   */
  async userDestroy({ response, params, auth, session }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    if (book.userId !== auth.user!.id) {
      session.flash('errors', 'Vous ne pouvez supprimer que vos propres recettes')
      return response.redirect('/my-recipes')
    }
    await book.delete()
    session.flash('success', 'Recette supprimee avec succes')
    return response.redirect('/my-recipes')
  }

  /**
   * Admin: list all recipes (admin view)
   */
  async adminIndex({ view }: HttpContext) {
    const books = await Book.query().preload('user').orderBy('created_at', 'desc')
    return view.render('pages/admin/books/index', { books })
  }

  /**
   * Admin: show create form
   */
  async create({ view }: HttpContext) {
    return view.render('pages/admin/books/create')
  }

  /**
   * Admin: store new recipe
   */
  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(createBookValidator)
    await Book.create({
      ...data,
      userId: auth.user!.id,
    })
    session.flash('success', 'Recette creee avec succes')
    return response.redirect('/admin/books')
  }

  /**
   * Admin: show edit form (any recipe)
   */
  async edit({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/admin/books/edit', { book })
  }

  /**
   * Admin: update any recipe
   */
  async update({ request, response, params, session }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    const data = await request.validateUsing(updateBookValidator)
    book.merge(data)
    await book.save()
    session.flash('success', 'Recette mise a jour avec succes')
    return response.redirect('/admin/books')
  }

  /**
   * Admin: delete any recipe
   */
  async destroy({ response, params, session }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    session.flash('success', 'Recette supprimee avec succes')
    return response.redirect('/admin/books')
  }
}
