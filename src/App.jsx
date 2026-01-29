import Navbar from "./components/Navbar";
import SweaterDesigner from "./components/sweaterPatren";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main>
        <SweaterDesigner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
