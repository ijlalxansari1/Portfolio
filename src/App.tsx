import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Resume } from './components/Resume';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Resume />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
