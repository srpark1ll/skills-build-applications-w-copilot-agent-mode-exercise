import { API_BASE_URL } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : `${API_BASE_URL}/api/workouts/`
const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'category', label: 'Category' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
]

function Workouts() {
  return <CollectionPage columns={columns} endpoint={endpoint} title="Workouts" />
}

export default Workouts
