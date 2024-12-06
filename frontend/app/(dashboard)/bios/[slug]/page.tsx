import PreviewPage from "."

export const metadata = {
  title:'Bio | Detail'
}
export default async function Home({ params }: { params: any }) {
  const { slug } = await params
  return (<PreviewPage username={slug} />)

}

