"use client";

import { useState, useRef, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import DraftKingsLogo from './components/DraftKingsLogo';

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
  const [query, setQuery] = useState("");
  const [initialQuery, setInitialQuery] = useState("");
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [response, setResponse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
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
  
  // New state for conversation history
  const [conversationHistory, setConversationHistory] = useState<Array<{
    question: string;
    answer: string;
    isTyping: boolean;
    id: number;
  }>>([]);

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

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    setSearchPlaceholder(category === selectedCategory 
      ? "Ask a question about DraftKings..." 
      : `Ask a question about ${category}...`);
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
      // Store the current question
      setCurrentQuestion(currentQuery);
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
        
        // Add to conversation history
        setConversationHistory([{
          question: currentQuery,
          answer: data.response,
          isTyping: false,
          id: 0
        }]);
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
    if (isDoneTyping && response) {
      setShowArticles(true);
    }
  }, [isDoneTyping, response]);

  // After typing is done, apply bold formatting
  useEffect(() => {
    if (isDoneTyping && response && typeAnimationRef.current) {
      typeAnimationRef.current.innerHTML = formattedResponse;
    }
  }, [isDoneTyping, response, formattedResponse]);

  // Reset the application to initial state
  const handleReset = () => {
    setInitialQuery("");
    setFollowUpQuery("");
    setResponse("");
    setFormattedResponse("");
    setCurrentQuestion("");
    setIsDoneTyping(false);
    setShowArticles(false);
    setIsLoading(false);
    setSelectedCategory("");
    setSearchPlaceholder("Ask a question about DraftKings...");
    setConversationHistory([]);
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
          <div className="logo">
            <DraftKingsLogo width={200} height={50} />
          </div>
          
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
            gap: '12px',
            width: '100%'
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
                    padding: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '44px',
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

          {/* Featured articles for selected category */}
          {selectedCategory && (
            <div className="featured-articles">
              <div className="featured-articles-title">Featured {selectedCategory} Articles</div>
              {renderArticleLinks(featuredArticlesByCategory[selectedCategory] || [])}
            </div>
          )}
        </div>
      ) : (
        <div className="response-page">
          <div className="logo-centered">
            <DraftKingsLogo width={150} height={38} />
            <button 
              onClick={handleReset} 
              className="reset-button"
              aria-label="Reset conversation"
            >
              New Search
            </button>
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
                      <TypeAnimation
                        sequence={[
                          item.answer,
                          () => setIsDoneTyping(true),
                        ]}
                        wrapper="div"
                        cursor={false}
                        speed={75}
                        style={{ whiteSpace: 'pre-wrap' }}
                      />
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
