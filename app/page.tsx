// this is the home page
// to add more complex routes we add folders (components is for reusable)
// for example, we can add an about/page.tsx and this will appear when the user types in /about

import Layout from './components/Layout'
import PageContainer from './components/PageContainer'
import TimeConverter from './components/TimeConverter'

export default function Home() {
  return (
    <Layout>
      {/* Main Content Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-12">
        <PageContainer maxWidth="4xl" className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-8">
            ChronoShift
          </h1>
          <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto">
            Convert times between different time zones instantly. 
            Simply select your locations and time to see what time it is anywhere in the world.
          </p>
          
          {/* Time Converter Component */}
          <TimeConverter />
        </PageContainer>
      </section>
    </Layout>
  )
} 