import Layout from './components/Layout'
import PageContainer from './components/PageContainer'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-12">
        <PageContainer maxWidth="4xl" className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Welcome to{' '}
            <span className="text-slate-700">
              ChronoShift
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            A modern web app for seamless time conversion between two locations. 
            Powered by external APIs, it lets users easily compare global time zones with a clean, intuitive interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-200">
              Learn More
            </button>
          </div>
        </PageContainer>
      </section>
    </Layout>
  )
} 