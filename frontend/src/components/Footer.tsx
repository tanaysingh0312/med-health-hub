import { Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Health Hub</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your trusted healthcare partner, connecting you with the best medical professionals 
              for comprehensive care and support.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Find Doctors</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Specialties</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Video Consultation</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Health Records</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Prescriptions</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white/80">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span>support@healthhub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>123 Health St, Medical City</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm text-white/80">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60">
            © 2024 Health Hub. All rights reserved. | Licensed Healthcare Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;