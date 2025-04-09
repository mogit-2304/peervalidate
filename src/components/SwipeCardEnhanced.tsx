
import React from "react";
import { Card as CardType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface SwipeCardEnhancedProps {
  card: CardType;
  style?: React.CSSProperties;
  onCardLeftScreen?: (direction: string) => void;
}

const SwipeCardEnhanced: React.FC<SwipeCardEnhancedProps> = ({ 
  card,
  style,
  onCardLeftScreen
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full w-full flex flex-col"
      style={style}
    >
      {card.imageUrl && (
        <div className="h-1/2 bg-gray-100">
          <img 
            src={card.imageUrl} 
            alt="Card visual" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className={`p-6 flex flex-col ${card.imageUrl ? 'h-1/2' : 'h-full'} justify-between`}>
        <div>
          <div className="flex justify-between items-start mb-4">
            {card.category && (
              <Badge className="bg-dating-yellow text-black">
                {card.category}
              </Badge>
            )}
            {card.duration && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                {card.duration}
              </div>
            )}
          </div>
          
          <p className="text-lg font-medium">{card.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeCardEnhanced;
