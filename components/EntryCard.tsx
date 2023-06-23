import { Entry } from '@/types/entryCardType'

const createDropShadowStyle = (color: String, alpha: Number) => {
    const hexToRgba = (hex: String, alpha: Number) => {
        const hexValue = hex.replace('#', '')
        const r = parseInt(hexValue.substring(0, 2), 16)
        const g = parseInt(hexValue.substring(2, 4), 16)
        const b = parseInt(hexValue.substring(4, 6), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    const rgbaColor = hexToRgba(color, alpha)
    return {
        filter: `drop-shadow(0 5px 5px ${rgbaColor})`,
    }
}

const EntryCard = ({ entry }: Entry) => {
    const date = new Date(entry.createdAt).toDateString()
    const dropShadowStyle = createDropShadowStyle(entry.analysis?.color || '', 0.2)

    return (
        <div className="divide-y divide-gray-400/50 overflow-hidden rounded-lg bg-neutral-200" style={dropShadowStyle}>
            <div className="px-4 py-5">{date}</div>
            <div className="flex flex-col gap-2 px-4 py-2">
                <span className="border-b-2">Summary</span>
                <span>{entry.analysis?.summary}</span>
            </div>
            <div className="px-4 py-4">
                <span>Mood: </span>
                <span>{entry.analysis?.mood}</span>
            </div>
        </div>
    )
}
export default EntryCard
