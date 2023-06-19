import { NextResponse } from "next/server"

import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

export const PATCH = async(request: Request, { params }) => {
    const { content } = await request.json()
    const user = await getUserByClerId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content,
        },
    })

    return NextResponse.json({ data: updatedEntry })
}