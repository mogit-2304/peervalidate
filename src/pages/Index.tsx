
import React from "react";
import SwipeContainer from "@/components/SwipeContainer";

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-dating-lightgray to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-dating-yellow">SwipeSpark</span>
          </h1>
          <p className="text-dating-darkgray mt-2">Swipe right to approve, left to reject</p>
        </header>
        
        <div className="max-w-md mx-auto h-[60vh] mb-4">
          <SwipeContainer cards={sampleCards} />
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-8">
          Swipe on opinions to find your perfect match!
        </footer>
      </div>
    </div>
  );
};

export default Index;
