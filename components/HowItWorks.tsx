const steps = [
  {
    number: "01",
    title: "Submit Your Inquiry",
    description: "Fill out our quick application form with your academic background, goals, and preferred destination.",
    icon: "📝",
  },
  {
    number: "02",
    title: "Free Consultation",
    description: "Our expert counselors analyze your profile and schedule a personalized one-on-one consultation.",
    icon: "🤝",
  },
  {
    number: "03",
    title: "University Shortlisting",
    description: "We curate a tailored list of universities and programs that match your profile and aspirations.",
    icon: "🏫",
  },
  {
    number: "04",
    title: "Application & Visa",
    description: "We handle the entire application process, from document prep to visa filing, keeping you stress-free.",
    icon: "✅",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">How UniPath Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We&apos;ve simplified the complex process of studying abroad into four clear steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ top: "3.5rem" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/30 mb-5">
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Step number */}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center z-20">
                  {index + 1}
                </span>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
