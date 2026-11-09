const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespaceConfigured = Boolean(codespaceName)
export const API_BASE_URL = isCodespaceConfigured
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }

    if (payload.data && Array.isArray(payload.data.results)) {
      return payload.data.results
    }
  }

  throw new Error('The API response did not contain a collection.')
}

export async function fetchCollection(endpoint, { signal } = {}) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText}).`)
  }

  return getCollection(await response.json())
}
