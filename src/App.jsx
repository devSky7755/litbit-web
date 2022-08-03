import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Footer from '@/layout/Footer'
import Navbar from '@/layout/Navbar'
import { AppRouter } from './routes'
import "./App.css";

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container flex-grow p-4 mx-auto">
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
