"use client"

export default function WhyJoinEarly() {
  const features = [
    {
      icon: "🚀",
      title: "Early Access to AI Study Packs",
      description: "Get first access to our cutting-edge AI-powered study materials",
    },
    {
      icon: "💬",
      title: "Join a Global Learning Community",
      description: "Connect with students and teachers from around the world",
    },
    {
      icon: "👩‍🏫",
      title: "Exclusive Tools for Teachers",
      description: "Unlock premium features designed to enhance your teaching",
    },
    {
      icon: "🎓",
      title: "Personalized Learning Paths",
      description: "AI tailors your learning journey to your goals and pace",
    },
  ]

  return (
    <section id="why-join" className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Join Square 1 Ai Early?</h2>
          <p className="text-lg text-blue-100">Get exclusive benefits and shape the future of AI learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-700/30 border border-blue-400/30 hover:shadow-xl hover:border-blue-300/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
