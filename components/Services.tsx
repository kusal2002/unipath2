const services = [
  {
    icon: "🎓",
    title: "University Selection",
    description:
      "We match you with universities that fit your academic profile, budget, and career goals across 50+ top institutions worldwide.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: "📋",
    title: "Application Assistance",
    description:
      "From SOPs to recommendation letters, our experts guide you through crafting a standout application that gets noticed.",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: "✈️",
    title: "Visa Guidance",
    description:
      "Navigate complex visa requirements with confidence. We prepare you for interviews and ensure your documentation is flawless.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: "💼",
    title: "Career Counseling",
    description:
      "Align your education with your ambitions. We help you choose programs that open doors to your dream career path.",
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">
            Everything You Need to Study Abroad
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            End-to-end consulting services designed to make your international education journey seamless.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>

              {/* Arrow on hover */}
              <div className="mt-5 flex items-center gap-1 text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
