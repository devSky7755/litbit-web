import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuthState } from "react-firebase-hooks/auth";

import Footer from '@/layout/Footer'
import Navbar from '@/layout/Navbar'
import Sidebar from '@/layout/Sidebar'

import { firebaseAuth } from "./services";
import { AppRouter } from './routes'
import "./App.css";

function App() {
  const queryClient = new QueryClient()
  const [user, loading, error] = useAuthState(firebaseAuth.auth);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex-grow flex">
        <div className="drawer drawer-mobile w-full">
          <input id="side-bar" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col relative">
            <div className='container p-4 mx-auto'>
              <QueryClientProvider client={queryClient}>
                <AppRouter />
              </QueryClientProvider>
            </div>
          </div>
          {user &&
            (<Sidebar />)
          }
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
