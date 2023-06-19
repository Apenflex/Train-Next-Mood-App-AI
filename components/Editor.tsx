'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'

import { updateEntry } from '@/utils/api'

type EditorProps = {
    entry: {
        id: string
        content: string
    }
}

const Editor = ({ entry }: EditorProps) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, _value)
            setIsLoading(false)
        },
    })
    return (
        <div className="w-full h-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                    <span className="text-3xl">Saving...</span>
                </div>
            )}
            <textarea className="w-full h-full p-8 text-xl outline-none" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
export default Editor
