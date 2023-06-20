'use server'

import { revalidatePath } from 'next/cache'

export const updatePath = (paths = []) => paths.forEach((p) => revalidatePath(p))
