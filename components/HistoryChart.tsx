'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { CustomTooltipType, HistoryChartType } from '@/types/historyType'

const CustomTooltip = ({ payload, label, active }: CustomTooltipType) => {
    const dateLabel = new Date(label).toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    if (active && payload !== null) {
        const analysis = payload[0].payload

        return (
            <div className="p-5 custom-tooltip shadow-lg border border-black/10 rounded-lg backdrop-blur-md" style={{ background: analysis.color }}>
                {/* <div className="absolute left-2 top-2 w-5 h-5 rounded-full"></div> */}
                <p className="label text-xs text-black/50">{dateLabel}</p>
                <div className="flex flex-col">
                    <span className="intro text-lg uppercase mb-1">{analysis.mood}</span>
                    <span className="intro text-sm uppercase">Sentiment Score {analysis.sentimentScore}</span>
                </div>
            </div>
        )
    }
    return null
}

const HistoryChart = ({ data }: HistoryChartType) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                <XAxis dataKey="updatedAt" />
                <Tooltip content={<CustomTooltip payload={data} label="" active={false} />} />
            </LineChart>
        </ResponsiveContainer>
    )
}
export default HistoryChart
