import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DoctorCard from "@/components/DoctorCard";
import SpecialtyCard from "@/components/SpecialtyCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Brain, 
  Eye, 
  Bone, 
  Baby, 
  Activity,
  ArrowRight,
  Star,
  MapPin,
  Building2
} from "lucide-react";
import { useState, useEffect } from "react";

// Sample data - in a real app this would come from your backend
const sampleDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 245,
    experience: 12,
    location: "New York, NY",
    availableSlots: ["2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"],
    consultationFee: 150,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    hasVideoConsult: true
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 189,
    experience: 15,
    location: "San Francisco, CA",
    availableSlots: ["10:00 AM", "11:30 AM", "2:00 PM"],
    consultationFee: 200,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    hasVideoConsult: true
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 312,
    experience: 8,
    location: "Chicago, IL",
    availableSlots: ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"],
    consultationFee: 120,
    image: "https://images.unsplash.com/photo-1594824724236-fcb94dfb99b1?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    hasVideoConsult: false
  }
];

const specialties = [
  {
    icon: Heart,
    title: "Cardiology",
    description: "Heart and cardiovascular care",
    doctorCount: 45,
    color: "bg-destructive"
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Brain and nervous system",
    doctorCount: 32,
    color: "bg-info"
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Eye care and vision",
    doctorCount: 28,
    color: "bg-warning"
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Bone and joint care",
    doctorCount: 38,
    color: "bg-success"
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Children's healthcare",
    doctorCount: 52,
    color: "bg-gradient-secondary"
  },
  {
    icon: Activity,
    title: "General Medicine",
    description: "Primary healthcare",
    doctorCount: 67,
    color: "bg-gradient-primary"
  }
];

const Index = () => {
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hospitals")
      .then(res => res.json())
      .then(data => {
        setHospitals(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hospitals:", err);
        setIsLoading(false);
      });
  }, []);

  const openGoogleMaps = (name, address = '') => {
    const query = encodeURIComponent(`${name} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Hospitals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Nearby Hospitals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find and connect with healthcare facilities in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isLoading ? (
              <div className="col-span-3 text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-2 text-muted-foreground">Loading hospitals...</p>
              </div>
            ) : hospitals.length > 0 ? (
              hospitals.slice(0, 6).map((hospital, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => openGoogleMaps(hospital.name, hospital.address)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Building2 className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {hospital.name || 'Unnamed Hospital'}
                      </h3>
                    </div>
                    {hospital.address && (
                      <div className="flex items-start text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground/70 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{hospital.address}</span>
                      </div>
                    )}
                    {hospital.city && (
                      <div className="text-sm text-muted-foreground">
                        {hospital.city}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">No hospitals found.</p>
              </div>
            )}
          </div>

          {hospitals.length > 6 && (
            <div className="text-center">
              <Button variant="outline" size="lg">
                View All Hospitals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Specialties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Browse by Specialty
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the right specialist for your healthcare needs with our comprehensive range of medical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {specialties.map((specialty, index) => (
              <div key={specialty.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <SpecialtyCard {...specialty} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Specialties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Top Rated Doctors
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with our highest-rated healthcare professionals, trusted by thousands of patients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {sampleDoctors.map((doctor, index) => (
              <div key={doctor.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg">
              <Star className="mr-2 h-5 w-5" />
              View All Doctors
            </Button>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
