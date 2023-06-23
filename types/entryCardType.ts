type Analysis = {
    id: string
    createdAt: Date
    updatedAt: Date
    summary: string
    mood: string
    color: string
}

export type Entry = {
    entry: {
        id: string
        createdAt: Date
        updatedAt: Date
        content: string
        status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
        userId: string
        analysis: Analysis | null
    }
}
