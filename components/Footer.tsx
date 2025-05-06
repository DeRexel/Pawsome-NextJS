// components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PAWSOME</h3>
            <p className="opacity-80">Providing top-quality veterinary services with love, care, and compassion.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="link link-hover opacity-80">Home</Link></li>
              <li><Link href="/#about" className="link link-hover opacity-80">About</Link></li>
              <li><Link href="/schedule" className="link link-hover opacity-80">Schedule</Link></li>
              <li><Link href="/clinics" className="link link-hover opacity-80">Our Clinics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 opacity-80">
              <li>General Checkups</li>
              <li>Vaccinations</li>
              <li>Dental Care</li>
              <li>Emergency Care</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic opacity-80">
              <p>123 Pet Street</p>
              <p>Jakarta, Indonesia</p>
              <p>Phone: +62 21 1234567</p>
              <p>Email: info@pawsome.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-base-300 mt-8 pt-6 text-center opacity-80">
          <p>&copy; {new Date().getFullYear()} PAWSOME Veterinary Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;