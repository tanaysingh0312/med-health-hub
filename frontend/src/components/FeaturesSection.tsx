import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, FileText, Shield, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Consultations",
    description: "Connect with doctors instantly through secure video calls from anywhere.",
    color: "bg-gradient-primary"
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book appointments 24/7 with real-time availability and instant confirmation.",
    color: "bg-gradient-secondary"
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Get digital prescriptions and access your medical records anytime.",
    color: "bg-info"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is encrypted and protected with bank-level security.",
    color: "bg-success"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock healthcare support for emergencies and urgent care.",
    color: "bg-warning"
  },
  {
    icon: Heart,
    title: "Health Tracking",
    description: "Monitor your health progress with comprehensive tracking tools.",
    color: "bg-destructive"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Health Hub?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience healthcare like never before with our comprehensive platform designed 
            to put your health and convenience first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border/50 hover:border-primary/20 bg-gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className={`mx-auto w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;