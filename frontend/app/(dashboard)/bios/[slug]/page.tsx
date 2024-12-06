import PreviewPage from "."

export default async function Home({ params }: { params: any }) {
  const { slug } = await params
  return (<PreviewPage username={slug} />)

}

