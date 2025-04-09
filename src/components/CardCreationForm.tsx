
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/types";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

interface CardCreationFormProps {
  onSubmit: (card: Omit<Card, "id">) => void;
  onCancel: () => void;
}

const CATEGORIES = ["WIS", "ETS", "MIS ONE", "Sales", "Support", "Tech"];
const DURATIONS = [
  "1 hour", 
  "3 hours", 
  "10 hours", 
  "1 day", 
  "3 days", 
  "5 days", 
  "10 days"
];

const CardCreationForm: React.FC<CardCreationFormProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the image file
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Please enter content for your card");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    if (!duration) {
      toast.error("Please select a duration");
      return;
    }
    
    onSubmit({
      content,
      category,
      duration,
      imageUrl
    });
    
    // Reset form
    setContent("");
    setCategory("");
    setDuration("");
    setImageUrl(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {category && (
            <div className="mt-2">
              <Badge className="bg-dating-yellow text-black">{category}</Badge>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Content</label>
          <Textarea 
            placeholder="Enter your opinion or statement..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Duration</label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((dur) => (
                <SelectItem key={dur} value={dur}>
                  {dur}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Image (Optional)</label>
          <div className="space-y-2">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="mr-2" size={18} />
              {imageUrl ? "Change Image" : "Add Image"}
            </Button>
            <input 
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageUrl && (
              <div className="mt-2 relative">
                <img 
                  src={imageUrl} 
                  alt="Card image" 
                  className="w-full h-40 object-cover rounded-md" 
                />
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => setImageUrl(undefined)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Create Card
        </Button>
      </div>
    </div>
  );
};

export default CardCreationForm;
