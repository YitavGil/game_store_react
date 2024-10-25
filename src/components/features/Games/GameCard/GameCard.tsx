import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addToCart } from "../../../../store/features/cart/cartSlice";
import { toggleFavorite } from "../../../../store/features/user/userSlice";
import { StarRating } from "../../Rating/StarRating/StarRating";
import { Button } from "../../../common/Button/Button";
import { Game } from "../../../../types/game.types";
import { PlatformIcons } from "../PlatformIcons/PlatformIcons";
import styles from "./GameCard.module.css";
import classNames from "classnames";

interface GameCardProps {
  game: Game;
  className?: string;
}

export const GameCard: React.FC<GameCardProps> = ({ game, className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const favorites = useAppSelector((state) => state.user.favorites);
  const isFavorite = favorites.includes(game.id);

  const handleNavigate = () => {
    navigate(`/game/${game.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(game));
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(game.id));
  };

  // Calculate discount and final price (this could come from an API in real world)
  const discount = game.rating > 4 ? 20 : game.rating > 3 ? 10 : 0;
  const finalPrice = game.price * (1 - discount / 100);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={game.background_image}
          alt={game.name}
          className={classNames(styles.image, {
            [styles.loaded]: isImageLoaded,
          })}
          onLoad={() => setIsImageLoaded(true)}
        />
        <button
          className={styles.favoriteButton}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={styles.heartIcon}>{isFavorite ? "❤️" : "🤍"}</span>
        </button>
        {discount > 0 && (
          <div className={styles.discountBadge}>-{discount}%</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{game.name}</h3>
          <div className={styles.rating}>
            <StarRating
              value={game.rating}
              readOnly
              size="small"
              showValue={false}
            />
            <span className={styles.ratingValue}>{game.rating.toFixed(1)}</span>
          </div>
        </div>

        <PlatformIcons platforms={game.platforms || []} />

        <div className={styles.genres}>
          {game.genres?.slice(0, 3).map((genre) => (
            <span key={genre.id} className={styles.genre}>
              {genre.name}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            {discount > 0 && (
              <span className={styles.originalPrice}>
                ${game.price.toFixed(2)}
              </span>
            )}
            <span className={styles.price}>${finalPrice.toFixed(2)}</span>
          </div>

          <div className={styles.actions}>
            <Button
              variant="outline"
              size="small"
              onClick={handleNavigate}
              className={styles.detailsButton}
            >
              Details
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleAddToCart}
              className={styles.cartButton}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for platform icons (could be moved to utils)
const getPlatformIcon = (platform: string): string => {
  const platformIcons: { [key: string]: string } = {
    PlayStation: "🎮",
    Xbox: "🟩",
    PC: "💻",
    Nintendo: "🎲",
    iOS: "📱",
    Android: "📱",
  };

  for (const [key, icon] of Object.entries(platformIcons)) {
    if (platform.includes(key)) return icon;
  }
  return "🎮";
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
