import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxStars = 5,
  className = "",
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        
        return (
          <button
            key={i}
            type={interactive ? "button" : "button"}
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starValue)}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
            aria-label={`Rate ${starValue} stars`}
            data-testid={`star-${starValue}`}
          >
            <Star
              className={`w-4 h-4 ${
                isFilled
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}