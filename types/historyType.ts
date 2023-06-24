export type Entry = {
    payload: {
        mood: string
        color: string
        sentimentScore: number
    }
    updatedAt: Date
    sentimentScore: number
}

export type HistoryChartType = {
    data: Entry[]
}

export type CustomTooltipType = {
    payload: Entry[] | null
    label: string
    active: boolean
}
