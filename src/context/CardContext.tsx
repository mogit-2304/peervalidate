import React, { createContext, useContext, useState, ReactNode } from "react";
import { Card } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Sample cards with the new prompts
const sampleCards: Card[] = [
  {
    id: "1",
    content: "Feature to track meeting room booking conflicts.",
    category: "WIS",
    duration: "1 day"
  },
  {
    id: "2",
    content: "Allow color-coded dashboards per user.",
    category: "ETS",
    duration: "3 days"
  },
  {
    id: "3",
    content: "Are we over-engineering feature X for a use case that isn't critical?",
    category: "MIS ONE",
    duration: "5 days"
  },
  {
    id: "4",
    content: "Will auto-creating focused time slot in your calendar be helpful?",
    category: "Sales",
    duration: "1 hour"
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
