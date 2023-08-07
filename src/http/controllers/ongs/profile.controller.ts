import { makeProfileOngUseCase } from '@/use-cases/factories/make-profile-ong-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProfileOng = makeProfileOngUseCase()
  const { ong } = await getProfileOng.execute({
    ongId: request.user.sub,
  })
  console.log(request.user.sub)

  return reply.status(200).send({
    ong: {
      ...ong,
      password_hash: undefined,
    },
  })
}
