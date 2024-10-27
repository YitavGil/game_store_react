import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchGameDetails } from "../../store/features/games/gamesSlice";
import { GameDetailsHero } from "../../components/features/Games/GameDetails/GameDetailsHero/GameDetailsHero";
import { GameDetailsContent } from "../../components/features/Games/GameDetails/GameDetailsContent/GameDetailsContent";
import { GameMediaGallery } from "../../components/features/Games/GameDetails/GameMediaGallery/GameMediaGallery";
import { Loader } from "../../components/common/Loader/Loader";
import styles from "./GameDetailsPage.module.css";
import { SimilarGames } from "../../components/features/Games/GameDetails/SimilarGames/SimilarGames";
import { GameComments } from "../../components/features/Games/GameDetails/GameComments/GameComments";

export const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const {
    selectedGame: game,
    loading,
    error,
  } = useAppSelector((state) => state.games);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        dispatch(fetchGameDetails(numericId));
      }
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error Loading Game</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className={styles.errorContainer}>
        <h2>Game Not Found</h2>
        <p>Sorry, we couldn't find the game you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <GameDetailsHero game={game} />
      <GameDetailsContent game={game} />
      {game.screenshots && game.screenshots.length > 0 && (
        <GameMediaGallery screenshots={game.screenshots} gameName={game.name} />
      )}
      {game.similar_games && game.similar_games.length > 0 && (
        <SimilarGames games={game.similar_games} currentGameId={game.id} />
      )}

      <GameComments gameId={game.id} />
    </div>
  );
};
