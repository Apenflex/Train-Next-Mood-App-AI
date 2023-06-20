import Link from 'next/link'

import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntries = async () => {
    const user = await getUserByClerId()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            analysis: true,
        },
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()

    return (
        <div className="px-6 py-8 bg-zinc-100/50 h-full">
            <h2 className="text-4xl mb-12">Journals</h2>
            <div className="my-8">
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <Link href={`/journal/${entry.id}`} >
                            <EntryCard entry={entry} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default JournalPage
