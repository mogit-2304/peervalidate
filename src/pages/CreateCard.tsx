
import React, { useState } from "react";
import CardCreationForm from "@/components/CardCreationForm";
import { Card } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
  const navigate = useNavigate();
  
  const handleAddCard = (newCard: Omit<Card, "id">) => {
    const cardWithId: Card = {
      ...newCard,
      id: uuidv4()
    };
    
    // In a real app, this would save to a backend/state management
    // For now, we'll just show a success toast and navigate back
    toast.success("New card created successfully!");
    
    // Navigate back to home page after creation
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  
  return (
    <div className="pb-24 bg-[#2D142C] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-[#C72C41]">Create Card</span>
          </h1>
          <p className="text-white mt-2">Share your thoughts and opinions</p>
        </header>
        
        <div className="max-w-md mx-auto">
          <CardCreationForm 
            onSubmit={handleAddCard}
            onCancel={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
