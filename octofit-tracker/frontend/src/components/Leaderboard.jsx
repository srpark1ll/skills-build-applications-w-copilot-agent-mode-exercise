import { API_BASE_URL } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : `${API_BASE_URL}/api/leaderboard/`
const columns = [
  { key: 'user', label: 'User' },
  { key: 'points', label: 'Points' },
]

function Leaderboard() {
  return <CollectionPage columns={columns} endpoint={endpoint} title="Leaderboard" />
}

export default Leaderboard
