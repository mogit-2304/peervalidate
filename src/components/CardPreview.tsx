
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CardPreviewProps {
  card: {
    content: string;
    category: string;
    imageUrl?: string;
  };
}

const CardPreview: React.FC<CardPreviewProps> = ({ card }) => {
  return (
    <div className="absolute inset-0 bg-white overflow-hidden flex flex-col">
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
          
          <p className="text-lg font-medium">{card.content || "Your card content will appear here"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
