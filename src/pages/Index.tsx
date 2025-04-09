
import React, { useState, useRef } from "react";
import SwipeContainer from "@/components/SwipeContainer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import CardCreationForm from "@/components/CardCreationForm";
import { Card } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Sample cards with the new structure
const sampleCards: Card[] = [
  {
    id: "1",
    content: "I believe pineapple belongs on pizza",
    category: "WIS",
    duration: "1 day"
  },
  {
    id: "2",
    content: "I enjoy going to museums on weekends",
    category: "ETS",
    duration: "3 days"
  },
  {
    id: "3",
    content: "I think cats are better than dogs",
    category: "MIS ONE",
    duration: "5 days"
  },
  {
    id: "4",
    content: "I prefer coffee over tea",
    category: "Sales",
    duration: "1 hour"
  },
  {
    id: "5",
    content: "I would rather travel to mountains than beaches",
    category: "Support",
    duration: "10 days"
  },
  {
    id: "6",
    content: "I think breakfast is the most important meal of the day",
    category: "Tech",
    duration: "3 hours"
  },
  {
    id: "7",
    content: "I believe in love at first sight",
    category: "WIS",
    duration: "10 hours"
  },
  {
    id: "8",
    content: "I enjoy watching documentaries more than fiction",
    category: "ETS",
    duration: "1 day"
  },
  {
    id: "9",
    content: "I prefer working from home over going to an office",
    category: "MIS ONE",
    duration: "3 days"
  },
  {
    id: "10",
    content: "I think technology has improved human connections",
    category: "Tech",
    duration: "5 days"
  }
];

const Index = () => {
  const [cards, setCards] = useState<Card[]>(sampleCards);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const swipeContainerRef = useRef<{ resetToCard: (cardId: string) => void } | null>(null);
  
  const handleAddCard = (newCard: Omit<Card, "id">) => {
    const cardWithId: Card = {
      ...newCard,
      id: uuidv4()
    };
    
    setCards([cardWithId, ...cards]);
    setIsSheetOpen(false);
    
    // Use setTimeout to ensure state has updated before resetting
    setTimeout(() => {
      if (swipeContainerRef.current) {
        swipeContainerRef.current.resetToCard(cardWithId.id);
      }
    }, 100);
    
    toast.success("New card added!");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-dating-lightgray to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold">
            <span className="text-dating-yellow">SwipeSpark</span>
          </h1>
          <p className="text-dating-darkgray mt-2">Swipe right to approve, left to reject</p>
          
          {/* Add Card CTA in top right */}
          <div className="absolute top-0 right-0">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="bg-dating-yellow text-black hover:bg-dating-yellow/90">
                  <PlusCircle className="mr-2" size={18} />
                  Add Card
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Create a new card</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <CardCreationForm 
                    onSubmit={handleAddCard}
                    onCancel={() => setIsSheetOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        
        <div className="max-w-md mx-auto h-[60vh] mb-4">
          <SwipeContainer ref={swipeContainerRef} cards={cards} />
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-8">
          Swipe on opinions to find your perfect match!
        </footer>
      </div>
    </div>
  );
};

export default Index;
