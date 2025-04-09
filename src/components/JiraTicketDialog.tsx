
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
import { createJiraTicket, formatJiraDescription } from "@/services/jiraService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
  const [summary, setSummary] = useState(`PB: ${cardData.content}`);
  const [description, setDescription] = useState(() => 
    formatJiraDescription({
      cardId: cardData.id,
      summary: cardData.content,
      description: "",
      category: cardData.category,
      approvalCount: cardData.approvedCount,
      rejectionCount: cardData.rejectedCount,
      suggestions: cardData.suggestions
    })
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await createJiraTicket({
        cardId: cardData.id,
        summary,
        description,
        category: cardData.category,
        approvalCount: cardData.approvedCount,
        rejectionCount: cardData.rejectedCount,
        suggestions: cardData.suggestions
      });

      toast.success(`JIRA ticket ${response.key} created successfully!`);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating JIRA ticket:", error);
      toast.error("Failed to create JIRA ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Create JIRA Ticket</AlertDialogTitle>
          <AlertDialogDescription>
            Create a JIRA product backlog item based on this card's content and suggestions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="summary" className="text-sm font-medium">Summary</label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ticket summary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ticket description"
              className="min-h-[200px]"
            />
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#9b87f5] to-[#C72C41] hover:from-[#8B5CF6] hover:to-[#D946EF]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create JIRA Ticket'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default JiraTicketDialog;
