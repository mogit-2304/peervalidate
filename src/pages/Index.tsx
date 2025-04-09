
import React, { useRef } from "react";
import SwipeContainer from "@/components/SwipeContainer";
import { useCards } from "@/context/CardContext";

const Index = () => {
  const { cards } = useCards();
  const swipeContainerRef = useRef<{ resetToCard: (cardId: string) => void } | null>(null);
  
  return (
    <div className="min-h-screen pb-24 bg-[#2D142C]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-dating-red">PeerValidate</span>
          </h1>
          <p className="text-white mt-2">Swipe right to approve, left to reject</p>
        </header>
        
        <div className="max-w-md mx-auto h-[60vh] mb-4">
          <SwipeContainer ref={swipeContainerRef} cards={cards} />
        </div>
        
        <footer className="text-center text-sm text-gray-400 mt-8">
          Swipe on opinions to find your perfect match!
        </footer>
      </div>
    </div>
  );
};

export default Index;
