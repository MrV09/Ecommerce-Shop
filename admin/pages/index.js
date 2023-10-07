import Navigation from "@/components/Navigation";
import Layout from "@/components/layout";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const {data: session} = useSession();

  return(
    <Layout>
      <div className="flex justify-between">
        <h2>
          Hello, {session?.user?.name}
        </h2>
        <div className="flex bg-gray-300">
          <img src={session?.user?.image} className="h-8 w-8 overflow-hidden rounded-lg"/>
          {session?.user?.name}
        </div>
      </div>
    </Layout>
  )
}
