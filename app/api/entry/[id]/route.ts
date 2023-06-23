import { NextResponse } from 'next/server'

import { updatePath } from '@/utils/actions'
import { analyzeEntry } from '@/utils/ai'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

export const DELETE = async (request: Request, { params }) => {
    const user = await getUserByClerId()
    
    await prisma.analysis.deleteMany({
        where: {
            entryId: params.id,
        },
    })
    await prisma.journalEntry.delete({
        where: {
            userId_id: {
                id: params.id,
                userId: user.id,
            },
        },
    })

    // updatePath(['/journal'])

    return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json()
    // console.log('PATCH Method', content)
    const user = await getUserByClerId()

    const entry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                id: params.id,
                userId: user.id,
            },
        },
        data: content,
    })

    const analysis = await analyzeEntry(entry)
    const savedAnalysis = await prisma.analysis.upsert({
        where: {
            entryId: entry.id,
        },
        update: { ...analysis },
        create: {
            entryId: entry.id,
            userId: user.id,
            ...analysis,
        },
    })

    updatePath(['/journal'])

    return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}