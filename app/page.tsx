import Projects from "@/components/Projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto min-h-screen">
        <main className="flex flex-col items-center justify-between gap-36 my-16 lg:mx-16 px-12 py-6">
          <Hero />
          <About />
          <Projects />
        </main>
      </div>
      <Footer />
    </>
  );
}
