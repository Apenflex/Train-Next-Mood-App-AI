const createUrl = (path: string) => {
    return window.location.origin + path;
};

export const createNewEntry = async () => {
    const res = await fetch(new Request(createUrl('/api/journal'), {
        method: 'POST',
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const updateEntry = async (id: String, content: string) => {
    const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const deleteEntry = async (id: String) => {
    const res = await fetch(new Request(createUrl(`/api/journal/${id}`), {
        method: 'DELETE',
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const askQuestion = async (question: String) => {
    const res = await fetch(new Request(createUrl('/api/question'), {
        method: 'POST',
        body: JSON.stringify({ question }),
    }))

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}