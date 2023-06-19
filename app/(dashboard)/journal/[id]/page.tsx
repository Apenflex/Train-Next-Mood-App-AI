import Editor from "@/components/Editor"
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id) => {
    const user = await getUserByClerId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            }
        },
    })

    return entry
}

const EntryPage = async ({ params }) => {
    const entry = await getEntry(params.id)
    
    return (
        <div className="w-full h-full">
            <Editor entry={entry} />
        </div>
    )
}

export default EntryPage