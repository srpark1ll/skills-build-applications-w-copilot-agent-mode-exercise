import { API_BASE_URL } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : `${API_BASE_URL}/api/teams/`
const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'Description' },
  { key: 'members', label: 'Members' },
]

function Teams() {
  return <CollectionPage columns={columns} endpoint={endpoint} title="Teams" />
}

export default Teams
