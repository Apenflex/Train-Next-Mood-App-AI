import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { prisma } from '@/utils/db'

const createNewUser = async () => {
    const user = await currentUser()
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id || '',
        },
    })

    if (!match) {
        await prisma.user.create({
            data: {
                clerkId: user?.id || '',
                email: user?.emailAddresses[0]?.emailAddress || '',
            },
        })
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()
    return <div>...LoAdInG</div>
}

export default NewUser
