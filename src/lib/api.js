import { API_BASE_URL, SESSION_TOKEN_KEY } from './constants'

const request = async (method, url, payload = null, customHeaders = {}) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem(SESSION_TOKEN_KEY) : null
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'x-session-token': token }),
    ...customHeaders,
  }

  const options = { method, headers }
  if (payload != null && !(payload instanceof FormData)) {
    options.body = JSON.stringify(payload)
  } else if (payload instanceof FormData) {
    delete headers['Content-Type']
    options.body = payload
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options)
    return response.json()
  } catch {
    return { error: 'Server Error' }
  }
}

export const get = (url, customHeaders) => request('GET', url, null, customHeaders)
export const post = (url, payload, customHeaders) => request('POST', url, payload, customHeaders)
export const patch = (url, payload, customHeaders) => request('PATCH', url, payload, customHeaders)
export const del = (url, customHeaders) => request('DELETE', url, null, customHeaders)
