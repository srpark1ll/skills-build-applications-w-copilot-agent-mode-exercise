import { API_BASE_URL } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : `${API_BASE_URL}/api/activities/`
const columns = [
  { key: 'user', label: 'User' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKilometers', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  { key: 'completedAt', label: 'Completed' },
]

function Activities() {
  return <CollectionPage columns={columns} endpoint={endpoint} title="Activities" />
}

export default Activities
