
import React, { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Copy } from "lucide-react";
import { Button } from '@/components/ui/button';
import CardPreview from '@/components/CardPreview';
import { generatePRDSummary } from '@/services/openaiService';

interface CardData {
  id: string;
  content: string;
  category: string;
  approvedCount: number;
  rejectedCount: number;
  suggestions: {
    id: string;
    suggestion: string;
    date: string;
    author: string;
  }[];
}

interface JiraTicketDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cardData: CardData;
}

const JiraTicketDialog: React.FC<JiraTicketDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  cardData 
}) => {
  const [summary, setSummary] = useState(`${cardData.content}`);
  
  // Format suggestions to create a prompt for ChatGPT
  const formatContent = () => {
    let content = `Main Idea: ${cardData.content}\n\n`;
    content += `Category: ${cardData.category}\n`;
    content += `Approvals: ${cardData.approvedCount}, Rejections: ${cardData.rejectedCount}\n\n`;
    
    if (cardData.suggestions.length > 0) {
      content += "Suggestions:\n";
      cardData.suggestions.forEach((suggestion, index) => {
        content += `${index + 1}. ${suggestion.suggestion} (by ${suggestion.author})\n`;
      });
    }
    
    return content;
  };
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [prdSummary, setPrdSummary] = useState("");
  
  const generatePRD = async () => {
    setIsGenerating(true);
    
    try {
      const contentToSummarize = formatContent();
      
      const generatedPRD = await generatePRDSummary(contentToSummarize);
      setPrdSummary(generatedPRD);
      
      toast.success("PRD successfully generated!");
    } catch (error) {
      console.error("Error generating PRD:", error);
      toast.error("Failed to generate PRD. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prdSummary)
      .then(() => toast.success("PRD copied to clipboard!"))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  // Card preview data
  const cardPreview = {
    content: cardData.content,
    category: cardData.category
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Summarize Content</AlertDialogTitle>
          <AlertDialogDescription>
            Generate a Product Requirements Document based on this card's content and suggestions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Card Preview */}
          <div className="w-full h-[200px] relative mb-6">
            <CardPreview card={cardPreview} />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="summary" className="text-sm font-medium">Summary</label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary"
            />
          </div>
          
          {!prdSummary ? (
            <div className="flex justify-center pt-4">
              <Button 
                onClick={generatePRD}
                disabled={isGenerating}
                className="bg-gradient-to-r from-[#9b87f5] to-[#C72C41] hover:from-[#8B5CF6] hover:to-[#D946EF]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Summarize as PRD (ChatGPT)'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="prd" className="text-sm font-medium">Generated PRD</label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="prd"
                  value={prdSummary}
                  onChange={(e) => setPrdSummary(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            </div>
          )}
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isGenerating}>Cancel</AlertDialogCancel>
          {prdSummary && (
            <AlertDialogAction 
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-[#9b87f5] to-[#C72C41] hover:from-[#8B5CF6] hover:to-[#D946EF]"
            >
              Done
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JiraTicketDialog;
