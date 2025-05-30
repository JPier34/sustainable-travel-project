export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-100">
        <div className="absolute inset-0">
          <img
            src="./images/hawaii.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Our Story
          </h1>
        </div>
      </section>

      {/* Story Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="./images/Islanda.jpg"
              alt="Lily Smith - Owner"
              width={400}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">Lily Smith</h2>
            <p className="text-gray-600 italic">Owner</p>
            <p className="text-gray-700">
              Our Blooms was founded in honor of Lily Smith's loving aunts,
              Teresa and Beth.
            </p>
            <p className="text-gray-700">
              Lily's journey with flowers began in the heart of Oregon, amidst
              the flourishing fields of her aunts' flower farm. It was there,
              surrounded by the abundance of nature, that she discovered her
              passion for floral design. From learning the names of each bloom
              to understanding the delicate balance of a bouquet, she absorbed
              the artistry of flowers like the rich Oregon soil.
            </p>
            <p className="text-gray-700">
              Bloom & Co. is the expression of that lifelong passion, a place
              where her love for flowers translates into beautifully curated
              arrangements that bring joy and elegance to your spaces.
            </p>
            <p className="text-gray-700">
              From humble beginnings, Bloom&Co has grown into a beloved local
              destination, known for its artistic arrangements, personal
              service, and commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Discover how we can add a touch of natural beauty to your next
            event.
          </h2>
          <a
            href="/contact"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors mb-8"
          >
            BOOK A CONSULTATION
          </a>
        </div>
      </section>
    </main>
  );
}
