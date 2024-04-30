import type { FastifyReply, FastifyRequest } from 'fastify'
import { crunchyLogin } from './crunchyroll.service'
import { dialog } from 'electron'
import { messageBox } from '../../../electron/background'
import { CrunchyEpisodes, CrunchySeason } from '../../types/crunchyroll'
import { loggedInCheck } from '../service/service.service'

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
    const account = await loggedInCheck('CR')

    if (!account) {
        return reply.code(401).send({ message: 'Not Logged in' })
    }

    const { data, error } = await crunchyLogin(account.username, account.password)

    if (error) {
        reply.code(400).send(error)
    }

    return reply.code(200).send(data)
}
