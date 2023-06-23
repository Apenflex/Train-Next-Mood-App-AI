export interface Analysis {
    color: string
    mood: string
    negative: boolean
    subject: string
}

export type EditorProps = {
    entry: {
        id: string
        content: string
        analysis: Analysis | null
    }
}