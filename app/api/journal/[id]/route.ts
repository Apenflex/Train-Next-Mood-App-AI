import { NextResponse } from "next/server"

import { updatePath } from "@/utils/actions"
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

interface PatchRequest extends Request {
    json(): Promise<{ content: string }>
}

interface PatchParams {
    id: string
}

export const PATCH = async (request: PatchRequest, { params }: { params: PatchParams }) => {
    const { content } = await request.json()
    const user = await getUserByClerId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        },
    })

    return NextResponse.json({ data: updatedEntry })
}