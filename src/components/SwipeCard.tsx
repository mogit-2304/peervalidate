
import React from "react";
import { cn } from "@/lib/utils";

interface SwipeCardProps {
  content: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp?: () => void;
  dragState: "none" | "left" | "right" | "up";
  active: boolean;
  index: number;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  content,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  dragState,
  active,
  index,
}) => {
  return (
    <div
      className={cn(
        "absolute w-full h-full rounded-2xl shadow-lg bg-white border-2 transition-all duration-300 swipe-card",
        dragState === "left" && "animate-swipe-left",
        dragState === "right" && "animate-swipe-right",
        dragState === "up" && "animate-swipe-up",
        !active && "scale-[0.95] opacity-80",
        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
      )}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-center font-medium">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
