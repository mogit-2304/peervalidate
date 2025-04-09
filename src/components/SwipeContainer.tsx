import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";
import SwipeCardEnhanced from "./SwipeCardEnhanced";
import FeedbackModal from "./FeedbackModal";
import { toast } from "sonner";
import { Card } from "@/types";
import { Check, X, ArrowUp } from "lucide-react";

interface SwipeContainerProps {
  cards: Card[];
}

export interface SwipeContainerRef {
  resetToCard: (cardId: string) => void;
}

const SwipeContainer = forwardRef<SwipeContainerRef, SwipeContainerProps>(({ cards }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [processedCards, setProcessedCards] = useState<Card[]>([]);
  const [dragState, setDragState] = useState<"none" | "left" | "right" | "up">("none");
  const [displayedCards, setDisplayedCards] = useState<Card[]>(cards);
  const [isHolding, setIsHolding] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  // Update displayed cards when cards prop changes
  useEffect(() => {
    setDisplayedCards(cards);
  }, [cards]);

  // Expose the resetToCard method to parent components
  useImperativeHandle(ref, () => ({
    resetToCard: (cardId: string) => {
      const cardIndex = displayedCards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        setActiveIndex(cardIndex);
        setProcessedCards([]);
        setDragState("none");
        setCardPosition({ x: 0, y: 0 });
      }
    }
  }));

  const handleSwipeLeft = () => {
    if (activeIndex >= displayedCards.length) return;
    
    const current = displayedCards[activeIndex];
    setDragState("left");
    
    setTimeout(() => {
      setProcessedCards([...processedCards, current]);
      setActiveIndex(activeIndex + 1);
      setDragState("none");
      setCardPosition({ x: 0, y: 0 });
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
      setCardPosition({ x: 0, y: 0 });
      toast.success("Approved!");
    }, 300);
  };

  const handleSwipeUp = () => {
    if (activeIndex >= displayedCards.length) return;
    
    setDragState("up");
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    if (activeIndex >= displayedCards.length) return;
    
    const current = displayedCards[activeIndex];
    
    console.log(`Feedback for "${current.content}": ${feedback}`);
    
    // Process the card after feedback is submitted
    setProcessedCards([...processedCards, current]);
    setActiveIndex(activeIndex + 1);
    setDragState("none");
    setCardPosition({ x: 0, y: 0 });
    toast.info("Suggestion submitted!");
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsHolding(true);
    if ("touches" in e) {
      dragStartX.current = e.touches[0].clientX;
      dragStartY.current = e.touches[0].clientY;
      currentX.current = e.touches[0].clientX;
      currentY.current = e.touches[0].clientY;
    } else {
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
      currentX.current = e.clientX;
      currentY.current = e.clientY;
    }
    setCardPosition({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isHolding || activeIndex >= displayedCards.length) return;
    
    if ("touches" in e) {
      currentX.current = e.touches[0].clientX;
      currentY.current = e.touches[0].clientY;
    } else {
      currentX.current = e.clientX;
      currentY.current = e.clientY;
    }
    
    const diffX = currentX.current - dragStartX.current;
    const diffY = currentY.current - dragStartY.current;
    
    setCardPosition({ x: diffX, y: diffY });
    
    // Only set visual drag state for large movements
    if (Math.abs(diffX) < 50 && Math.abs(diffY) < 50) {
      setDragState("none");
    } else if (diffY < -50 && Math.abs(diffY) > Math.abs(diffX)) {
      setDragState("up");
    } else if (diffX > 50) {
      setDragState("right");
    } else if (diffX < -50) {
      setDragState("left");
    }
  };

  const handleTouchEnd = () => {
    if (!isHolding) return;
    setIsHolding(false);
    
    const diffX = currentX.current - dragStartX.current;
    const diffY = currentY.current - dragStartY.current;
    
    // Only trigger swipe on significant movement AND key press
    if (Math.abs(diffY) > 100 && diffY < 0 && Math.abs(diffY) > Math.abs(diffX)) {
      handleSwipeUp();
    } else if (Math.abs(diffX) >= 100) {
      if (diffX > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else {
      setDragState("none");
      setCardPosition({ x: 0, y: 0 });
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHolding || activeIndex >= displayedCards.length) return;
      
      if (e.key === "ArrowLeft") {
        handleSwipeLeft();
      } else if (e.key === "ArrowRight") {
        handleSwipeRight();
      } else if (e.key === "ArrowUp") {
        handleSwipeUp();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHolding, activeIndex, displayedCards.length]);

  const resetCards = () => {
    setActiveIndex(0);
    setProcessedCards([]);
    setDragState("none");
    setCardPosition({ x: 0, y: 0 });
    
    // Shuffle the cards for variety
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDisplayedCards(shuffled);
    
    toast("Cards reset!");
  };

  // Calculate card positioning based on index
  const getCardStyle = (index: number) => {
    if (index === activeIndex && isHolding) {
      return {
        transform: `translate(${cardPosition.x}px, ${cardPosition.y}px) rotate(${cardPosition.x * 0.05}deg)`
      };
    }
    
    // Create a cascading effect for the cards behind the active one
    const offset = index - activeIndex;
    if (offset > 0) {
      return {
        transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.05})`,
        opacity: 1 - (offset * 0.2)
      };
    }
    
    return {};
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div 
        className={cn(
          "relative flex-1 swipe-card-container",
          dragState === "left" && "dragging-left",
          dragState === "right" && "dragging-right",
          dragState === "up" && "dragging-up",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          {displayedCards.map((card, i) => {
            const cardIndex = i - activeIndex;
            if (cardIndex < 0 || cardIndex > 2) return null;
            
            return (
              <SwipeCardEnhanced
                key={`${card.id}-${i}`}
                card={card}
                style={getCardStyle(i)}
                zIndex={displayedCards.length - i}
              />
            );
          })}
        </div>
        
        {activeIndex >= displayedCards.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">No more cards!</h2>
              <button
                onClick={resetCards}
                className="bg-dating-red text-[#2D142C] font-bold py-3 px-6 rounded-full shadow-[0_0_10px_rgba(238,69,64,0.5)] hover:bg-opacity-90 transition-colors"
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
          className="bg-dating-red text-[#2D142C] rounded-full w-16 h-16 flex items-center justify-center shadow-[0_0_10px_rgba(238,69,64,0.5)] hover:bg-opacity-90 transition-colors"
          disabled={activeIndex >= displayedCards.length}
        >
          <X className="h-8 w-8 text-[#2D142C]" />
        </button>
        <button
          onClick={handleSwipeUp}
          className="bg-dating-red text-[#2D142C] rounded-full w-16 h-16 flex items-center justify-center shadow-[0_0_10px_rgba(238,69,64,0.5)] hover:bg-opacity-90 transition-colors"
          disabled={activeIndex >= displayedCards.length}
        >
          <ArrowUp className="h-8 w-8 text-[#2D142C]" />
        </button>
        <button
          onClick={handleSwipeRight}
          className="bg-dating-red text-[#2D142C] rounded-full w-16 h-16 flex items-center justify-center shadow-[0_0_10px_rgba(238,69,64,0.5)] hover:bg-opacity-90 transition-colors"
          disabled={activeIndex >= displayedCards.length}
        >
          <Check className="h-8 w-8 text-[#2D142C]" />
        </button>
      </div>

      {/* Feedback Modal */}
      {activeIndex < displayedCards.length && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          onSubmit={handleFeedbackSubmit}
          cardContent={displayedCards[activeIndex].content}
          cardId={displayedCards[activeIndex].id}
        />
      )}
    </div>
  );
});

SwipeContainer.displayName = "SwipeContainer";

export default SwipeContainer;
