"use client";

import * as React from "react";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus } from "lucide-react";
import { useAppContext } from "@/app/AppProvider";
import BotCreationForm from "./BotCreationForm";

// Data remains unchanged
const discoverData = {
  featuredBots: [
    {
      id: "1",
      name: "ChatGPT",
      avatar: "/placeholder.svg?height=80&width=80",
      description:
        "Advanced AI assistant for general knowledge and conversation",
      category: "General",
      rating: 4.9,
      reviews: 12453,
      verified: true,
      popular: true,
    },
    {
      id: "2",
      name: "Midjourney",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "Create stunning images from text descriptions",
      category: "Image Generation",
      rating: 4.8,
      reviews: 8765,
      verified: true,
      popular: true,
    },
    {
      id: "3",
      name: "CodeAssist",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "AI-powered coding assistant for developers",
      category: "Development",
      rating: 4.7,
      reviews: 5432,
      verified: true,
      popular: true,
    },
    {
      id: "4",
      name: "WriterBot",
      avatar: "/placeholder.svg?height=80&width=80",
      description: "Professional writing assistant for content creation",
      category: "Writing",
      rating: 4.6,
      reviews: 3210,
      verified: true,
      popular: true,
    },
  ],
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
  popularBots: [
    {
      id: "5",
      name: "DALL-E",
      avatar: "/placeholder.svg?height=64&width=64",
      description:
        "Create realistic images and art from natural language descriptions",
      category: "Image Generation",
      rating: 4.7,
      reviews: 7654,
      verified: true,
    },
    {
      id: "6",
      name: "Claude",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Helpful, harmless, and honest AI assistant",
      category: "General",
      rating: 4.8,
      reviews: 6543,
      verified: true,
    },
    {
      id: "7",
      name: "GitHub Copilot",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "AI pair programmer that helps you write better code",
      category: "Development",
      rating: 4.9,
      reviews: 8765,
      verified: true,
    },
    {
      id: "8",
      name: "Jasper",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "AI content writer that helps you create marketing copy",
      category: "Writing",
      rating: 4.6,
      reviews: 5432,
      verified: true,
    },
    {
      id: "9",
      name: "Character.AI",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Create and chat with AI characters from fiction or history",
      category: "Roleplay",
      rating: 4.5,
      reviews: 4321,
      verified: true,
    },
    {
      id: "10",
      name: "Stable Diffusion",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Generate detailed images from text descriptions",
      category: "Image Generation",
      rating: 4.7,
      reviews: 6789,
      verified: true,
    },
  ],
  newBots: [
    {
      id: "11",
      name: "GPT-4o",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Latest multimodal AI with enhanced capabilities",
      category: "General",
      rating: 4.9,
      reviews: 1234,
      verified: true,
      new: true,
    },
    {
      id: "12",
      name: "Gemini",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Google's most capable and general AI model",
      category: "General",
      rating: 4.8,
      reviews: 987,
      verified: true,
      new: true,
    },
    {
      id: "13",
      name: "Sora",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Create realistic and imaginative videos from text",
      category: "Video Generation",
      rating: 4.7,
      reviews: 543,
      verified: true,
      new: true,
    },
    {
      id: "14",
      name: "Anthropic Claude 3",
      avatar: "/placeholder.svg?height=64&width=64",
      description: "Advanced AI assistant with improved reasoning",
      category: "General",
      rating: 4.9,
      reviews: 876,
      verified: true,
      new: true,
    },
  ],
};

