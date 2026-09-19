import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Countdown from './components/sections/Countdown.jsx';
import Crew from './components/sections/Crew.jsx';
import Hero from './components/sections/Hero.jsx';
import Mars from './components/sections/Mars.jsx';
import Mission from './components/sections/Mission.jsx';
import Spacecraft from './components/sections/Spacecraft.jsx';
import Timeline from './components/sections/Timeline.jsx';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-nova-black text-nova-white">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Spacecraft />
        <Timeline />
        <Mars />
        <Crew />
        <Countdown />
      </main>
      <Footer />
    </div>
  );
}

export default App;
