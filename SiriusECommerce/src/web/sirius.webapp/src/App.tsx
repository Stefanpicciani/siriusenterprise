

import { useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { TranslatedRoutes } from './routes/TranslatedRoutes';
import { LanguageRouteHandler } from './i18n/languageHandler';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnvironmentDebugInfo from './components/EnviromentDebugInfo';


function App() {
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);    
  }

  return (
    <Router>
      <EnvironmentDebugInfo />
      <LanguageRouteHandler />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar 
          activeLink={activeLink} 
          onLinkClick={handleLinkClick} 
        />          
        <main className="container mx-auto px-4 py-8 flex-grow min-h-screen">
         <TranslatedRoutes />          
        </main>
        <Footer />
      </div>
    </Router>   
  )
}

export default App;

{/* <ScrollToTop />
        <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} /> */}


{/* <Routes> */}
{/* <Route path="/" element={<Home />} /> */}
{/* <Route path="/register" element={<Register />} /> */}
{/* <Route path="/products/:id" element={<ProductDetail />} />
<Route path="/cart" element={<Cart />} />
<Route path="/contact" element={<Contact />} />
<Route path="/support" element={<Support />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/help/*" element={<Help />} /> */}
{/* <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/> */}
{/* <Route
  path="/dashboard/*"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/> */}
{/* <Route
  path="/account/*"
  element={
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  }
/> */}
{/* </Routes> */}