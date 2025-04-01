import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Layers,
  Zap,
  Check,
  Brain,
  Sparkles,
  Globe,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatDemo from "@/components/chat-demo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div>
            <span className="text-xl font-bold">AIverse</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline"
            >
              How It Works
            </Link>
            <Link
              href="#models"
              className="text-sm font-medium hover:underline"
            >
              AI Models
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline"
            >
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <Badge className="w-fit" variant="outline">
                The Future of AI Interaction
              </Badge>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Your Unified AI{" "}
                  <span className="text-primary">Playground</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Chat with multiple popular LLMs like GPT, Grok, Gemini, and
                  Qwen in a single app with universal context awareness.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="mr-1 h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-1 h-4 w-4 text-primary" />
                  <span>Free tier available</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] overflow-hidden p-2 ">
                <Image
                  src="/benner-image.svg"
                  alt="AIverse app interface showing multiple AI chat conversations"
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Demo Section - HIGHLIGHTED & REPOSITIONED */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 border-y border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.2),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,80,255,0.2),transparent_60%)]"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <Badge className="w-fit bg-primary text-primary-foreground px-3 py-1 text-sm">
              No Registration Required
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Try AIverse <span className="text-primary">Right Now</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience our universal AI chat interface without signing up
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      Chat with Multiple AI Models
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Try GPT, Gemini, and Grok in one interface
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Universal Context</h3>
                    <p className="text-muted-foreground text-sm">
                      See how all models receive your messages simultaneously
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Compare Responses</h3>
                    <p className="text-muted-foreground text-sm">
                      Switch between tabs to see how different models respond
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Link href="/register">
                  <Button size="lg" className="gap-1 w-full">
                    Sign Up For Full Access <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground">
                  The demo has limited functionality. Sign up for the full
                  experience.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-background rounded-xl border-2 border-primary/20 shadow-xl shadow-primary/5 overflow-hidden">
                <div className="p-1 sm:p-2 md:p-4">
                  <ChatDemo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="w-fit" variant="outline">
              Features
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Unique Features
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience AI conversations like never before with our
                innovative platform
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-1">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Multiple AI Models</CardTitle>
                <CardDescription>
                  Access all your favorite AI models in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chat with GPT, Grok, Gemini, Qwen and more all in one unified
                  interface. Switch between models seamlessly without changing
                  apps.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="gap-1 p-0 h-auto text-primary"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-1">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Universal Context</CardTitle>
                <CardDescription>
                  AI models that understand your entire conversation history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All AI models are aware of who you are and your conversations
                  with other models, creating a cohesive experience across
                  different AIs.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="gap-1 p-0 h-auto text-primary"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-1">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  Smart Context Management
                </CardTitle>
                <CardDescription>
                  Intelligent memory for more natural conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Session-based context management ensures AI models remember
                  your recent conversations and can reference them
                  appropriately.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="gap-1 p-0 h-auto text-primary"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-1">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Model Comparison</CardTitle>
                <CardDescription>
                  Compare responses from different AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ask the same question to multiple AI models simultaneously and
                  compare their responses to get the most comprehensive answer.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="gap-1 p-0 h-auto text-primary"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-1">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  Personalized Experience
                </CardTitle>
                <CardDescription>
                  Customize your AI interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set preferences for each AI model, save favorite prompts, and
                  customize the interface to match your workflow and
                  preferences.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="gap-1 p-0 h-auto text-primary"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-1">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Cross-Platform Access</CardTitle>
                <CardDescription>
                  Access from any device, anywhere
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use AIverse on desktop, mobile, or tablet with a responsive
                  interface that syncs your conversations across all your
                  devices.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="gap-1 p-0 h-auto text-primary"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="w-fit" variant="outline">
              How It Works
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Intuitive, Powerful
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                AIverse makes interacting with multiple AI models effortless
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account in seconds and choose your subscription
                plan. Start with the free tier to explore the platform.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Select Your AI Models</h3>
              <p className="text-muted-foreground">
                Choose from our extensive library of AI models. Pin your
                favorites for quick access or explore new ones.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Start Chatting</h3>
              <p className="text-muted-foreground">
                Begin conversations with your selected AI models. Switch between
                them seamlessly or chat with multiple models simultaneously.
              </p>
            </div>
          </div>

          <div className="mt-5 relative">
            <div className="rounded-xl overflow-hidden max-w-4xl mx-auto">
              <Image
                src="/benner.svg"
                alt="AIverse app interface showing multiple AI chat conversations"
                width={1200}
                height={600}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover", // Ensures image covers container while maintaining aspect ratio
                }}
                className="aspect-video" // Enforces 16:9 aspect ratio (adjust if needed)
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <Button size="lg" className="gap-2">
                Try It Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* AI Models Section */}
      <section id="models" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="w-fit" variant="outline">
              AI Models
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Supported AI Models
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Access the world's most powerful AI models in one place
              </p>
            </div>
          </div>

          <Tabs defaultValue="popular" className="mt-12 max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="popular">Popular Models</TabsTrigger>
              <TabsTrigger value="specialized">Specialized Models</TabsTrigger>
              <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
            </TabsList>
            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GPT-4o</CardTitle>
                    <CardDescription>
                      OpenAI's most advanced model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Multimodal capabilities with advanced reasoning and
                      knowledge up to April 2023.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Available on all plans
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gemini Pro</CardTitle>
                    <CardDescription>Google's multimodal AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Excellent at understanding context and generating creative
                      content across text and images.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Available on all plans
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grok-1</CardTitle>
                    <CardDescription>
                      xAI's conversational model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Known for its witty responses and real-time information
                      access.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Standard & Premium
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Claude 3 Opus</CardTitle>
                    <CardDescription>
                      Anthropic's flagship model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Exceptional at complex reasoning and detailed analysis
                      with strong safety features.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Standard & Premium
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Llama 3</CardTitle>
                    <CardDescription>Meta's open-source model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Powerful open-source model with strong performance across
                      various tasks.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Available on all plans
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Qwen</CardTitle>
                    <CardDescription>Alibaba's versatile model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Excellent multilingual capabilities with strong
                      performance in both English and Chinese.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Standard & Premium
                    </Badge>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="specialized" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Llama</CardTitle>
                    <CardDescription>Specialized for coding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Optimized for code generation, debugging, and technical
                      documentation.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Standard & Premium
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>DALL-E 3</CardTitle>
                    <CardDescription>Image generation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Create stunning images from text descriptions with
                      remarkable accuracy.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Premium only
                    </Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Whisper</CardTitle>
                    <CardDescription>Speech recognition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Transcribe speech to text with high accuracy across
                      multiple languages.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      Standard & Premium
                    </Badge>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GPT-5</CardTitle>
                    <CardDescription>Next-gen OpenAI model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      OpenAI's next generation model with enhanced capabilities
                      (coming soon).
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="secondary">Coming Q3 2025</Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gemini Ultra</CardTitle>
                    <CardDescription>Google's most powerful AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Google's most capable model with enhanced reasoning and
                      multimodal capabilities.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="secondary">Coming Q2 2025</Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Claude 3 Sonnet</CardTitle>
                    <CardDescription>
                      Anthropic's balanced model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Balances high performance with efficiency for a wide range
                      of tasks.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="secondary">Coming Q2 2025</Badge>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="w-fit" variant="outline">
              Pricing
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for you
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            {/* Free Tier */}
            <Card className="flex flex-col">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>
                  Get started with basic AI interactions
                </CardDescription>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $0
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Access to 3 basic AI models</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>1,000 tokens per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>50 messages per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Basic context management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Community support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Standard Tier */}
            <Card className="flex flex-col border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Standard</CardTitle>
                <CardDescription>Perfect for regular AI users</CardDescription>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $9.99
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Access to 8+ AI models</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>10,000 tokens per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Advanced context management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Conversation history (30 days)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>

            {/* Premium Tier */}
            <Card className="flex flex-col">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>
                  For power users and professionals
                </CardDescription>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $19.99
                  <span className="ml-1 text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Access to all AI models (10+)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>50,000 tokens per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Premium context management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Unlimited conversation history</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>Custom AI configurations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>API access</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Need a custom plan for your organization?{" "}
              <Link
                href="#"
                className="text-primary font-medium hover:underline"
              >
                Contact us
              </Link>{" "}
              for enterprise pricing.
            </p>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="w-fit" variant="outline">
              Testimonials
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of satisfied users already enjoying AIverse
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Sarah Johnson"
                    />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      "AIverse has completely transformed how I interact with
                      AI. Having all my favorite models in one place with shared
                      context is a game-changer for my workflow."
                    </p>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">
                        Product Designer
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Michael Chen"
                    />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      "As a developer, I love being able to compare responses
                      from different AI models. It helps me get the most
                      accurate and helpful information for my coding
                      challenges."
                    </p>
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-muted-foreground">
                        Software Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Emily Rodriguez"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      "The universal context feature is brilliant. I no longer
                      have to repeat myself when switching between AI models.
                      It's like they all know me personally!"
                    </p>
                    <div>
                      <p className="font-medium">Emily Rodriguez</p>
                      <p className="text-sm text-muted-foreground">
                        Content Creator
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="w-fit" variant="outline">
              FAQ
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about AIverse
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl mt-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What makes AIverse different from other AI chat apps?
                </AccordionTrigger>
                <AccordionContent>
                  AIverse uniquely offers universal context awareness across
                  multiple AI models. This means each AI knows about your
                  conversations with other AIs, creating a more cohesive
                  experience. Additionally, our platform allows you to compare
                  responses from different models side-by-side, helping you get
                  the most comprehensive answers to your questions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Which AI models are available on AIverse?
                </AccordionTrigger>
                <AccordionContent>
                  AIverse currently supports a wide range of models including
                  GPT-4o, Gemini Pro, Grok-1, Claude 3 Opus, Llama 3, Qwen, and
                  more. We're constantly adding new models as they become
                  available. Premium subscribers get priority access to the
                  newest and most advanced models.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How does the context management work?
                </AccordionTrigger>
                <AccordionContent>
                  Our smart session-based context management system allows AI
                  models to remember your recent conversations and reference
                  them when appropriate. This creates a more natural and helpful
                  interaction. The system intelligently manages context to
                  ensure relevant information is retained while preventing
                  context overload.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I switch between subscription tiers?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can upgrade or downgrade your subscription at any
                  time. Changes will take effect at the start of your next
                  billing cycle. When upgrading, you'll immediately gain access
                  to the additional features of your new plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Is my data secure on AIverse?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. All conversations
                  are encrypted, and we have strict data privacy policies in
                  place. We do not sell your data to third parties. You can
                  delete your conversation history at any time, and we offer
                  controls for managing how your data is used for model
                  training.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Can I use AIverse on mobile devices?
                </AccordionTrigger>
                <AccordionContent>
                  AIverse is fully responsive and works on desktop, tablet, and
                  mobile devices. Your conversations sync across all your
                  devices, so you can start a chat on your computer and continue
                  it on your phone seamlessly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>
                  Do you offer an API for developers?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, Premium subscribers have access to our API, which allows
                  you to integrate AIverse's capabilities into your own
                  applications. This includes access to our universal context
                  management system and the ability to query multiple AI models
                  with a single API call.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold">AIverse</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your unified AI playground with universal context awareness
                across multiple AI models.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AIverse. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
