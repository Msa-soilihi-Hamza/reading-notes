import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator } from '#validators/book'

export default class BooksController {
  /**
   * Public: list all recipes
   */
  async index({ view }: HttpContext) {
    const books = await Book.query().orderBy('created_at', 'desc')
    return view.render('pages/books/index', { books })
  }

  /**
   * Public: show a single recipe
   */
  async show({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/books/show', { book })
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
   * Admin: list all recipes (admin view)
   */
  async adminIndex({ view }: HttpContext) {
    const books = await Book.query().orderBy('created_at', 'desc')
    return view.render('pages/admin/books/index', { books })
  }

  /**
   * Admin: show edit form
   */
  async edit({ view, params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return view.render('pages/admin/books/edit', { book })
  }

  /**
   * Admin: update recipe
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
   * Admin: delete recipe
   */
  async destroy({ response, params, session }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    await book.delete()
    session.flash('success', 'Recette supprimee avec succes')
    return response.redirect('/admin/books')
  }
}
