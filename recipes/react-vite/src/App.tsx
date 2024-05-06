import { SignIn, SignedIn } from "@asgardeo/react-ui"

function App() {

  return (
    <>
    Hello
    <SignIn />
    <SignedIn fallback={<div>fallback components</div>}>
      <div>Logged in</div>
    </SignedIn>
    </>
  )
}

export default App
