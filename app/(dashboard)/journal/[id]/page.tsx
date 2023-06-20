import Editor from "@/components/Editor"
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

type Entry = {
    id: string
    createdAt: Date
    updatedAt: Date
    content: string
    userId: string
    analysis: {
        color: string
        subject: string
        mood: string
    }
}

type EntryPageProps = {
    params: {
        id: string
    }
}

const getEntry = async (id: string): Promise<Entry | null> => {
    const user = await getUserByClerId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            },
        },
    })

    return entry
}

const EntryPage = async ({ params }: EntryPageProps) => {
    const entry = await getEntry(params.id)
    if (!entry) return null
    
    return (
        <div className="w-full h-full">
            <Editor entry={entry} />
        </div>
    )
}

export default EntryPage