import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/healthcare-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/40">
        <img 
          src={heroImage} 
          alt="Healthcare professionals" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Health,
                <span className="block text-secondary-light">Our Priority</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Connect with trusted healthcare professionals instantly. Book appointments, 
                consult online, and manage your health records all in one place.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Search doctors, specialties..." 
                    className="pl-10 h-12 border-none bg-muted/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Location" 
                    className="pl-10 h-12 border-none bg-muted/50 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button variant="hero" size="lg" className="h-12 px-8">
                  Search
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-secondary-light" />
                <span className="text-sm">Verified Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-secondary-light" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-secondary-light rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">✓</span>
                </div>
                <span className="text-sm">Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary-light">500+</div>
                <div className="text-white/80 text-sm">Verified Doctors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary-light">10k+</div>
                <div className="text-white/80 text-sm">Happy Patients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary-light">50+</div>
                <div className="text-white/80 text-sm">Specialties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary-light">24/7</div>
                <div className="text-white/80 text-sm">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;