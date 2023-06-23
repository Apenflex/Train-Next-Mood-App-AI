'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip,XAxis } from 'recharts'

type Entry = {
    color: string
    createdAt: Date
    entryId: string
    id: string
    mood: string
    negative: boolean
    sentimentScore: number
    subject: string
    summary: string
    updatedAt: Date
    userId: string
}

type HistoryChartProps = {
    data: Entry[]
}

type Payload = {
    id: string
    createdAt: Date
    updatedAt: Date
    entryId: string
    userId: string
}

type CustomTooltipProps = {
    payload: Payload | null
    label: string
    active: boolean
}

const CustomTooltip = ({ payload, label, active }: CustomTooltipProps) => {
    const dateLabel = new Date(label).toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    if (active) {
        const analysis = payload[0].payload
        return (
            <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
                <div className="absolute left-2 top-2 w-2 h-2 rounded-full" style={{ background: analysis.color }}></div>
                <p className="label text-sm text-black/30">{dateLabel}</p>
                <p className="intro text-xl uppercase">{analysis.mood}</p>
            </div>
        )
    }

    return null
}

const HistoryChart = ({ data }: HistoryChartProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                <XAxis dataKey="updatedAt" />
                <Tooltip content={<CustomTooltip payload={null} label={''} active={false} />} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default HistoryChart
