'use server'
import { revalidatePath } from 'next/cache'

/**
 * @description Function to update cache for given paths
 * @param {string[]} paths - array of paths to update
 */
export const updatePath = (paths: string[] = []) => paths.forEach((p) => revalidatePath(p))
