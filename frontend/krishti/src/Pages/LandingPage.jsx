import { useState } from 'react'

function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thanks for subscribing with ${email}!`)
    setEmail('')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Build amazing products <br className="hidden md:block" /> faster than ever
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Our platform helps you create, collaborate, and ship products with unprecedented speed and quality.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md">
            Start Free Trial
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm">
            See Demo
          </button>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Dashboard preview" 
            className="rounded-lg shadow-lg mx-auto border border-gray-200 w-full h-auto"
            width={800}
            height={450}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Built for speed with optimized workflows and instant previews.',
                bg: 'bg-indigo-50',
                color: 'text-indigo-600'
              },
              {
                icon: '🔄',
                title: 'Real-time Sync',
                description: 'Collaborate with team members in real-time across the globe.',
                bg: 'bg-green-50',
                color: 'text-green-600'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-grade security with end-to-end encryption for all your data.',
                bg: 'bg-purple-50',
                color: 'text-purple-600'
              }
            ].map((feature, index) => (
              <div key={index} className={`${feature.bg} p-6 rounded-xl hover:shadow-md transition transform hover:-translate-y-1`}>
                <div className={`text-4xl mb-4 ${feature.color}`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r  text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-amber-200">Ready to transform your workflow?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-500">
            Join thousands of satisfied customers who are building the future with our platform.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default LandingPage