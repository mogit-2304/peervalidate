
import React, { useState } from "react";
import SwipeContainer from "@/components/SwipeContainer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const sampleCards = [
  "I believe pineapple belongs on pizza",
  "I enjoy going to museums on weekends",
  "I think cats are better than dogs",
  "I prefer coffee over tea",
  "I would rather travel to mountains than beaches",
  "I think breakfast is the most important meal of the day",
  "I believe in love at first sight",
  "I enjoy watching documentaries more than fiction",
  "I prefer working from home over going to an office",
  "I think technology has improved human connections"
];

const Index = () => {
  const [cards, setCards] = useState<string[]>(sampleCards);
  const [newCardText, setNewCardText] = useState("");
  
  const handleAddCard = () => {
    if (!newCardText.trim()) {
      toast.error("Please enter some content for your card");
      return;
    }
    
    setCards([newCardText, ...cards]);
    setNewCardText("");
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
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-dating-yellow text-black hover:bg-dating-yellow/90">
                  <PlusCircle className="mr-2" size={18} />
                  Add Card
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create a new card</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add a new opinion or statement for others to swipe on.
                  </p>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter your opinion or statement..."
                      value={newCardText}
                      onChange={(e) => setNewCardText(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <Button onClick={handleAddCard} className="w-full">
                      Create Card
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        
        <div className="max-w-md mx-auto h-[60vh] mb-4">
          <SwipeContainer cards={cards} />
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-8">
          Swipe on opinions to find your perfect match!
        </footer>
      </div>
    </div>
  );
};

export default Index;
