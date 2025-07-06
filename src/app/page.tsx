import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen border-4 border-red-500">
        <h1 className="text-4xl font-bold text-center">
          Welcome to the Multi-Tenant Blog
        </h1>
        <p className="text-lg text-center mt-4">
          This is a multi-tenant blog application built with Next.js and Tailwind CSS.
        </p>
        
      </div>
    </main>
  )};
