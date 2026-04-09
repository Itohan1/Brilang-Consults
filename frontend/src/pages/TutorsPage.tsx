type TutorPreview = {
  name: string
  language: string
  specialization: string
  rating: number
}

const tutorPreviews: TutorPreview[] = [
  { name: 'Amina Bello', language: 'French', specialization: 'Business French', rating: 4.9 },
  { name: 'Carlos Mendes', language: 'Portuguese', specialization: 'Conversation Practice', rating: 4.8 },
  { name: 'Leila Haddad', language: 'Arabic', specialization: 'Beginner Fluency', rating: 4.7 },
  { name: 'Sophie Kim', language: 'Korean', specialization: 'Exam Preparation', rating: 4.9 },
  { name: 'David Njoroge', language: 'Swahili', specialization: 'Travel Language Coaching', rating: 4.6 },
  { name: 'Marta Alvarez', language: 'Spanish', specialization: 'Professional Communication', rating: 4.8 },
]

export default function TutorsPage() {
  return (
    <section className="border-t border-slate-200 bg-gradient-to-br from-white via-[#f4f8ff] to-[#ecf8f1]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#14118c]">Tutors</p>
          <h1
            className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold text-slate-900 md:text-4xl"
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif' }}
          >
            Find Expert Tutors Matched to Your Goals
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Explore a preview of verified tutors and sign up to unlock full profiles, reviews, and direct booking.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorPreviews.map((tutor) => (
            <article key={tutor.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-lg font-bold text-slate-900">{tutor.name}</p>
              <p className="mt-2 text-sm text-slate-600">Language: {tutor.language}</p>
              <p className="mt-1 text-sm text-slate-600">Specialization: {tutor.specialization}</p>
              <p className="mt-3 text-sm font-semibold text-[#008037]">Rating: {tutor.rating.toFixed(1)} / 5</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-[#14118c] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#14118c]/30 transition hover:brightness-110 sm:px-10"
          >
            Sign Up to View All Tutors
          </button>
        </div>
      </div>
    </section>
  )
}