const DiscoverView = () => {
  const truncateText = (text, maxWords) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const { user, aiContacts } = useAppContext();
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  // src={`${BACKEND_URL}/uploads/${bot.avatar}`}

  const tryNowHandler = ({ bot }) => {
    //todo add in the bots array of user if not exist
    //redirect to the bot/id page
  };
  const onBotClick = () => {
    console.log("Bot Clicked");
  };
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedBotDetails, setSelectedBotDetails] = React.useState(null);
  const [isCreateBotOpen, setIsCreateBotOpen] = React.useState(false);

  const handleBotDetails = (bot) => {
    setSelectedBotDetails(bot);
  };
  return (
    <div className="flex flex-col h-full">
      <Dialog
        open={selectedBotDetails !== null}
        onOpenChange={(open) => !open && setSelectedBotDetails(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          {selectedBotDetails && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={
                        `${BACKEND_URL}/uploads/${selectedBotDetails.avatar}` ||
                        "/placeholder.svg"
                      }
                      alt={selectedBotDetails.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    {selectedBotDetails.verified && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                    )}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedBotDetails.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                      {selectedBotDetails.category}
                    </DialogDescription>
                    <div className="flex items-center mt-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {selectedBotDetails.rating}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({selectedBotDetails.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 my-2">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedBotDetails.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Capabilities</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Natural language understanding and generation</li>
                    <li>Context-aware conversations</li>
                    <li>Knowledge retrieval and summarization</li>
                    {selectedBotDetails.category === "Image Generation" && (
                      <li>Creates images from text descriptions</li>
                    )}
                    {selectedBotDetails.category === "Development" && (
                      <li>Code generation and explanation</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Sample Prompts</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto py-2 px-3"
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-2" />
                      <span className="text-sm">
                        Tell me about{" "}
                        {selectedBotDetails.category.toLowerCase()}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto py-2 px-3"
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-2" />
                      <span className="text-sm">
                        How can you help me with my projects?
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedBotDetails(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const chatBot = {
                      id: selectedBotDetails.id,
                      name: selectedBotDetails.name,
                      avatar: selectedBotDetails.avatar,
                      status: "online",
                      lastMessage: "Hello! How can I help you today?",
                      time: "Just now",
                      unread: 0,
                    };
                    onBotClick(chatBot);
                    setSelectedBotDetails(null);
                  }}
                >
                  Try Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BotCreationForm
        isCreateBotOpen={isCreateBotOpen}
        setIsCreateBotOpen={setIsCreateBotOpen}
      />
      {/* <Dialog open={isCreateBotOpen} onOpenChange={setIsCreateBotOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Bot</DialogTitle>
            <DialogDescription>
              Design your own AI assistant. Fill out the details below to get
              started.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Bot Name</Label>
              <Input id="name" placeholder="My Assistant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {discoverData.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your bot does..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button type="button" variant="outline" size="sm">
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Provide detailed instructions for your bot..."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateBotOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsCreateBotOpen(false);
                }}
              >
                Create Bot
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}

      <div className="border-b p-6 bg-background sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Discover AI Bots</h1>
          <p className="text-muted-foreground mb-6">
            Find the perfect AI assistant for your needs
          </p>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for bots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b bg-background sticky top-[97px] z-10">
        <div className="max-w-5xl mx-auto px-6">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="h-12 w-full justify-start gap-4 rounded-none bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="h-12 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="h-12 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Popular
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="h-12 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                New
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="h-12 rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Star className="h-4 w-4 mr-1" />
                Verified
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold">Create Your Own AI Bot</h2>
                <p className="text-muted-foreground max-w-md">
                  Design a custom AI assistant tailored to your specific needs
                  and preferences.
                </p>
              </div>
              <Button size="lg" onClick={() => setIsCreateBotOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Bot
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {discoverData.categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  className="h-9 rounded-full"
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                >
                  <category.icon className="h-3.5 w-3.5 mr-1" />
                  {category.name}
                  <Badge variant="secondary" className="ml-1.5 px-1.5 py-0">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {(activeTab === "all" || activeTab === "popular") && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Featured Bots</h2>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiContacts
                  .filter(
                    (bot) =>
                      (!selectedCategory ||
                        bot.category
                          .toLowerCase()
                          .includes(selectedCategory)) &&
                      (bot.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                        bot.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        bot.category
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()))
                  )
                  .map((bot) => (
                    <Card
                      className="cursor-pointer overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => handleBotDetails(bot)}
                    >
                      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
                        <div className="relative h-12 w-12">
                          <img
                            src={
                              `${BACKEND_URL}/uploads/${bot.avatar}` ||
                              "/placeholder.svg"
                            }
                            alt={bot.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          {bot.verified && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                              <Star className="h-3 w-3 fill-current" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            {bot.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {bot.category}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bot.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {bot.rating}
                          </span>
                        </div>
                        <Button size="sm">Try Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "popular") && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Popular Bots</h2>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {discoverData.popularBots
                  .filter(
                    (bot) =>
                      (!selectedCategory ||
                        bot.category
                          .toLowerCase()
                          .includes(selectedCategory)) &&
                      (bot.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                        bot.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        bot.category
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()))
                  )
                  .slice(0, 8)
                  .map((bot) => (
                    <Card
                      key={bot.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => handleBotDetails(bot)}
                    >
                      <CardHeader className="p-3 pb-2 flex flex-row items-center gap-3">
                        <img
                          src={
                            `${BACKEND_URL}/uploads/${bot.avatar}` ||
                            "/placeholder.svg"
                          }
                          alt={bot.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <CardTitle className="text-sm">{bot.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {bot.category}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bot.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium ml-1">
                            {bot.rating}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          Try Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "new") && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New & Trending</h2>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {discoverData.newBots
                  .filter(
                    (bot) =>
                      (!selectedCategory ||
                        bot.category
                          .toLowerCase()
                          .includes(selectedCategory)) &&
                      (bot.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                        bot.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        bot.category
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()))
                  )
                  .map((bot) => (
                    <Card
                      key={bot.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => handleBotDetails(bot)}
                    >
                      <CardHeader className="p-3 pb-2 flex flex-row items-center gap-3">
                        <div className="relative">
                          <img
                            src={
                              `${BACKEND_URL}/uploads/${bot.avatar}` ||
                              "/placeholder.svg"
                            }
                            alt={bot.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          {bot.new && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                              <Zap className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-sm">{bot.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {bot.category}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bot.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium ml-1">
                            {bot.rating}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          Try Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">General Assistants</h3>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {discoverData.popularBots
                  .filter((bot) => bot.category === "General")
                  .slice(0, 4)
                  .map((bot) => (
                    <Card
                      key={bot.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => handleBotDetails(bot)}
                    >
                      <CardHeader className="p-3 pb-2 flex flex-row items-center gap-3">
                        <img
                          src={
                            `${BACKEND_URL}/uploads/${bot.avatar}` ||
                            "/placeholder.svg"
                          }
                          alt={bot.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <CardTitle className="text-sm">{bot.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {bot.category}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bot.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium ml-1">
                            {bot.rating}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          Try Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Image Generation</h3>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {discoverData.popularBots
                  .filter((bot) => bot.category === "Image Generation")
                  .slice(0, 4)
                  .map((bot) => (
                    <Card
                      key={bot.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => handleBotDetails(bot)}
                    >
                      <CardHeader className="p-3 pb-2 flex flex-row items-center gap-3">
                        <img
                          src={
                            `${BACKEND_URL}/uploads/${bot.avatar}` ||
                            "/placeholder.svg"
                          }
                          alt={bot.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <CardTitle className="text-sm">{bot.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {bot.category}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {bot.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium ml-1">
                            {bot.rating}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost">
                          Try Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {((activeTab === "all" &&
            discoverData.featuredBots.filter(
              (bot) =>
                (!selectedCategory ||
                  bot.category.toLowerCase().includes(selectedCategory)) &&
                (bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bot.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  bot.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
            ).length === 0 &&
            discoverData.popularBots.filter(
              (bot) =>
                (!selectedCategory ||
                  bot.category.toLowerCase().includes(selectedCategory)) &&
                (bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bot.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  bot.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
            ).length === 0 &&
            discoverData.newBots.filter(
              (bot) =>
                (!selectedCategory ||
                  bot.category.toLowerCase().includes(selectedCategory)) &&
                (bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bot.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  bot.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
            ).length === 0) ||
            (activeTab === "popular" &&
              discoverData.featuredBots.filter(
                (bot) =>
                  (!selectedCategory ||
                    bot.category.toLowerCase().includes(selectedCategory)) &&
                  (bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    bot.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    bot.category
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()))
              ).length === 0 &&
              discoverData.popularBots.filter(
                (bot) =>
                  (!selectedCategory ||
                    bot.category.toLowerCase().includes(selectedCategory)) &&
                  (bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    bot.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    bot.category
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()))
              ).length === 0) ||
            (activeTab === "new" &&
              discoverData.newBots.filter(
                (bot) =>
                  (!selectedCategory ||
                    bot.category.toLowerCase().includes(selectedCategory)) &&
                  (bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    bot.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    bot.category
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()))
              ).length === 0)) && (
            <div className="flex flex-col items-center justify-center py-12">
              <Brain className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No bots found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                We couldn't find any bots matching your search criteria. Try
                adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DiscoverView;
