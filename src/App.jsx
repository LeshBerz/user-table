import { Observer } from 'mobx-react-lite';
import UserPage from './pages/UsersPage.jsx'

function App() {
  return (
    <Observer>
      {() => (
        <div className="app">
            <UserPage/>
        </div>
      )}
    </Observer>
  )
}

export default App
