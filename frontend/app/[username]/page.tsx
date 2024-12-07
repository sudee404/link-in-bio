import UserPage from '.'

export const metadata = {
  title:"Link In Bio"
}
export default async function Home({ params }: { params: any}) {
  // In a real app, you'd fetch the user data based on the username
  const {username} = await params

  return (
    <UserPage username={username} />
  )
}

