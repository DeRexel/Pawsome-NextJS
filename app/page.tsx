import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="pt-24 px-4 bg-gradient-to-b from-green-100 via-white to-grey-50 flex-grow">
        {/* Hero */}
        <section id="home" className="text-center mb-16 mt-20">
          <h1 className="text-5xl font-bold text-green-700 mb-4">
            Welcome to PAWSOME 🐾
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            At PAWSOME, we treat your furry companions like family. Providing top-quality veterinary services with love, care, and compassion.
          </p>
          <a
            href="/book"
            className="btn btn-primary px-6 py-3 rounded-full font-semibold"
          >
            Book an Appointment
          </a>
        </section>

        {/* Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-16 text-center mb-20">
            {[
              {
                title: "General Checkups",
                icon: "🩺",
                desc: "Routine examinations to monitor and maintain your pet's health.",
              },
              {
                title: "Vaccinations",
                icon: "💉",
                desc: "Essential immunizations to protect against common diseases.",
              },
              {
                title: "Dental Care",
                icon: "🦷",
                desc: "Comprehensive oral health services including cleaning and surgery.",
              },
              {
                title: "Surgery & Emergency",
                icon: "🛠️",
                desc: "Experienced surgical team ready for planned or emergency procedures.",
              },
              {
                title: "Nutrition Advice",
                icon: "🍖",
                desc: "Custom diet plans for all breeds and life stages.",
              },
              {
                title: "Grooming & Hygiene",
                icon: "🧼",
                desc: "Baths, nail trims, ear cleaning, and more to keep your pet fresh and happy.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-xl shadow-sm">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About PAWSOME */}
        <section
          id="about"
          className="min-h-screen flex flex-col md:flex-row gap-10 items-center py-6 px-6 bg-white"
        >

        <div className="md:w-1/2">
          <div className="relative aspect-video">
            <Image
              src="/Veterinary.jpg" 
              alt="Pawsome team"
              fill
              className="rounded-xl object-cover shadow-md"
              priority 
            />
          </div>
        </div>

          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">About PAWSOME</h2>
            <p className="text-2xl text-gray-600 text-justify mb-4">
              Founded in 2015, PAWSOME has grown to become one of the most trusted veterinary clinics in the region. Our dedicated team of licensed veterinarians and pet care professionals are passionate about animal health and welfare.
            </p>
            <p className="text-2xl text-gray-600 text-justify">
              We believe in preventive care, early diagnosis, and client education as the foundation for long-term health. Our facility is equipped with the latest technology to ensure your pets receive the best treatment possible.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20 bg-green-50 p-10 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Why Choose Us?</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-700 text-base">
            <li>✅ Accredited veterinarians with 10+ years of experience</li>
            <li>✅ Modern equipment & clean, pet-friendly facility</li>
            <li>✅ 24/7 online consultations</li>
            <li>✅ Transparent pricing and no hidden charges</li>
            <li>✅ Personalized treatment plans and follow-up care</li>
            <li>✅ Happy pets and even happier owners!</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md p-6 rounded-xl">
              <p className="italic">"PAWSOME saved my cat's life after an accident. They were quick, kind, and incredibly skilled."</p>
              <div className="mt-4 text-sm font-semibold text-green-700">— Linda, Cat Owner</div>
            </div>
            <div className="bg-white shadow-md p-6 rounded-xl">
              <p className="italic">"My golden retriever absolutely loves the staff here. Their grooming service is top-notch!"</p>
              <div className="mt-4 text-sm font-semibold text-green-700">— Arman, Dog Owner</div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}