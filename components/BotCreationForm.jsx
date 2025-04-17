import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Adjust path as needed
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { Input } from "@/components/ui/input"; // Adjust path as needed
import { Label } from "@/components/ui/label"; // Adjust path as needed
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust path as needed
import { Textarea } from "@/components/ui/textarea"; // Adjust path as needed
import { Upload } from "lucide-react"; // Assuming you use lucide-react for icons
import {
  Search,
  Filter,
  Star,
  Sparkles,
  Image,
  MessageSquare,
  Code,
  Brain,
  Zap,
  Briefcase,
  Gamepad2,
  Music,
  ShoppingCart,
  Palette,
  BookOpen,
  Heart,
} from "lucide-react";
import { auth } from "@/app/firebase/config";

// Mock discoverData - replace with your actual data source
// Data remains unchanged
const discoverData = {
  categories: [
    { id: "general", name: "General", icon: MessageSquare, count: 156 },
    { id: "image", name: "Image Generation", icon: Image, count: 87 },
    { id: "code", name: "Development", icon: Code, count: 64 },
    { id: "roleplay", name: "Roleplay", icon: Gamepad2, count: 42 },
    { id: "business", name: "Business", icon: Briefcase, count: 38 },
    { id: "creative", name: "Creative", icon: Palette, count: 29 },
    { id: "education", name: "Education", icon: BookOpen, count: 53 },
    { id: "music", name: "Music", icon: Music, count: 18 },
    { id: "shopping", name: "Shopping", icon: ShoppingCart, count: 24 },
    { id: "relationships", name: "Relationships", icon: Heart, count: 15 },
  ],
};

const BotCreationForm = ({ isCreateBotOpen, setIsCreateBotOpen }) => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  // --- State Variables ---
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [personality, setPersonality] = useState("");
  const [backstory, setBackstory] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [primaryFunction, setPrimaryFunction] = useState("");
  const [interactionStyle, setInteractionStyle] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  //for animation
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateBot = async () => {
    setIsSubmitting(true);
    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        console.error("No authenticated user");
        return;
      }

      const idToken = await firebaseUser.getIdToken();

      const formData = new FormData();
      // Append all required fields
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("role", role);
      formData.append("personality", personality);
      formData.append("backstory", backstory);
      formData.append("speciality", speciality);
      formData.append("primaryFunction", primaryFunction);
      formData.append("interactionStyle", interactionStyle); // Fixed missing value

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch(`${BACKEND_URL}/api/bots/custom`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Bot creation successful");
        // Reset form state
        setName("");
        setCategory("");
        setDescription("");
        setRole("");
        setPersonality("");
        setBackstory("");
        setSpeciality("");
        setPrimaryFunction("");
        setInteractionStyle("");
        setAvatarFile(null);
        setAvatarPreview(null);
        setIsCreateBotOpen(false);

        // Optional: Refresh user data or bot list
      } else {
        const errorData = await response.json();
        console.error("Failed to create bot:", errorData);
        // Handle error display to user
      }
    } catch (error) {
      console.error("Error in bot creation:", error);
      // Handle network errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isCreateBotOpen} onOpenChange={setIsCreateBotOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Bot</DialogTitle>
          <DialogDescription>
            Design your own AI assistant. Fill out the details below to get
            started.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {" "}
          {/* Prevent default form submission */}
          {/* Bot Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Bot Name</Label>
            <Input
              id="name"
              placeholder="E.g., Marketing Maven, CodeHelper Pro"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {discoverData.categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what your bot does, its purpose, and who it's for."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="E.g., Tutor, Assistant, Coach, Devil's Advocate"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          {/* Personality */}
          <div className="space-y-2">
            <Label htmlFor="personality">Personality</Label>
            <Input
              id="personality"
              placeholder="E.g., Witty, Formal, Enthusiastic, Calm, Sarcastic"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            />
          </div>
          {/* Backstory */}
          <div className="space-y-2">
            <Label htmlFor="backstory">Backstory</Label>
            <Textarea
              id="backstory"
              placeholder="Give your bot some history or context. Where did it come from? What motivates it?"
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              rows={4}
            />
          </div>
          {/* Speciality */}
          <div className="space-y-2">
            <Label htmlFor="speciality">Speciality / Domain Knowledge</Label>
            <Input
              id="speciality"
              placeholder="E.g., Python programming, SEO best practices, French history"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </div>
          {/* Primary Function */}
          <div className="space-y-2">
            <Label htmlFor="primaryFunction">Primary Function</Label>
            <Input
              id="primaryFunction"
              placeholder="E.g., Answering questions, Generating code, Brainstorming ideas"
              value={primaryFunction}
              onChange={(e) => setPrimaryFunction(e.target.value)}
            />
          </div>
          {/* Interaction Style */}
          <div className="space-y-2">
            <Label htmlFor="interactionStyle">Interaction Style</Label>
            <Input
              id="interactionStyle"
              placeholder="E.g., Asks clarifying questions, Uses emojis, Speaks concisely"
              value={interactionStyle}
              onChange={(e) => setInteractionStyle(e.target.value)}
            />
          </div>
          {/* Avatar */}
          <div className="space-y-2">
            <Label htmlFor="avatar-upload">Avatar</Label>
            <div className="flex items-center gap-4">
              {/* Hidden file input */}
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }} // Hide the default input
              />
              {/* Display preview or placeholder */}
              <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              {/* Custom Upload Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                } // Trigger the hidden input
              >
                {avatarPreview ? "Change Image" : "Upload Image"}
              </Button>
            </div>
            {avatarFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {avatarFile.name}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateBotOpen(false)}
            >
              Cancel
            </Button>
            {/* Changed to call handleCreateBot */}
            <Button
              type="button"
              onClick={handleCreateBot}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Create Bot"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BotCreationForm;
