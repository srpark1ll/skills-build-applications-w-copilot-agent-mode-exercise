import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(displayValue).join(', ')
  }

  if (typeof value === 'object') {
    return (
      value.displayName ??
      value.username ??
      value.name ??
      value._id ??
      value.id ??
      JSON.stringify(value)
    )
  }

  return String(value)
}

function CollectionPage({ title, endpoint, columns }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        setItems(await fetchCollection(endpoint, { signal: controller.signal }))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadItems()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section aria-labelledby="collection-title">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0" id="collection-title">
          {title}
        </h1>
      </div>

      {loading && (
        <p aria-live="polite" className="text-body-secondary">
          Loading {title.toLowerCase()}…
        </p>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-body-secondary">No {title.toLowerCase()} found.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive rounded border bg-body shadow-sm">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map(({ key, label }) => (
                  <th key={key} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map(({ key }) => (
                    <td key={key}>{displayValue(item[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
