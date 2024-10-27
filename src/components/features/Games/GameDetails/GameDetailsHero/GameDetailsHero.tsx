import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addToCart } from '../../../../../store/features/cart/cartSlice';
import { toggleFavorite } from '../../../../../store/features/user/userSlice';
import { StarRating } from '../../../Rating/StarRating/StarRating';
import { Button } from '../../../../common/Button/Button';
import { PlatformIcons } from '../../PlatformIcons/PlatformIcons';
import { Game } from '../../../../../types/game.types';
import styles from './GameDetailsHero.module.css';
import classNames from 'classnames';

interface GameDetailsHeroProps {
  game: Game;
}

export const GameDetailsHero: React.FC<GameDetailsHeroProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.user.favorites);
  const isFavorite = favorites.includes(game.id);

  const handleAddToCart = () => {
    dispatch(addToCart(game));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(game.id));
  };

  const discount = game.rating > 4 ? 20 : game.rating > 3 ? 10 : 0;
  const finalPrice = game.price * (1 - discount / 100);

  return (
    <div className={styles.hero}>
      <div className={styles.backdrop} style={{ backgroundImage: `url(${game.background_image})` }}>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{game.name}</h1>
            <button
              className={styles.favoriteButton}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <span className={styles.heartIcon}>{isFavorite ? "❤️" : "🤍"}</span>
            </button>
          </div>

          <div className={styles.metadata}>
            <div className={styles.rating}>
              <StarRating value={game.rating} readOnly size="large" showValue={false} />
              <span className={styles.ratingValue}>{game.rating.toFixed(1)}</span>
            </div>

            <div className={styles.platformsContainer}>
              <PlatformIcons platforms={game.platforms || []} />
            </div>

            <div className={styles.releaseDate}>
              Released: {new Date(game.released).toLocaleDateString()}
            </div>
          </div>

          <div className={styles.genres}>
            {game.genres?.map((genre) => (
              <span key={genre.id} className={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            {discount > 0 && (
              <div className={styles.discount}>-{discount}% OFF</div>
            )}
            {discount > 0 && (
              <span className={styles.originalPrice}>${game.price.toFixed(2)}</span>
            )}
            <span className={styles.finalPrice}>${finalPrice.toFixed(2)}</span>
          </div>

          <Button
            variant="primary"
            size="large"
            onClick={handleAddToCart}
            className={styles.addToCartButton}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};