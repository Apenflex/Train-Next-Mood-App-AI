import { NextResponse } from 'next/server'

import { qa } from '@/utils/ai'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

export const POST = async (request) => {
    const { question } = await request.json()
    const user = await getUserByClerId()
    
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        select: {
            content: true,
            createdAt: true,
        },
    })
    const answer = await qa(question, entries)

    return NextResponse.json({ data: answer })
}