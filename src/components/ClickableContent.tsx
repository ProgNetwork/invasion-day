import { useRef, useEffect } from 'react';

interface ClickableContentProps {
  content: string;
  onImageClick: (imageUrl: string) => void;
  className?: string;
  imageUrlMap?: Record<string, string>; // Maps thumbnail URLs to full-size URLs
}

export default function ClickableContent({ content, onImageClick, className = '', imageUrlMap = {} }: ClickableContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all images in the content and add click handlers
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((img) => {
      img.style.cursor = 'pointer';
      img.classList.add('hover:opacity-90', 'transition-opacity', 'rounded-lg');
      
      // Add a subtle border on hover
      img.addEventListener('mouseenter', handleMouseEnter);
      img.addEventListener('mouseleave', handleMouseLeave);
      
      // Remove existing click listeners to avoid duplicates
      img.removeEventListener('click', handleImageClick);
      img.addEventListener('click', handleImageClick, { capture: true });
      
      // Also prevent any default link behavior
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }, { capture: true });
      
      // Remove any existing onclick attributes that might cause navigation
      if (img.hasAttribute('onclick')) {
        img.removeAttribute('onclick');
      }
      
      // If the image is wrapped in an anchor tag, prevent the anchor from working
      const parentAnchor = img.closest('a');
      if (parentAnchor) {
        parentAnchor.style.pointerEvents = 'none';
        // Re-enable pointer events for the image itself
        img.style.pointerEvents = 'auto';
        
        // Also remove any href or onclick from the parent anchor
        if (parentAnchor.hasAttribute('href')) {
          parentAnchor.removeAttribute('href');
        }
        if (parentAnchor.hasAttribute('onclick')) {
          parentAnchor.removeAttribute('onclick');
        }
      }
    });

    // Cleanup function
    return () => {
      images.forEach((img) => {
        img.removeEventListener('click', handleImageClick);
        img.removeEventListener('mouseenter', handleMouseEnter);
        img.removeEventListener('mouseleave', handleMouseLeave);
        
        // Restore parent anchor pointer events
        const parentAnchor = img.closest('a');
        if (parentAnchor) {
          parentAnchor.style.pointerEvents = 'auto';
        }
      });
    };
  }, [content]);

  const handleImageClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const target = event.target as HTMLImageElement;
    if (target.src) {
      // Use the full-size URL if available, otherwise fall back to the thumbnail URL
      const fullSizeUrl = imageUrlMap[target.src] || target.src;
      onImageClick(fullSizeUrl);
    }
  };

  const handleMouseEnter = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.3)';
  };

  const handleMouseLeave = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.style.boxShadow = 'none';
  };

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
