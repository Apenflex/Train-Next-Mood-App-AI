'use client'

import { FormEvent, useState } from 'react'

import { askQuestion } from '@/utils/api'

import Spinner from './Spinner'

const Question = () => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { data } = await askQuestion(question)

        setAnswer(data)
        setLoading(false)
        setQuestion('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-1">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-lg w-full max-w-[500px]"
                        disabled={loading}
                        placeholder="Ask a question..."
                    />
                    <button disabled={loading} type="submit" className="w-[160px] h-[40px] bg-blue-400 px-4 py-2 rounded-md sm:w-[60px]">
                        {loading ? <Spinner /> : 'Ask'}
                    </button>
                </div>
            </form>

            {answer && <p className="my-4 text-xl">{answer}</p>}
        </div>
    )
}
export default Question
