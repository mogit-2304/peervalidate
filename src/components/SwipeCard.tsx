
import React from "react";
import { cn } from "@/lib/utils";

interface SwipeCardProps {
  content: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  dragState: "none" | "left" | "right";
  active: boolean;
  index: number;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  content,
  onSwipeLeft,
  onSwipeRight,
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
        !active && "scale-[0.95] opacity-80",
        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
      )}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-center font-medium">{content}</p>
        </div>
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div
            className={cn(
              "swipe-action swipe-action-left ml-8 bg-dating-red text-white rounded-full p-4 shadow-lg",
              dragState === "left" && "opacity-100"
            )}
          >
            <span className="font-bold text-lg">REJECT</span>
          </div>
          <div
            className={cn(
              "swipe-action swipe-action-right ml-auto mr-8 bg-dating-green text-white rounded-full p-4 shadow-lg",
              dragState === "right" && "opacity-100"
            )}
          >
            <span className="font-bold text-lg">APPROVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
