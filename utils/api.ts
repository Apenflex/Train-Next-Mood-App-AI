const createUrl = (path: string) => {
    return window.location.origin + path
}

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createUrl('/api/entry'), {
            method: 'POST',
            body: JSON.stringify({ content: 'Write about your day!' }),
        })
    )
    
    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const updateEntry = async (id: String, content: Object) => {
    const res = await fetch(
        new Request(createUrl(`/api/entry/${id}`), {
            method: 'PATCH',
            body: JSON.stringify({content}),
            headers: {
                'Content-Type': 'application/json', //цей заголовок для вказівки типу вмісту
            },
        })
    )
    
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const deleteEntry = async (id: String) => {
    const res = await fetch(
        new Request(createUrl(`/api/entry/${id}`), {
            method: 'DELETE',
        })
    )
    
    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const askQuestion = async (question: String) => {
    const res = await fetch(
        new Request(createUrl(`/api/question`), {
            method: 'POST',
            body: JSON.stringify({ question }),
        })
    )

    if (res.ok) {
        return res.json()
    } else {
        throw new Error('Something went wrong on API server!')
    }
}
