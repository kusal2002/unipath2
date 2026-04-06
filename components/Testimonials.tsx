const testimonials = [
  {
    name: "Priya Sharma",
    role: "Masters in Data Science",
    university: "University of Toronto, Canada",
    avatar: "PS",
    color: "bg-blue-600",
    text: "UniPath made my dream of studying in Canada a reality. Their team helped me craft a compelling SOP and guided me through every step of the visa process. I got accepted to my first-choice university!",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "Bachelors in Engineering",
    university: "TU Munich, Germany",
    avatar: "AH",
    color: "bg-indigo-600",
    text: "I was overwhelmed by the German university application process. UniPath simplified everything and helped me land a scholarship. Their counselors are incredibly knowledgeable and responsive.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Diploma in Business",
    university: "Hult International, UK",
    avatar: "SC",
    color: "bg-purple-600",
    text: "The career counseling sessions completely changed my perspective. UniPath helped me align my study goals with my career ambitions. I'm now at a top business school with a clear path forward.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Success Stories</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">What Our Students Say</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Real stories from students who achieved their international education dreams with UniPath.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 leading-relaxed flex-1 mb-6 italic">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                  <div className="text-xs text-blue-600 font-medium">{t.university}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
