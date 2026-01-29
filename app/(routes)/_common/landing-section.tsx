"use client"
import React, { useState } from 'react'
import PromptInput from '../../../components/prompt-input'
import { Users, ShoppingCart, Dumbbell, UtensilsCrossed, Music, MapPin } from 'lucide-react'
import { Suggestion, Suggestions } from '../../../components/ai-elements/suggestion'
import Header from './header'

const LandingSection = () => {
    const [promptText, setPromptText] = useState<string>("")
    const suggestions = [
        {
            label: "Social Media App",
            icon: Users,
            value: "Design a modern social media mobile app with a clean feed, profile pages, and messaging interface. Include dark mode support and smooth animations."
        },
        {
            label: "E-commerce App",
            icon: ShoppingCart,
            value: "Create a mobile e-commerce app design with product listings, shopping cart, checkout flow, and order tracking. Focus on intuitive navigation and visual product showcase."
        },
        {
            label: "Fitness App",
            icon: Dumbbell,
            value: "Design a fitness tracking mobile app with workout plans, progress charts, and social features. Include motivational elements and easy-to-use exercise logging."
        },
        {
            label: "Food Delivery App",
            icon: UtensilsCrossed,
            value: "Build a food delivery mobile app with restaurant browsing, menu display, cart management, and real-time order tracking. Make it visually appealing and user-friendly."
        },
        {
            label: "Music Player App",
            icon: Music,
            value: "Design a sleek music streaming mobile app with playlist management, search functionality, and beautiful album art displays. Include offline mode and personalized recommendations."
        },
        {
            label: "Travel App",
            icon: MapPin,
            value: "Create a travel planning mobile app with destination search, itinerary builder, hotel bookings, and local recommendations. Focus on beautiful imagery and easy trip management."
        }
    ];

    const handleSuggestionClick = (val: string) => {
        setPromptText(val);
    };
  return (
    <div className='w-full min-h-screen'>
        <div className='flex flex-col'>
            <Header/>
            <div className='relative overflow-hidden pt-28 pb-20'>
                <div className='max-w-6xl mx-auto flex flex-col items-center justify-center px-4'>
                    <div className='space-y-3 mb-12'>
                        <h1 className='text-center font-semibold text-4xl tracking-tight sm:text-5xl'>
                            Design Mobile Apps <br className='md:hidden'/>
                            <span className='text-primary'>in minutes</span>
                        </h1>
                        <p className='mx-auto max-w-2xl text-center font-medium text-foreground leading-relaxed sm:text-lg'>
                            Go from idea to beautiful app mockups in minutes by chatting with AI.
                        </p>
                    </div>
                    <div className='flex w-full max-w-3xl flex-col items-center gap-8 relative z-50'>
                        <div className='w-full'>
                            <PromptInput
                            className='ring-2 ring-primary'
                            promptText={promptText}
                            setPromptText={setPromptText}
                            isLoading={false}
                            onSubmit={() => {}}
                            />
                        </div>
                        
                        <div className='flex flex-wrap justify-center gap-2 px-5 w-full'>
                            <Suggestions>
                                {suggestions.map((s) => {
                                    const Icon = s.icon;
                                    return (
                                        <Suggestion
                                            key={s.label}
                                            suggestion={s.label}
                                            className='text-xs! h-7! px-2.5 pt-1!'
                                            onClick={() => handleSuggestionClick(s.value)}
                                        >
                                            <Icon className="size-4" />
                                            <span>{s.label}</span>
                                        </Suggestion>
                                    );
                                })}
                            </Suggestions>
                        </div>
                    </div>
                    {/* Background gradient effects */}
                    <div className='absolute -translate-x-1/2 left-1/2 w-[5000px] h-[3000px] top-[70%] -z-10 pointer-events-none'>
                        <div className='absolute -translate-x-1/2 bottom-[calc(100%-300px)] left-1/2 h-[2000px] w-[2000px] opacity-20 bg-radial-primary'></div>
                        <div className='absolute -mt-2.5 size-full rounded-[50%] bg-primary/20 opacity-70 [box-shadow:0_-15px_24.8px_var(--primary)]'></div>
                        <div className='absolute z-0 size-full rounded-[50%] bg-background'></div>
                    </div>
                </div>
            </div>
            <div className='w-full py-10 relative z-10'>
                <div className='mx-auto max-w-3xl px-4'>
                    <div>
                        <h1 className='font-medium text-xl tracking-tight'>
                            Recent Projects
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingSection;