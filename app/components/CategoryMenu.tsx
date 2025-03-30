import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type SubCategory = {
  id: number;
  title: string;
  url: string;
};

export type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  subcategories?: SubCategory[] | null;
};

type CategoryMenuProps = {
  selectedCategory: string;
  articles: Article[];
  onClose: () => void;
};

const CategoryMenu = ({ selectedCategory, articles, onClose }: CategoryMenuProps) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Reset selectedArticle when category changes
  useEffect(() => {
    setSelectedArticle(null);
  }, [selectedCategory]);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Navigate to the selected article's URL
  const handleSubcategoryClick = (url: string) => {
    window.open(url, '_blank');
    onClose();
  };

  // Go back to category selection
  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="category-menu-container" ref={menuRef}>
      <div className="category-menu-header">
        {selectedArticle ? (
          <div className="breadcrumb">
            <span className="category-name">{selectedCategory}</span>
            <span className="breadcrumb-separator"> &gt; </span>
            <span className="article-name">{selectedArticle.title}</span>
          </div>
        ) : (
          <span>{selectedCategory}</span>
        )}
        <button className="menu-close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="category-menu-content">
        {!selectedArticle ? (
          // First level menu - Articles list
          <div className="articles-list fullwidth">
            {articles.map((article) => (
              <div 
                key={article.id}
                className="article-item"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-item-title">{article.title}</div>
                {article.description && (
                  <div className="article-item-description">{article.description}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Second level menu - Subcategories
          <div className="subcategories-list fullwidth">
            <div className="subcategories-header">
              <h4>{selectedArticle.title}</h4>
              <button className="back-button" onClick={handleBackClick}>Back</button>
            </div>
            
            {selectedArticle.subcategories ? (
              <div className="subcategory-items">
                {selectedArticle.subcategories.map((subcategory) => (
                  <div 
                    key={subcategory.id} 
                    className="subcategory-item"
                  >
                    <div className="subcategory-content">
                      <span className="subcategory-title">{subcategory.title}</span>
                      <button 
                        className="view-article-button" 
                        onClick={() => handleSubcategoryClick(subcategory.url)}
                      >
                        View Article
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="article-direct-link"
                onClick={() => handleSubcategoryClick(selectedArticle.url)}
              >
                View Article
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu; 