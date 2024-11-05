import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-between gap-36 my-16 lg:mx-16 px-12 py-6">
        <Hero />
        <About />
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
