import React, { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

import HeroScene from "@/components/HeroScene";
import { AnimatedSection, AnimatedText } from "@/components/AnimatedSection";

const queryClient = new QueryClient();

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Set dark mode explicitly since it's a moody roastery
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <div className="font-serif text-2xl font-bold tracking-wider text-white" data-testid="nav-logo">
          E&G
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-white/80">
          <a href="#story" className="hover:text-white transition-colors" data-testid="nav-link-story">Story</a>
          <a href="#sourcing" className="hover:text-white transition-colors" data-testid="nav-link-sourcing">Sourcing</a>
          <a href="#roastery" className="hover:text-white transition-colors" data-testid="nav-link-roastery">Roastery</a>
          <a href="#visit" className="hover:text-white transition-colors" data-testid="nav-link-visit">Visit</a>
        </div>
        <Button variant="outline" className="rounded-none border-white/20 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs" data-testid="nav-button-order">
          Order Ahead
        </Button>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <HeroScene />
        <div className="relative z-10 text-center pointer-events-none px-4">
          <motion.h1 
            className="font-serif text-7xl md:text-9xl text-white font-bold mb-6 tracking-tight drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            data-testid="hero-title"
          >
            Ember & Grain
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/80 uppercase tracking-[0.3em] font-light max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            data-testid="hero-subtitle"
          >
            The slow ritual of exceptional coffee.
          </motion.p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>
      </section>

      {/* 2. The Story (Pouring) */}
      <AnimatedSection id="story" className="py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16" testId="section-story">
        <div className="w-full md:w-1/2 space-y-8">
          <AnimatedText delay={0.1}>
            <h2 className="text-primary text-sm uppercase tracking-[0.2em]">Our Philosophy</h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <h3 className="font-serif text-4xl md:text-6xl leading-tight">Time is our most <br/>valuable ingredient.</h3>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe coffee shouldn't be rushed. From the soil it grows in to the cup it fills, every step is a deliberate act of craft. At Ember & Grain, we slow down the process to extract the truest expression of the bean.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto text-lg group" data-testid="button-read-story">
              Read our story 
              <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">→</span>
            </Button>
          </AnimatedText>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img 
              src="/images/pouring.png" 
              alt="Pouring espresso" 
              className="object-cover w-full h-full"
              style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }}
              data-testid="img-pouring"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Sourcing (Farm) */}
      <AnimatedSection id="sourcing" className="py-32 bg-secondary/30" testId="section-sourcing">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-video overflow-hidden">
              <motion.img 
                src="/images/farm.png" 
                alt="Coffee farm in the mist" 
                className="object-cover w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                data-testid="img-farm"
              />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <AnimatedText delay={0.1}>
                <h2 className="text-primary text-sm uppercase tracking-[0.2em]">Provenance</h2>
              </AnimatedText>
              <AnimatedText delay={0.2}>
                <h3 className="font-serif text-4xl md:text-5xl leading-tight">Rooted in the earth.</h3>
              </AnimatedText>
              <AnimatedText delay={0.3}>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We partner directly with small-lot farmers in Ethiopia, Colombia, and Yemen. No middlemen. By paying premium prices, we ensure sustainable practices and secure the finest micro-lots in the world.
                </p>
              </AnimatedText>
              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-border">
                <AnimatedText delay={0.4}>
                  <div className="text-3xl font-serif text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Single Origin</div>
                </AnimatedText>
                <AnimatedText delay={0.5}>
                  <div className="text-3xl font-serif text-primary mb-2">Direct</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Trade Model</div>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. The Roastery */}
      <section id="roastery" className="relative h-[80vh] flex items-center justify-center overflow-hidden" data-testid="section-roastery">
        <motion.div className="absolute inset-0" style={{ y }}>
          <img src="/images/roastery.png" alt="Candlelit roastery" className="w-full h-full object-cover opacity-40" />
        </motion.div>
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 text-center max-w-3xl px-6">
          <AnimatedText delay={0.1}>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Fire. Smoke. Intuition.</h2>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-10">
              Our 1968 Probat roaster runs on intuition as much as gas. We roast in micro-batches at dusk, letting our senses guide the profile of every bean.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg uppercase tracking-widest" data-testid="button-book-tour">
              Book a Roastery Tour
            </Button>
          </AnimatedText>
        </div>
      </section>

      {/* 5. The Craft (Barista) */}
      <AnimatedSection className="py-32 px-6 md:px-20 max-w-7xl mx-auto" testId="section-craft">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 space-y-8">
            <AnimatedText delay={0.1}>
              <h2 className="text-primary text-sm uppercase tracking-[0.2em]">The Craft</h2>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <h3 className="font-serif text-4xl md:text-5xl leading-tight">Mastery in every pour.</h3>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our baristas undergo rigorous training to master temperature, grind size, and pressure. When you order from us, you're not just getting coffee; you're experiencing a culmination of thousands of hours of practice.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.4}>
               <ul className="space-y-4 border-l border-primary/30 pl-6">
                 <li>
                   <h4 className="font-serif text-xl">Pour Over</h4>
                   <p className="text-muted-foreground text-sm">V60 / Chemex / Kalita Wave</p>
                 </li>
                 <li>
                   <h4 className="font-serif text-xl">Espresso</h4>
                   <p className="text-muted-foreground text-sm">Slayer Espresso V3</p>
                 </li>
                 <li>
                   <h4 className="font-serif text-xl">Cold Brew</h4>
                   <p className="text-muted-foreground text-sm">24-hour slow drip Kyoto style</p>
                 </li>
               </ul>
            </AnimatedText>
          </div>
          <div className="md:col-span-7 relative aspect-[4/5] md:aspect-square overflow-hidden">
            <img src="/images/barista.png" alt="Barista crafting coffee" className="object-cover w-full h-full" data-testid="img-barista" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Footer / Visit */}
      <footer id="visit" className="bg-black text-white pt-32 pb-16 px-6 md:px-20 border-t border-white/10" data-testid="footer-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-serif text-4xl">Ember & Grain</h2>
            <p className="text-white/60 max-w-md text-lg">
              A sanctuary for those who respect the craft. Come sit by the fire and experience coffee as it was meant to be.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-primary mb-6">Visit</h4>
            <p className="text-white/80">1420 Artisan Way</p>
            <p className="text-white/80">Portland, OR 97209</p>
            <a href="#" className="inline-block mt-4 text-sm border-b border-white/30 pb-1 hover:border-primary transition-colors text-white/60">Get Directions</a>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-primary mb-6">Hours</h4>
            <p className="text-white/80 flex justify-between"><span>Mon-Fri</span> <span>6am - 4pm</span></p>
            <p className="text-white/80 flex justify-between"><span>Sat-Sun</span> <span>7am - 5pm</span></p>
            <p className="text-white/50 text-sm mt-4 italic">Roaster operates Tue & Thu evenings.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/40 pt-8 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} Ember & Grain Coffee Roasters.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Journal</a>
            <a href="#" className="hover:text-white transition-colors">Wholesale</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route>
        <div className="flex h-screen items-center justify-center font-serif text-2xl" data-testid="page-not-found">
          Not Found
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
