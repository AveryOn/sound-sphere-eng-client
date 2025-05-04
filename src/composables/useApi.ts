// src/composables/useApi.ts
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import chalk from 'chalk'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

/**
 * Конфигурация хелпера расширяющая его поведение
 */
interface UseApiConfig {
    /** Включить логирование на каждый запрос */
    logger?: {
        /** Массив уровней логирования */
        levels: LogLevel[]
    }
}

/**
 * Уровни логов приложения
 */
type LogLevel = 'INFO' | 'DEBUG' | 'ERROR' | 'WARN'
const LOG_LEVELS = ['INFO', 'DEBUG', 'ERROR', 'WARN'] as const
const API_METHODS = {
    GET: 'GET',
    POST: 'GET',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const

/**
 * Красит сообщение в цвет в зависимости от уровня лога
 * @param msg текст сообщения
 * @param level уровень лога `INFO` | `WARN` | `ERROR` | `DEBUG`
 * @returns отформатированный текст, который консоль красит
 */
function paintMsg(msg: string, level: LogLevel): string {
    try {
        if(!msg) throw 0
        if(!LOG_LEVELS.includes(level)) throw 0
        if(!level) level = 'INFO'

        if(level === 'INFO') {
            return chalk.bgBlue.black.bold(msg)
        }
        else if(level === 'DEBUG') {
            return chalk.bgGray.black.bold(msg)
        }
        else if(level === 'ERROR') {
            return chalk.bgRed.black.bold(msg)
        }
        else if(level === 'WARN') {
            return chalk.bgYellowBright.white.bold(msg)
        }
        else throw 0
    } catch (err) {
        return ''
    }
}

/**
 * Формирует сообщение для лога в зависимости от его уровня
 */
function formatApiMsg(
    /** URL на который идет axios запрос  */
    url: string = 'undefined', 
    /** Метод REST API который выполняет запрос */
    method: keyof typeof API_METHODS, 
    /** Уровень лога `INFO` | `WARN` | `ERROR` | `DEBUG` */
    level: LogLevel
) {
    try {
        if(!level) throw '[formatApiMsg] level is not defined'
        if(!LOG_LEVELS.includes(level)) throw '[formatApiMsg] level is not valid'

        return paintMsg(` [API] ${API_METHODS[method]}/  ${url} `, level)
    } catch (err) {
        console.error(err); throw err
    }
}

/**
 * Хелпер для общения с API-сервером.
 * Обертки над axios с типизацией и JSDoc.
 */
export function useApi(apiConfig?: UseApiConfig) {
    /**
     * Выполняет GET-запрос
     * @template R - Тип возвращаемого значения
     * @param {string} url - URL запроса
     * @param {AxiosRequestConfig} [config] - Доп. конфигурация запроса
     * @returns {Promise<import('axios').AxiosResponse<R>>}
    */
    const GET = async <R = any>(
        url: string, 
        config: AxiosRequestConfig = {}
    ): Promise<import('axios').AxiosResponse<R>> => {
        try {
            if(apiConfig?.logger?.levels?.includes('DEBUG')) {
                console.debug(formatApiMsg(url, 'GET', 'DEBUG'))
            }
            return await api.get<R>(url, config)
        } catch (err) {
            const { status } = err as AxiosError
            if(apiConfig?.logger?.levels?.includes('ERROR')) {
                console.error(
                    formatApiMsg(url, 'GET', 'ERROR'),
                    status, 
                    err,
                )
            }
            throw err
        }
    }

    /**
     * Выполняет POST-запрос
     * @template R - Тип возвращаемого значения
     * @param {string} url - URL запроса
     * @param {any} [data] - Тело запроса
     * @param {AxiosRequestConfig} [config] - Доп. конфигурация запроса
     * @returns {Promise<import('axios').AxiosResponse<R>>}
    */
    const POST = async <R = any>(
        url: string, 
        data?: any, 
        config: AxiosRequestConfig = {}
    ): Promise<import('axios').AxiosResponse<R>> => {
        try {
            if(apiConfig?.logger?.levels?.includes('DEBUG')) {
                console.debug(formatApiMsg(url, 'POST', 'DEBUG'))
            }
            return await api.post<R>(url, data, config)
        } catch (err) {
            const { status } = err as AxiosError
            if(apiConfig?.logger?.levels?.includes('ERROR')) {
                console.error(
                    formatApiMsg(url, 'POST', 'ERROR'),
                    status, 
                    err,
                )
            }
            throw err
        }
    }

    /**
     * Выполняет PUT-запрос (полное обновление ресурса)
     * @template R
     * @returns {Promise<import('axios').AxiosResponse<R>>}
    */
    const PUT = async <R = any>(
        url: string, 
        data?: any, 
        config: AxiosRequestConfig = {}
    ): Promise<import('axios').AxiosResponse<R>> => {
        try {
            if(apiConfig?.logger?.levels?.includes('DEBUG')) {
                console.debug(formatApiMsg(url, 'PUT', 'DEBUG'))
            }
            return await api.put<R>(url, data, config)
        } catch (err) {
            const { status } = err as AxiosError
            if(apiConfig?.logger?.levels?.includes('ERROR')) {
                console.error(
                    formatApiMsg(url, 'PUT', 'ERROR'), 
                    status, 
                    err,
                )
            }
            throw err
        }
    }

    /**
     * Выполняет PATCH-запрос (частичное обновление ресурса)
     * @template R
     * @returns {Promise<import('axios').AxiosResponse<R>>}
    */
    const PATCH = async <R = any>(
        url: string, 
        data?: any, 
        config: AxiosRequestConfig = {}
    ): Promise<import('axios').AxiosResponse<R>> => {
        try {
            if(apiConfig?.logger?.levels?.includes('DEBUG')) {
                console.debug(formatApiMsg(url, 'PATCH', 'DEBUG'))
            }
            return await api.patch<R>(url, data, config)
        } catch (err) {
            const { status } = err as AxiosError
            if(apiConfig?.logger?.levels?.includes('ERROR')) {
                console.error(
                    formatApiMsg(url, 'PATCH', 'ERROR'), 
                    status, 
                    err,
                )
            }
            throw err
        }
    }

    /**
     * Выполняет DELETE-запрос
     * @template R
     * @returns {Promise<import('axios').AxiosResponse<R>>}
    */
    const DELETE = async <R = any>(
        url: string, 
        config: AxiosRequestConfig = {}
    ): Promise<import('axios').AxiosResponse<R>> => {
        try {
            if(apiConfig?.logger?.levels?.includes('DEBUG')) {
                console.debug(formatApiMsg(url, 'DELETE', 'DEBUG'))
            }
            return await api.delete<R>(url, config)
        } catch (err) {
            const { status } = err as AxiosError
            if(apiConfig?.logger?.levels?.includes('ERROR')) {
                console.error(
                    formatApiMsg(url, 'DELETE', 'ERROR'), 
                    status, 
                    err,
                )
            }
            throw err
        }
    }
    return { 
        GET, 
        POST, 
        PUT, 
        PATCH, 
        DELETE,
        instance: api 
    }
}
