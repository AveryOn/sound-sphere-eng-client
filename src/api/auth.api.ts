import type { User } from '@/@types/user.types'
import type { AxiosError } from 'axios'
import { useApi } from '@/composables/useApi'

const api = useApi({
  logger: {
    levels: ['DEBUG', 'ERROR'],
  },
})

/**
 * Проверяет, что пользователь авторизован.
 ** Необходимо передавать токен c куками
 */
export async function checkAuth(): Promise<User | null> {
  try {
    const response = await api.GET<User>('/auth/check', {
      withCredentials: true,
    })
    const user = response.data

    if (!user) {
      throw { status: 401 }
    }

    return user
  } catch (err) {
    const { status } = err as AxiosError
    if (status === 401) {
      return null
    }
    throw err
  }
}
