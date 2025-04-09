
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import SwipeCard from "./SwipeCard";
import { toast } from "sonner";

interface SwipeContainerProps {
  cards: string[];
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [processedCards, setProcessedCards] = useState<string[]>([]);
  const [dragState, setDragState] = useState<"none" | "left" | "right">("none");
  const [displayedCards, setDisplayedCards] = useState<string[]>(cards);
  const dragStartX = useRef(0);
  const currentX = useRef(0);

  const handleSwipeLeft = () => {
    if (activeIndex >= displayedCards.length) return;
    
    const current = displayedCards[activeIndex];
    setDragState("left");
    
    setTimeout(() => {
      setProcessedCards([...processedCards, current]);
      setActiveIndex(activeIndex + 1);
      setDragState("none");
      toast.error("Rejected!");
    }, 300);
  };

  const handleSwipeRight = () => {
    if (activeIndex >= displayedCards.length) return;
    
    const current = displayedCards[activeIndex];
    setDragState("right");
    
    setTimeout(() => {
      setProcessedCards([...processedCards, current]);
      setActiveIndex(activeIndex + 1);
      setDragState("none");
      toast.success("Approved!");
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) {
      dragStartX.current = e.touches[0].clientX;
    } else {
      dragStartX.current = e.clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) {
      currentX.current = e.touches[0].clientX;
    } else {
      currentX.current = e.clientX;
    }
    
    const diff = currentX.current - dragStartX.current;
    
    if (Math.abs(diff) < 50) {
      setDragState("none");
    } else if (diff > 0) {
      setDragState("right");
    } else {
      setDragState("left");
    }
  };

  const handleTouchEnd = () => {
    const diff = currentX.current - dragStartX.current;
    
    if (Math.abs(diff) >= 100) {
      if (diff > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else {
      setDragState("none");
    }
  };

  const resetCards = () => {
    setActiveIndex(0);
    setProcessedCards([]);
    setDragState("none");
    
    // Shuffle the cards for variety
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDisplayedCards(shuffled);
    
    toast("Cards reset!");
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div 
        className={cn(
          "relative flex-1 swipe-card-container",
          dragState === "left" && "dragging-left",
          dragState === "right" && "dragging-right",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        {displayedCards.map((card, i) => {
          const cardIndex = i - activeIndex;
          if (cardIndex < 0 || cardIndex > 2) return null;
          
          return (
            <SwipeCard
              key={`${card}-${i}`}
              content={card}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              dragState={i === activeIndex ? dragState : "none"}
              active={i === activeIndex}
              index={cardIndex}
            />
          );
        })}
        
        {activeIndex >= displayedCards.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-slide-in">
              <h2 className="text-2xl font-bold mb-4">No more cards!</h2>
              <button
                onClick={resetCards}
                className="bg-dating-yellow text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
              >
                Reset Cards
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-center space-x-4 py-6">
        <button
          onClick={handleSwipeLeft}
          className="bg-dating-red text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
          disabled={activeIndex >= displayedCards.length}
        >
          <span className="text-2xl">✕</span>
        </button>
        <button
          onClick={handleSwipeRight}
          className="bg-dating-green text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
          disabled={activeIndex >= displayedCards.length}
        >
          <span className="text-2xl">✓</span>
        </button>
      </div>
    </div>
  );
};

export default SwipeContainer;
