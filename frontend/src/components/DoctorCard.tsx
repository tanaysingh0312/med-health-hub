import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Clock, Video, DollarSign } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    experience: number;
    location: string;
    availableSlots: string[];
    consultationFee: number;
    image: string;
    isVerified: boolean;
    hasVideoConsult: boolean;
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-border/50 hover:border-primary/20 bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Doctor Image */}
          <div className="relative">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md"
            />
            {doctor.isVerified && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
              </div>
              {doctor.hasVideoConsult && (
                <Badge variant="secondary" className="bg-info/10 text-info border-info/20">
                  <Video className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>

            {/* Rating & Experience */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-muted-foreground">({doctor.reviews})</span>
              </div>
              <div className="text-muted-foreground">
                {doctor.experience} years exp.
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{doctor.location}</span>
            </div>

            {/* Available Slots */}
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-success" />
              <span className="text-success font-medium">Available Today</span>
              <div className="flex gap-1">
                {doctor.availableSlots.slice(0, 3).map((slot, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                    {slot}
                  </Badge>
                ))}
                {doctor.availableSlots.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{doctor.availableSlots.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/30 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm font-semibold text-primary">
          <DollarSign className="w-4 h-4" />
          <span>${doctor.consultationFee}</span>
          <span className="text-muted-foreground font-normal">consultation</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-1" />
            View Profile
          </Button>
          <Button variant="appointment" size="sm">
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;