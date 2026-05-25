import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
import { Review } from "@/data/products";
import { MessageSquare, Send } from "lucide-react";

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  avgRating: number;
  onAddReview: (productId: string, review: Omit<Review, "id">) => void;
}

export function ReviewSection({ productId, reviews, avgRating, onAddReview }: ReviewSectionProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || !text.trim()) return;
    onAddReview(productId, {
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    });
    setName("");
    setRating(0);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mt-10" data-testid="review-section">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3
          className="text-xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Reviews & Ratings
        </h3>
      </div>

      {/* Average rating summary */}
      <div className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border mb-6">
        <div className="text-center">
          <div
            className="text-5xl font-bold text-primary"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="avg-rating-display"
          >
            {avgRating.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">out of 5</div>
        </div>
        <div>
          <StarRating rating={Math.round(avgRating)} className="mb-1" />
          <div className="text-sm text-muted-foreground">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</div>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4 mb-8">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No reviews yet. Be the first to write one!
          </div>
        ) : (
          reviews.map(review => (
            <div
              key={review.id}
              className="p-4 bg-card rounded-xl border border-border"
              data-testid={`review-item-${review.id}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="font-semibold text-foreground text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.date}</div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Write a review */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h4
          className="text-base font-bold text-foreground mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Write a Review
        </h4>

        {submitted && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Thank you for your review! It has been added.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" data-testid="review-form">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block" htmlFor="review-name">
              Your Name
            </label>
            <Input
              id="review-name"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              data-testid="review-name-input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Rating
            </label>
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              className="scale-125 origin-left"
            />
            {rating === 0 && (
              <p className="text-xs text-muted-foreground mt-1">Click a star to rate</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block" htmlFor="review-text">
              Your Review
            </label>
            <Textarea
              id="review-text"
              placeholder="Share your experience with this product..."
              value={text}
              onChange={e => setText(e.target.value)}
              required
              rows={3}
              data-testid="review-text-input"
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || rating === 0 || !text.trim()}
            className="w-full sm:w-auto"
            data-testid="review-submit-btn"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
}
