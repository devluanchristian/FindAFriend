import { InvalidCrendetials } from '@/use-cases/errors/invalid-credentials-errors'
import { makeAuthenticateOngUseCase } from '@/use-cases/factories/make-authenticate-ong-use-case'

import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOngSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateOngSchema.parse(request.body)

  try {
    const authenticateOngUseCase = makeAuthenticateOngUseCase()

    const { ong } = await authenticateOngUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
          expiresIn: '7d',
        },
      },
    )
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCrendetials) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
