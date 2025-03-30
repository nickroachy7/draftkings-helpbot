"use client";

import { useState, useRef, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import DraftKingsLogo from './components/DraftKingsLogo';
import CategoryMenu, { Article, SubCategory } from './components/CategoryMenu';

// Define categories
const categories = [
  "SPORTSBOOK",
  "CASINO",
  "FANTASY SPORTS",
  "PICK6",
  "ACCOUNT",
  "DEPOSIT & WITHDRAWALS",
  "REWARDS & PROMOTIONS",
  "RESPONSIBLE GAMING"
];

// Define featured articles by category
const featuredArticlesByCategory: Record<string, Array<{ id: number, title: string, description: string, url: string }>> = {
  "SPORTSBOOK": [
    {
      id: 1,
      title: "How to Place a Bet",
      description: "Learn the basics of placing bets on DraftKings Sportsbook",
      url: "https://help.draftkings.com/hc/en-us/articles/4405227144467-How-do-I-place-a-bet-",
    },
    {
      id: 2,
      title: "Understanding Betting Odds",
      description: "A complete guide to odds formats and what they mean",
      url: "https://help.draftkings.com/hc/en-us/articles/4405234358291-How-do-I-read-betting-odds-",
    },
    {
      id: 3,
      title: "Parlays Explained",
      description: "Everything you need to know about parlay bets",
      url: "https://help.draftkings.com/hc/en-us/articles/4405227361939-What-is-a-parlay-bet-",
    },
  ],
  "CASINO": [
    {
      id: 1,
      title: "Getting Started with DraftKings Casino",
      description: "A beginner's guide to playing casino games",
      url: "https://help.draftkings.com/hc/en-us/articles/4405230214803-Getting-Started-with-DraftKings-Casino",
    },
    {
      id: 2,
      title: "How to Play Blackjack",
      description: "Rules and strategies for playing blackjack on DraftKings",
      url: "https://help.draftkings.com/hc/en-us/articles/4405230308243-How-do-I-play-Blackjack-",
    },
    {
      id: 3,
      title: "Online Slots Guide",
      description: "Tips and information about playing slots",
      url: "https://help.draftkings.com/hc/en-us/articles/4405230440979-How-do-slot-games-work-",
    },
  ],
  "FANTASY SPORTS": [
    {
      id: 1,
      title: "Creating Your First Lineup",
      description: "Step-by-step guide to building a DFS lineup",
      url: "https://help.draftkings.com/hc/en-us/articles/4405232709267-How-do-I-create-a-lineup-",
    },
    {
      id: 2,
      title: "Fantasy Scoring Explained",
      description: "Learn how points are calculated in DraftKings DFS",
      url: "https://help.draftkings.com/hc/en-us/articles/4405232693139-How-is-DFS-scoring-calculated-",
    },
    {
      id: 3,
      title: "Contest Types Overview",
      description: "Differences between GPPs, 50/50s, and other contest formats",
      url: "https://help.draftkings.com/hc/en-us/articles/4405232775571-What-are-the-different-types-of-contests-",
    },
  ],
  "PICK6": [
    {
      id: 1,
      title: "Getting Started with Pick6",
      description: "Learn the basics of DraftKings Pick6 contests",
      url: "https://help.draftkings.com/hc/en-us/articles/13560400421395-Pick6-Getting-Started-Guide",
    },
    {
      id: 2,
      title: "How to Make Picks",
      description: "Step-by-step guide to making predictions in Pick6",
      url: "https://help.draftkings.com/hc/en-us/articles/13560389584531-How-to-Make-Picks-in-Pick6",
    },
    {
      id: 3,
      title: "Pick6 Scoring System",
      description: "Understanding how points are awarded in Pick6",
      url: "https://help.draftkings.com/hc/en-us/articles/13560397276691-Pick6-Scoring-System",
    },
  ],
  "ACCOUNT": [
    {
      id: 1,
      title: "Account Verification Process",
      description: "Learn how to verify your DraftKings account",
      url: "https://help.draftkings.com/hc/en-us/articles/4405196114579-How-do-I-verify-my-DraftKings-account-",
    },
    {
      id: 2,
      title: "Updating Your Account Information",
      description: "How to change personal details on your account",
      url: "https://help.draftkings.com/hc/en-us/articles/4405203865107-How-do-I-update-my-account-information-",
    },
    {
      id: 3,
      title: "Account Security Best Practices",
      description: "Tips to keep your DraftKings account secure",
      url: "https://help.draftkings.com/hc/en-us/articles/4405203927443-How-can-I-keep-my-account-secure-",
    },
  ],
  "DEPOSIT & WITHDRAWALS": [
    {
      id: 1,
      title: "How to Make a Deposit",
      description: "Learn how to deposit funds to your DraftKings account",
      url: "https://help.draftkings.com/hc/en-us/articles/4405196146963-How-do-I-deposit-funds-into-my-DraftKings-account-",
    },
    {
      id: 2,
      title: "Withdrawal Process Explained",
      description: "Step-by-step guide to withdraw your winnings",
      url: "https://help.draftkings.com/hc/en-us/articles/4405196661779-How-do-I-withdraw-funds-from-my-DraftKings-account-",
    },
    {
      id: 3,
      title: "Payment Methods Overview",
      description: "Available deposit and withdrawal options",
      url: "https://help.draftkings.com/hc/en-us/articles/4405196179475-What-payment-methods-does-DraftKings-accept-",
    },
  ],
  "REWARDS & PROMOTIONS": [
    {
      id: 1,
      title: "DraftKings Dynasty Rewards Program",
      description: "Learn about earning and redeeming Dynasty Rewards",
      url: "https://help.draftkings.com/hc/en-us/articles/4405225271187-What-is-the-DraftKings-Dynasty-Rewards-program-",
    },
    {
      id: 2,
      title: "Current Promotions Guide",
      description: "How to find and claim active promotions",
      url: "https://help.draftkings.com/hc/en-us/articles/4405225288723-How-do-I-find-and-claim-promotions-",
    },
    {
      id: 3,
      title: "Referral Program Details",
      description: "How to refer friends and earn rewards",
      url: "https://help.draftkings.com/hc/en-us/articles/4405225305491-How-does-the-DraftKings-referral-program-work-",
    },
  ],
  "RESPONSIBLE GAMING": [
    {
      id: 1,
      title: "Responsible Gaming Tools",
      description: "Overview of DraftKings' responsible gaming features",
      url: "https://help.draftkings.com/hc/en-us/articles/4405225389843-What-responsible-gaming-tools-does-DraftKings-offer-",
    },
    {
      id: 2,
      title: "Setting Deposit Limits",
      description: "How to set and manage your deposit limits",
      url: "https://help.draftkings.com/hc/en-us/articles/4405225406867-How-do-I-set-deposit-limits-",
    },
    {
      id: 3,
      title: "Self-Exclusion Options",
      description: "Information about temporary and permanent self-exclusion",
      url: "https://help.draftkings.com/hc/en-us/articles/4405225423891-How-do-I-self-exclude-from-DraftKings-",
    },
  ],
};

// Define subcategories for articles
const articlesWithSubcategories: Record<string, Article[]> = {
  "SPORTSBOOK": [
    {
      id: 1,
      title: "Betting Basics",
      description: "Learn how to get started with betting",
      url: "#",
      subcategories: [
        {
          id: 101,
          title: "How to Place a Bet",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227144467-How-do-I-place-a-bet-",
        },
        {
          id: 102,
          title: "Understanding Betting Odds",
          url: "https://help.draftkings.com/hc/en-us/articles/4405234358291-How-do-I-read-betting-odds-",
        },
        {
          id: 103,
          title: "Common Bet Types",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230440979-What-types-of-bets-are-available-"
        },
        {
          id: 104,
          title: "What is a Moneyline Bet?",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227240979-What-is-a-moneyline-bet-",
        },
        {
          id: 105,
          title: "What is a Point Spread?",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227274003-What-is-a-point-spread-bet-",
        },
        {
          id: 106,
          title: "What are Over/Under Bets?",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227308051-What-is-an-over-under-total-bet-",
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Betting",
      description: "Explore more complex betting options",
      url: "#",
      subcategories: [
        {
          id: 201,
          title: "Parlays Explained",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227361939-What-is-a-parlay-bet-",
        },
        {
          id: 202,
          title: "SGP & Same Game Parlays",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227144467-How-do-I-create-a-Same-Game-Parlay-",
        },
        {
          id: 203,
          title: "Teasers & Alternate Lines",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227426323-What-are-alternate-lines-and-teasers-",
        },
        {
          id: 204,
          title: "Round Robins",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227393939-What-is-a-round-robin-bet-",
        },
        {
          id: 205,
          title: "Cash Out Feature",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227341459-How-does-the-Cash-Out-feature-work-",
        }
      ]
    },
    {
      id: 3,
      title: "Live Betting",
      description: "How to bet on games in progress",
      url: "#",
      subcategories: [
        {
          id: 301,
          title: "Getting Started with Live Betting",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227426195-What-is-live-betting-",
        },
        {
          id: 302,
          title: "Live Betting Strategy",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227458323-What-are-some-live-betting-strategies-",
        },
        {
          id: 303,
          title: "Live Betting Markets",
          url: "https://help.draftkings.com/hc/en-us/articles/4405227491091-What-types-of-live-bets-are-available-",
        }
      ]
    }
  ],
  "CASINO": [
    {
      id: 1,
      title: "Casino Games",
      description: "Learn about different casino games",
      url: "#",
      subcategories: [
        {
          id: 101,
          title: "Getting Started with DraftKings Casino",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230214803-Getting-Started-with-DraftKings-Casino",
        },
        {
          id: 102,
          title: "How to Play Blackjack",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230308243-How-do-I-play-Blackjack-",
        },
        {
          id: 103,
          title: "How to Play Roulette",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230522131-How-do-I-play-Roulette-"
        },
        {
          id: 104,
          title: "How to Play Baccarat",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230440723-How-do-I-play-Baccarat-",
        },
        {
          id: 105,
          title: "Video Poker Guide",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230325267-How-do-I-play-Video-Poker-",
        }
      ]
    },
    {
      id: 2,
      title: "Slots Guide",
      description: "Everything about online slots",
      url: "#",
      subcategories: [
        {
          id: 201,
          title: "Online Slots Guide",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230440979-How-do-slot-games-work-",
        },
        {
          id: 202,
          title: "Progressive Jackpots",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230522131-What-are-progressive-jackpots-",
        },
        {
          id: 203,
          title: "Slot Game Features",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230473747-What-are-free-spins-and-bonus-features-in-slots-",
        },
        {
          id: 204,
          title: "Popular Slot Games",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230506771-What-are-the-most-popular-slot-games-",
        }
      ]
    },
    {
      id: 3,
      title: "Live Dealer Games",
      description: "Play with real dealers in real-time",
      url: "#",
      subcategories: [
        {
          id: 301,
          title: "Getting Started with Live Dealer",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230539539-What-are-Live-Dealer-games-",
        },
        {
          id: 302,
          title: "Live Dealer Blackjack",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230556563-How-do-I-play-Live-Dealer-Blackjack-",
        },
        {
          id: 303,
          title: "Live Dealer Roulette",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230573587-How-do-I-play-Live-Dealer-Roulette-",
        },
        {
          id: 304,
          title: "Live Dealer Baccarat",
          url: "https://help.draftkings.com/hc/en-us/articles/4405230590611-How-do-I-play-Live-Dealer-Baccarat-",
        }
      ]
    }
  ],
  "FANTASY SPORTS": [
    {
      id: 1,
      title: "Getting Started with DFS",
      description: "Learn the basics of Daily Fantasy Sports",
      url: "#",
      subcategories: [
        {
          id: 101,
          title: "Creating Your First Lineup",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232709267-How-do-I-create-a-lineup-",
        },
        {
          id: 102,
          title: "Understanding Salary Caps",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232725651-How-does-the-salary-cap-work-",
        },
        {
          id: 103,
          title: "Entering Contests",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232742675-How-do-I-enter-a-contest-",
        },
        {
          id: 104,
          title: "Player Selection Tips",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232759699-What-factors-should-I-consider-when-selecting-players-",
        }
      ]
    },
    {
      id: 2,
      title: "Contest Types",
      description: "Understand different DFS contest formats",
      url: "#",
      subcategories: [
        {
          id: 201,
          title: "Contest Types Overview",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232775571-What-are-the-different-types-of-contests-",
        },
        {
          id: 202,
          title: "Guaranteed Prize Pools (GPPs)",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232792595-What-are-Guaranteed-Prize-Pool-GPP-contests-",
        },
        {
          id: 203,
          title: "50/50s and Double-Ups",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232809619-What-are-50-50s-and-Double-Ups-",
        },
        {
          id: 204,
          title: "Head-to-Head Contests",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232826643-What-are-Head-to-Head-contests-",
        }
      ]
    },
    {
      id: 3,
      title: "Scoring & Strategy",
      description: "Learn how scoring works and develop strategies",
      url: "#",
      subcategories: [
        {
          id: 301,
          title: "Fantasy Scoring Explained",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232693139-How-is-DFS-scoring-calculated-",
        },
        {
          id: 302,
          title: "Bankroll Management",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232843667-What-is-bankroll-management-",
        },
        {
          id: 303,
          title: "Understanding Ownership Percentages",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232860691-What-is-player-ownership-",
        },
        {
          id: 304,
          title: "Game Theory in DFS",
          url: "https://help.draftkings.com/hc/en-us/articles/4405232877715-What-is-game-theory-in-DFS-",
        }
      ]
    }
  ],
  "PICK6": [
    {
      id: 1,
      title: "Getting Started with Pick6",
      description: "Learn the basics of Pick6 contests",
      url: "#",
      subcategories: [
        {
          id: 101,
          title: "Pick6 Getting Started Guide",
          url: "https://help.draftkings.com/hc/en-us/articles/13560400421395-Pick6-Getting-Started-Guide",
        },
        {
          id: 102,
          title: "Pick6 Rules & Format",
          url: "https://help.draftkings.com/hc/en-us/articles/13560391677587-Pick6-Rules-and-Format",
        },
        {
          id: 103,
          title: "Pick6 vs. Traditional DFS",
          url: "https://help.draftkings.com/hc/en-us/articles/13560402321427-Pick6-vs-Traditional-DFS",
        }
      ]
    },
    {
      id: 2,
      title: "Making Picks",
      description: "How to make predictions in Pick6",
      url: "#",
      subcategories: [
        {
          id: 201,
          title: "How to Make Picks",
          url: "https://help.draftkings.com/hc/en-us/articles/13560389584531-How-to-Make-Picks-in-Pick6",
        },
        {
          id: 202,
          title: "Choosing More or Less",
          url: "https://help.draftkings.com/hc/en-us/articles/13560395051667-Choosing-More-or-Less-in-Pick6",
        },
        {
          id: 203,
          title: "Player Projections",
          url: "https://help.draftkings.com/hc/en-us/articles/13560404352019-Understanding-Pick6-Projections",
        }
      ]
    },
    {
      id: 3,
      title: "Scoring & Winning",
      description: "Understanding scoring and prizes",
      url: "#",
      subcategories: [
        {
          id: 301,
          title: "Pick6 Scoring System",
          url: "https://help.draftkings.com/hc/en-us/articles/13560397276691-Pick6-Scoring-System",
        },
        {
          id: 302,
          title: "Winning Strategies",
          url: "https://help.draftkings.com/hc/en-us/articles/13560406367251-Pick6-Winning-Strategies",
        },
        {
          id: 303,
          title: "Prize Structures",
          url: "https://help.draftkings.com/hc/en-us/articles/13560408434067-Pick6-Prize-Structures",
        }
      ]
    }
  ],
  "ACCOUNT": featuredArticlesByCategory["ACCOUNT"].map(article => ({...article, subcategories: null})),
  "DEPOSIT & WITHDRAWALS": featuredArticlesByCategory["DEPOSIT & WITHDRAWALS"].map(article => ({...article, subcategories: null})),
  "REWARDS & PROMOTIONS": featuredArticlesByCategory["REWARDS & PROMOTIONS"].map(article => ({...article, subcategories: null})),
  "RESPONSIBLE GAMING": featuredArticlesByCategory["RESPONSIBLE GAMING"].map(article => ({...article, subcategories: null})),
};

// Sample suggested articles for post-response - in a real app, these would be dynamically generated
const suggestedArticles = [
  {
    id: 1,
    title: "How to Make a Deposit",
    description: "Learn how to deposit funds to your DraftKings account",
    url: "https://help.draftkings.com/hc/en-us/articles/4405196146963-How-do-I-deposit-funds-into-my-DraftKings-account-",
  },
  {
    id: 2,
    title: "Withdrawal Process Explained",
    description: "Step-by-step guide to withdraw your winnings",
    url: "https://help.draftkings.com/hc/en-us/articles/4405196661779-How-do-I-withdraw-funds-from-my-DraftKings-account-",
  },
  {
    id: 3,
    title: "Account Verification Requirements",
    description: "Learn about our verification process and requirements",
    url: "https://help.draftkings.com/hc/en-us/articles/4405196114579-How-do-I-verify-my-DraftKings-account-",
  },
];

export default function Home() {
  // State for the application
  const [initialQuery, setInitialQuery] = useState("");
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [response, setResponse] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Ask a question about DraftKings...");
  const [isLoading, setIsLoading] = useState(false);
  const [isDoneTyping, setIsDoneTyping] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const responseContainerRef = useRef<HTMLDivElement>(null);
  const typeAnimationRef = useRef<HTMLDivElement>(null);
  const [formattedResponse, setFormattedResponse] = useState("");
  const [alwaysSkipAnimation, setAlwaysSkipAnimation] = useState(false);
  const [isResponseStopped, setIsResponseStopped] = useState(false);
  const [partialResponse, setPartialResponse] = useState("");
  const typeAnimationController = useRef<any>(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  
  // New state for conversation history
  const [conversationHistory, setConversationHistory] = useState<Array<{
    question: string;
    answer: string;
    isTyping: boolean;
    id: number;
  }>>([]);

  // Effect to initialize the animation preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const skipAnimationPref = localStorage.getItem('skipAnimation') === 'true';
      setAlwaysSkipAnimation(skipAnimationPref);
    }
  }, []);

  // Handle toggle for animation preference
  const toggleAnimationPreference = () => {
    const newValue = !alwaysSkipAnimation;
    setAlwaysSkipAnimation(newValue);
    localStorage.setItem('skipAnimation', newValue.toString());
  };

  // Handle stopping the response
  const handleStopResponse = () => {
    // Immediately set response as stopped to prevent further typing
    setIsResponseStopped(true);
    
    // Force the typing animation to stop
    if (typeAnimationController.current) {
      typeAnimationController.current.stop();
    }
    
    // Get the currently displayed text
    const typedContent = typeAnimationRef.current?.querySelector('div')?.textContent || '';
    
    // Only process partial response if we have content
    if (typedContent.trim().length > 0) {
      // Find the end of the current sentence
      const sentenceEndIndex = typedContent.search(/[.!?][^.!?]*$/);
      
      let completeResponse = '';
      if (sentenceEndIndex !== -1) {
        // Get the text up to the end of the current sentence
        completeResponse = typedContent.substring(0, sentenceEndIndex + 1);
      } else {
        // If no sentence end found, just use what's typed so far
        completeResponse = typedContent;
      }
      
      // Format the partial response with the follow-up prompt
      const formattedPartial = completeResponse + 
        "\n\n<span class='follow-up-prompt'>For further information, ask a follow-up question.</span>";
      
      setPartialResponse(formattedPartial);
    } else {
      // If there's no content yet, use a default message
      setPartialResponse("<span class='follow-up-prompt'>For information on this topic, please ask a follow-up question.</span>");
    }
    
    // Mark typing as done to show articles
    setIsDoneTyping(true);
  };

  // Handle window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Effect to ensure menu is shown whenever a category is selected
  useEffect(() => {
    if (selectedCategory) {
      setShowCategoryMenu(true);
    } else {
      setShowCategoryMenu(false);
    }
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    // If clicking the same category that's already selected, toggle it off
    if (category === selectedCategory) {
      setSelectedCategory("");
      setSearchPlaceholder("Ask a question about DraftKings...");
      setShowCategoryMenu(false);
    } else {
      // For a different category, force a clear then set
      // First close the current menu before opening a new one to avoid UI issues
      setShowCategoryMenu(false);
      
      // Use setTimeout with 0 delay to ensure the DOM updates before opening the new menu
      setTimeout(() => {
        setSelectedCategory(category);
        setSearchPlaceholder(`Ask a question about ${category}...`);
        setShowCategoryMenu(true);
      }, 10);
    }
  };

  // Close the category menu
  const handleCloseMenu = () => {
    setShowCategoryMenu(false);
    setSelectedCategory(""); // Also deselect the category when closing menu
  };

  // Process the user query
  const handleSubmit = async (e: React.FormEvent, queryType: 'initial' | 'followUp') => {
    e.preventDefault();
    
    // Get the appropriate query based on which form was submitted
    const currentQuery = queryType === 'initial' ? initialQuery : followUpQuery;
    
    if (!currentQuery.trim() || isLoading) return;
    
    setIsLoading(true);
    
    // If this is the initial query, reset everything
    if (queryType === 'initial') {
      setResponse("");
      setFormattedResponse("");
      setIsDoneTyping(false);
      setShowArticles(false);
      setConversationHistory([]);
      setIsResponseStopped(false);
      setPartialResponse("");
    } else {
      // For follow-up queries, add to history with placeholder for answer
      const newEntryId = conversationHistory.length > 0 
        ? Math.max(...conversationHistory.map(item => item.id)) + 1 
        : 1;
      
      setConversationHistory([
        ...conversationHistory,
        {
          question: currentQuery,
          answer: "",
          isTyping: true,
          id: newEntryId
        }
      ]);
    }
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: currentQuery,
          category: selectedCategory // Send category context to the API if selected
        }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }
      
      const data = await res.json();
      
      if (queryType === 'initial') {
        // For initial query, set the main response
        setResponse(data.response);
        
        // Format the response after receiving it
        const formatted = data.response.replace(
          /(Yes|No|Absolutely|Indeed|Correct|That is correct|That's correct|That's right|That is right)([,.] .+?[.!?])/g, 
          '<b>$1$2</b>'
        );
        setFormattedResponse(formatted);
        
        // Add to conversation history - show response immediately
        setConversationHistory([{
          question: currentQuery,
          answer: data.response,
          isTyping: false,
          id: 0
        }]);
        
        // Set isDoneTyping to true to show the formatted response right away if user prefers
        if (alwaysSkipAnimation) {
          setIsDoneTyping(true);
        }
      } else {
        // For follow-up, update the last item in conversation history
        setConversationHistory(prevHistory => {
          const newHistory = [...prevHistory];
          const lastIndex = newHistory.length - 1;
          newHistory[lastIndex] = {
            ...newHistory[lastIndex],
            answer: data.response,
            isTyping: false
          };
          return newHistory;
        });
      }
      
      // Clear the query fields after submission
      if (queryType === 'initial') {
        setInitialQuery("");
      } else {
        setFollowUpQuery("");
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMsg = "Sorry, I encountered an error while searching for your answer. Please try again later.";
      
      if (queryType === 'initial') {
        setResponse(errorMsg);
        setFormattedResponse(errorMsg);
        
        // Add error to conversation history
        setConversationHistory([{
          question: currentQuery,
          answer: errorMsg,
          isTyping: false,
          id: 0
        }]);
      } else {
        // Update the last follow-up with error
        setConversationHistory(prevHistory => {
          const newHistory = [...prevHistory];
          const lastIndex = newHistory.length - 1;
          newHistory[lastIndex] = {
            ...newHistory[lastIndex],
            answer: errorMsg,
            isTyping: false
          };
          return newHistory;
        });
      }
      
      setIsLoading(false);
    }
  };

  // Scroll to bottom of response as typing happens
  useEffect(() => {
    if (responseContainerRef.current && !isDoneTyping) {
      responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
    }
  }, [response, isDoneTyping]);

  // Show suggested articles after typing is complete
  useEffect(() => {
    if ((isDoneTyping || alwaysSkipAnimation) && response) {
      setShowArticles(true);
    }
  }, [isDoneTyping, response, alwaysSkipAnimation]);

  // After typing is done, apply bold formatting
  useEffect(() => {
    if ((isDoneTyping || alwaysSkipAnimation) && response && typeAnimationRef.current) {
      typeAnimationRef.current.innerHTML = formattedResponse;
    }
  }, [isDoneTyping, response, formattedResponse, alwaysSkipAnimation]);

  // Reset the application to initial state
  const handleReset = () => {
    setInitialQuery("");
    setFollowUpQuery("");
    setResponse("");
    setFormattedResponse("");
    setIsDoneTyping(false);
    setShowArticles(false);
    setIsLoading(false);
    setSelectedCategory("");
    setShowCategoryMenu(false);
    setSearchPlaceholder("Ask a question about DraftKings...");
    setConversationHistory([]);
    setIsResponseStopped(false);
    setPartialResponse("");
    typeAnimationController.current = null;
  };

  // Render article links
  const renderArticleLinks = (articles: typeof suggestedArticles) => {
    return articles.map((article) => (
      <a 
        key={article.id}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        <div className="article-title">{article.title}</div>
        <div className="article-description">{article.description}</div>
      </a>
    ));
  };

  return (
    <main className="container">
      {!response ? (
        <div className="search-container">
          <h1 className="help-center-title">DRAFTKINGS HELP CENTER</h1>
          
          <form onSubmit={(e) => handleSubmit(e, 'initial')} className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder={searchPlaceholder}
              value={initialQuery}
              onChange={(e) => setInitialQuery(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading || !initialQuery.trim()}
            >
              Search
            </button>
          </form>

          {/* Category boxes */}
          <div className="categories-container" style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth <= 600 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
            gap: '16px',
            width: '100%',
            margin: '1.5rem auto',
            position: 'relative',
            paddingBottom: '0' // Remove the padding that was pushing content down
          }}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const isHovered = hoveredCategory === category;
              return (
                <div 
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory("")}
                  style={{
                    backgroundColor: isSelected ? 'var(--dk-dark-green)' : isHovered ? 'var(--dk-container-bg)' : 'var(--dk-charcoal)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--dk-light-green)' : 'var(--dk-border)',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '48px',
                    color: isSelected ? 'var(--dk-white)' : 'var(--dk-text)',
                    transition: 'all 0.2s ease',
                    boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transform: isHovered ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {category}
                </div>
              );
            })}
          </div>

          {/* Category Menu - Position it outside the categories container */}
          {showCategoryMenu && selectedCategory && (
            <div className="menu-position-wrapper">
              <CategoryMenu 
                key={`menu-${selectedCategory}`}
                selectedCategory={selectedCategory}
                articles={articlesWithSubcategories[selectedCategory] || []}
                onClose={handleCloseMenu}
              />
            </div>
          )}

          {/* Add content below that will be visible when scrolling past the menu */}
          {showCategoryMenu && (
            <div className="below-menu-content">
              <h2>Popular Help Topics</h2>
              <div className="popular-topics">
                {suggestedArticles.map((article) => (
                  <a 
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-link"
                  >
                    <div className="article-title">{article.title}</div>
                    <div className="article-description">{article.description}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="response-page">
          <div className="reset-button-container">
            <button 
              onClick={handleReset} 
              className="reset-button"
              aria-label="Reset conversation"
            >
              New Search
            </button>
            <div className="settings-container">
              <label htmlFor="skip-animation-toggle" className="settings-label">
                <input
                  id="skip-animation-toggle"
                  type="checkbox"
                  checked={alwaysSkipAnimation}
                  onChange={toggleAnimationPreference}
                  className="settings-checkbox"
                />
                <span className="settings-text">Instant responses</span>
              </label>
            </div>
          </div>
          
          {isLoading && conversationHistory.length === 0 && (
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}

          {/* Conversation History */}
          <div className="conversation-history">
            {conversationHistory.map((item, index) => (
              <div key={item.id} className="conversation-item">
                <div className="question-container">
                  <div className="question-label">{index === 0 ? 'Your question:' : 'Your follow-up:'}</div>
                  <div className="question-text">{item.question}</div>
                </div>

                <div className={`response-container ${item.isTyping ? 'typing' : ''}`} 
                  ref={index === 0 ? responseContainerRef : undefined}>
                  {index === 0 && !item.isTyping ? (
                    <div ref={typeAnimationRef}>
                      {alwaysSkipAnimation ? (
                        <div dangerouslySetInnerHTML={{ __html: formattedResponse }} style={{ whiteSpace: 'pre-wrap' }} />
                      ) : isResponseStopped ? (
                        <div dangerouslySetInnerHTML={{ __html: partialResponse }} style={{ whiteSpace: 'pre-wrap' }} />
                      ) : (
                        <>
                          <TypeAnimation
                            sequence={[
                              item.answer,
                              () => {
                                if (!isResponseStopped) {
                                  setIsDoneTyping(true);
                                }
                              },
                            ]}
                            wrapper="div"
                            cursor={false}
                            speed={{ type: 'keyStrokeDelayInMs', value: 50 }}
                            style={{ whiteSpace: 'pre-wrap' }}
                            ref={typeAnimationController}
                            splitter={(str) => str.split(/(?=[\s])/)} // Split by spaces to improve stopping behavior
                          />
                          <div className="stop-response" onClick={handleStopResponse}>
                            Stop response
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    item.isTyping ? (
                      <div className="loading-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    ) : (
                      <div style={{ whiteSpace: 'pre-wrap' }}>{item.answer}</div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="follow-up-container">
            <form onSubmit={(e) => handleSubmit(e, 'followUp')} className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Ask a follow up question..."
                value={followUpQuery}
                onChange={(e) => setFollowUpQuery(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={isLoading || !followUpQuery.trim()}
              >
                Search
              </button>
            </form>
          </div>

          {showArticles && conversationHistory.length > 0 && (
            <div className="suggested-articles">
              <h3>Suggested Articles:</h3>
              {renderArticleLinks(suggestedArticles)}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
