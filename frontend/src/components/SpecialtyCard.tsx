import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SpecialtyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  doctorCount: number;
  color: string;
}

const SpecialtyCard = ({ icon: Icon, title, description, doctorCount, color }: SpecialtyCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-border/50 hover:border-primary/20 bg-gradient-card">
      <CardContent className="p-6 text-center space-y-4">
        <div className={`mx-auto w-16 h-16 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
          <p className="text-primary font-medium text-sm">
            {doctorCount}+ doctors available
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialtyCard;