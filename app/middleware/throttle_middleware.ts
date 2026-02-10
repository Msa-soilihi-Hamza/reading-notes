import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

const attempts = new Map<string, { count: number; resetAt: number }>()

export default class ThrottleMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const ip = request.ip()
    const key = `${ip}:${request.url()}`
    const now = Date.now()
    const maxAttempts = 10
    const windowMs = 60 * 1000 // 1 minute

    const entry = attempts.get(key)

    if (entry && now < entry.resetAt) {
      if (entry.count >= maxAttempts) {
        return response.tooManyRequests('Trop de tentatives. Reessayez dans une minute.')
      }
      entry.count++
    } else {
      attempts.set(key, { count: 1, resetAt: now + windowMs })
    }

    // Clean old entries periodically
    if (Math.random() < 0.01) {
      for (const [k, v] of attempts) {
        if (now > v.resetAt) attempts.delete(k)
      }
    }

    return next()
  }
}
