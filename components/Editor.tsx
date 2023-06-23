'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

import { deleteEntry, updateEntry } from '@/utils/api'

import Spinner from './Spinner'

type EditorProps = {
    entry: {
        id: string
        content: string
        analysis: {
            color: string
            mood: string
            negative: boolean
            subject: string
        }
    }
}

const Editor = ({ entry }: EditorProps) => {
    const [text, setText] = useState(entry.content)
    const [currentEntry, setEntry] = useState(entry)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        await deleteEntry(entry.id)
        router.push('/journal')
        router.refresh()
    }

    useAutosave({
        data: text,
        onSave: async (_text) => {
            if (_text === entry.content) return
            setIsSaving(true)
            const { data } = await updateEntry(entry.id, { content: _text })
            setEntry(data)
            setIsSaving(false)
        },
    })
    return (
        <div className="w-full h-full grid grid-rows-2 gap-0  lg:grid-cols-[2fr_minmax(0,_1fr)_0fr]">
            <div className="h-full relative row-start-2 lg:row-start-1">
                <div className="absolute left-0 top-0 p-2">{isSaving ? <Spinner /> : <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>}</div>
                <div className="h-full">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-full text-xl p-8" />
                </div>
            </div>
            <div className="border-l border-black/5">
                <div style={{ background: currentEntry?.analysis?.color }} className="h-[50px] bg-blue-600 text-white p-2 lg:h-[100px] lg:p-8">
                    <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
                </div>
                <div>
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-4 px-8 flex items-center justify-between">
                            <div className="text-xl font-semibold w-1/3">Subject</div>
                            <div className="text-xl">{currentEntry?.analysis?.subject}</div>
                        </li>

                        <li className="py-4 px-8 flex items-center justify-between">
                            <div className="text-xl font-semibold">Mood</div>
                            <div className="text-xl">{currentEntry?.analysis?.mood}</div>
                        </li>

                        <li className="py-4 px-8 flex items-center justify-between">
                            <div className="text-xl font-semibold">Negative</div>
                            <div className="text-xl">{currentEntry?.analysis?.negative ? 'True' : 'False'}</div>
                        </li>
                        <li className="py-4 px-8 flex items-center justify-between">
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Editor
