import HistoryChart from '@/components/HistoryChart'
import { Entry } from '@/types/historyType'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
    const user = await getUserByClerId()
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    const total = analyses.reduce((acc, curr) => {
        return acc + curr.sentimentScore
    }, 0)
    const average = (total / analyses.length).toFixed(2)

    return { analyses, average }
}

const HistoryPage = async () => {
    const { analyses, average } = await getData()

    const entryAnalyses: Entry[] = analyses.map((analysis) => ({
        payload: {
            mood: analysis.mood,
            color: analysis.color,
            sentimentScore: analysis.sentimentScore,
        },
        updatedAt: analysis.updatedAt,
        sentimentScore: analysis.sentimentScore,
    }))

    return (
        <div className="h-full px-6 py-8">
            <div>
                <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
            </div>
            <div className="h-full w-full">
                <HistoryChart data={entryAnalyses} />
            </div>
        </div>
    )
}
export default HistoryPage
