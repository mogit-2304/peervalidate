
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Sample cards with the base structure
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

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, "id">) => void;
  resetCards: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>(sampleCards);

  const addCard = (newCard: Omit<Card, "id">) => {
    const cardWithId: Card = {
      ...newCard,
      id: uuidv4(),
    };
    
    setCards(prevCards => [cardWithId, ...prevCards]);
  };

  const resetCards = () => {
    setCards(sampleCards);
  };

  return (
    <CardContext.Provider value={{ cards, addCard, resetCards }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
};
