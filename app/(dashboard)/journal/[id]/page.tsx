import Editor from "@/components/Editor"
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

type EntryPageProps = {
    params: {
        id: string
    }
}

const getEntry = async (id: string) => {
    const user = await getUserByClerId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            },
        },
        include: {
            analysis: true,
        }
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