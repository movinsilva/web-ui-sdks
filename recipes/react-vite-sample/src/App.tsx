import './App.css'
import { useAuthentication } from '../../../packages/react/src'

function App() {

  const { signOut } = useAuthentication();
  console.log(signOut())

  return (
    <>
      Hello
      
    </>
  )
}

export default App
