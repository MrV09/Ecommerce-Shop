import Navigation from "@/components/Navigation";
import { useSession, signIn} from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session){
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 font-bold rounded-lg">Login with Google!</button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-600 min-h-screen flex">
        <Navigation />
        <div className="bg-white flex-grow mt-4 mr-4 rounded-lg p-4 mb-4">
          {children}
        </div>
    </div>
  )
}