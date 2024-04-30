import './App.css'
import { useAuthentication, SignIn } from '../../../packages/react/src'

function App() {

  // const { signOut } = useAuthentication();
  // console.log(signOut())

  return (
    <>
      Hello
      <SignIn />
      
    </>
  )
}

export default App
