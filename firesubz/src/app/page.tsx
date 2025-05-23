"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Head from "next/head";
import { useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import LinkNext from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import * as motion from "motion/react-client"
import {
  MonitorIcon,
  CreditCardIcon,
  LineChartIcon,
  CheckCircleIcon,
  SettingsIcon,
  UserIcon
} from "lucide-react";
import { Link } from "react-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";


import { Button, buttonVariants } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import {

  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



export default function HomePage() {
  const autoplayOptions = useMemo(() => ({ delay: 3000, stopOnInteraction: false }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay(autoplayOptions)])

  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Subscription Tracker </title>
        <meta name="description" content="Effortlessly manage, track, and analyze your subscriptions with our subscription management tool. Never miss a payment or renewal again." />
      </Head>
      <main className="bg-gray-100 min-h-screen">
        {/* Header Section */}

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}



          transition={{ duration: 0.5 }}
          className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <LinkNext href="/dashboard" className="text-blue-500 hover:text-blue-700">
              <H1>Subscription Tracker</H1>
            </LinkNext>
            <Link
              to="faq-section"
              smooth={true}
              duration={500}
              offset={-80}
              easing="easeInOutQuad"
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              FAQ
            </Link>

          </div>
          {/* Avatar or Login Button */}

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={session.user?.image || ""}
                    alt="Profile picture"
                  />
                  <AvatarFallback>{session.user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LinkNext href="/dashboard/profile"> <UserIcon className="mr-2 h-4 w-4" /> Profile</LinkNext>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LinkNext href="/dashboard/settings"><SettingsIcon className="mr-2 h-4 w-4" /> Settings</LinkNext>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Login</Button>
          )}
        </motion.header>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-10">



          <section className="bg-white py-20 px-4 text-center ">
            <div className="container mx-auto max-w-4xl">
              <H1 className="text-5xl font-bold text-gray-900 mb-4">
                Manage Your Subscriptions Effortlessly
              </H1>
              <p className="text-xl text-gray-600 mb-8">
                Take control of your recurring payments. Our subscription tracker
                helps you manage, track, and analyze your subscriptions with ease.
              </p>
              <LinkNext href="/dashboard">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Start Tracking Today
                </Button>
              </LinkNext>
            </div>
          </section>

          <section className="bg-gray-100 py-16 px-4 ">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Manage Subscriptions */}
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                  <MonitorIcon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    Effortless Subscription Management
                  </h3>
                  <p className="text-gray-600 text-center ">
                    Keep all your subscriptions organized in one convenient place.
                  </p>
                </div>

                {/* Track Payments */}
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                  <CreditCardIcon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    Automated Payment Tracking
                  </h3>
                  <p className="text-gray-600 text-center">
                    Never miss a payment with automatic reminders and clear payment
                    histories.
                  </p>
                </div>

                {/* Analyze Spending */}

                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                  <LineChartIcon className="h-10 w-10 text-blue-500 mb-4" />

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Subscription Spending Insights
                  </h3>
                  <p className="text-gray-600">
                    Gain valuable insights into your subscription spending habits.
                  </p>
                </div>
              </div>

            </div>
          </section>


          <section className="bg-gray-50 py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                What Our Users Say
              </h2>
              <Carousel
                opts={{ loop: true }}
                ref={emblaRef}
              >
                <CarouselContent className="-ml-4 pb-2"
                >

                  <CarouselItem className="md:basis-1/3 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-700 mb-4">
                        "Subscription Tracker has completely transformed how I manage my
                        subscriptions. It's intuitive, and I love the reminders!"
                      </p>
                      <div className="text-sm font-semibold text-gray-800">
                        - Jane Doe, Tech Enthusiast
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/3 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-700 mb-4">
                        "I used to lose track of my subscriptions all the time. Now,
                        everything is in one place, and I'm saving money!"
                      </p>
                      <div className="text-sm font-semibold text-gray-800">
                        - John Smith, Budget Saver
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/3 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-700 mb-4">
                        "The insights into my spending are incredibly helpful. I've
                        identified areas where I can cut back!"
                      </p>
                      <div className="text-sm font-semibold text-gray-800">
                        - Alice Johnson, Finance Manager
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/3 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-700 mb-4">
                        "I've never been so organized with my subscriptions. This app is a lifesaver!"
                      </p>
                      <div className="text-sm font-semibold text-gray-800">
                        - Mark Wilson, Project Manager
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/3 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-700 mb-4">
                        "Finally, a tool that actually makes managing subscriptions easy and stress-free!"
                      </p>
                      <div className="text-sm font-semibold text-gray-800">
                        - Emily Davis, Freelancer
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>

              </Carousel>
            </div>
          </section>


          <section className="bg-gray-100 py-16 px-4 ">
            <div className="container mx-auto text-center max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unlock More Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md"><p className="text-gray-700">Customizable categories for organizing subscriptions.</p></div><div className="bg-white p-4 rounded-lg shadow-md"><p className="text-gray-700">Clear overviews of upcoming renewals and cancellations.</p></div>
              </div>
            </div>
          </section>
        </motion.div>

        <section id="faq-section" className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="max-w-4xl mx-auto">


              <AccordionItem value="item-1">
                <AccordionTrigger>What is Subscription Tracker?</AccordionTrigger>
                <AccordionContent>
                  Subscription Tracker is a tool that helps you manage, track, and analyze all your subscriptions in one place.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does Subscription Tracker help me save money?</AccordionTrigger>
                <AccordionContent>
                  By centralizing your subscriptions, we make it easy to identify unused services and avoid unwanted charges.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use industry-standard security measures to protect your payment information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I customize my subscription list?</AccordionTrigger>
                <AccordionContent>Yes, you can customize your list by adding, removing, or editing your subscriptions.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>


        </section>

        <footer className="bg-gray-200 py-6 px-4 text-center mt-20">
          <div className="container mx-auto">
            <div className="flex justify-center space-x-4 mb-2">

              <LinkNext href="/pricing" className={buttonVariants({ variant: "link", size: "default" })}>
                Pricing
              </LinkNext>
            </div>
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Subscription Tracker. All rights reserved.
            </div>
          </div>
        </footer>

      </main >
    </>
  )
}




