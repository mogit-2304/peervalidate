
import React from "react";
import { Card as CardType } from "@/types";
import { Badge } from "@/components/ui/badge";

interface SwipeCardEnhancedProps {
  card: CardType;
  style?: React.CSSProperties;
  zIndex?: number;
  onCardLeftScreen?: (direction: string) => void;
}

const SwipeCardEnhanced: React.FC<SwipeCardEnhancedProps> = ({ 
  card,
  style,
  zIndex = 0,
  onCardLeftScreen
}) => {
  return (
    <div 
      className="absolute inset-0 bg-white rounded-lg overflow-hidden flex flex-col shadow-[0_0_15px_rgba(238,69,64,0.5)]"
      style={{
        ...style,
        zIndex
      }}
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
              <Badge className="bg-dating-red text-white">
                {card.category}
              </Badge>
            )}
          </div>
          
          <p className="text-lg font-medium">{card.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeCardEnhanced;
