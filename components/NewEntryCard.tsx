'use client'

import { useRouter } from "next/navigation"

import { createNewEntry } from "@/utils/api"

const NewEntryCard = () => {
    const router = useRouter()

    const handleOnClick = async () => {
        const data = await createNewEntry()
        router.push(`/journal/${data.id}`)
        router.refresh()
    }

    return (
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow" onClick={handleOnClick}>
            <div className="px-4 py-5 sm:p-6">
                <span className="text-3xl">New Entry</span>
            </div>
        </div>
    )
}
export default NewEntryCard