import { Header, Page, SignUp } from '../../components'
import { useSignUpMutation } from '../../services/auth'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  return (
    <>
      <Header isLoggedIn={false} />
      <Page>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SignUp onSubmit={signUp} />
        </div>
      </Page>
    </>
  )
}
