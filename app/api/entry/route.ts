import { NextResponse } from "next/server"

// import { updatePath } from "@/utils/actions"
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

export const POST = async (request: Request) => {
    const data = await request.json()
    const user = await getUserByClerId()
    const entry = await prisma.journalEntry.create({
        data: {
            content: data.content,
            user: {
                connect: {
                    id: user.id,
                },
            },
            analysis: {
                create: {
                    mood: 'Neutral',
                    subject: 'None',
                    negative: false,
                    summary: 'None',
                    sentimentScore: 0,
                    color: '#0101fe',
                    userId: user.id,
                },
            },
        },
    })

    // updatePath(['/journal'])

    return NextResponse.json({ data: entry })
}