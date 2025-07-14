import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FAVOURITES_STORAGE_KEY = 'gameTracker_favourites';

export const useFavouritesStore = create(
  persist(
    (set, get) => ({
      favourites: [],
      isLoaded: false,
      selectedCategories: {
        0: true,
        2: true,
        4: true,
        8: true,
        9: true,
        10: true,
      },
      favouritesCount: () => get().favourites.length,
      setLoaded: (loaded) => set({ isLoaded: loaded }),
      setSelectedCategories: (categories) => set({ selectedCategories: categories }),
      isFavourite: (gameId) => {
        const { favourites } = get();
        return favourites.some(fav => fav.id === gameId);
      },
      addToFavourites: (game) => {
        if (!game || !game.id) {
          console.error('invalid game object');
          return;
        }

        const { favourites } = get();
        const alreadyExists = favourites.some(fav => fav.id === game.id);
        
        if (alreadyExists) {
          return;
        }

        const gameWithTimestamp = {
          ...game,
          favouritedAt: new Date().toISOString(),
          customOrder: favourites.length
        };

        set({ favourites: [...favourites, gameWithTimestamp] });
      },

      removeFromFavourites: (gameId) => {
        const { favourites } = get();
        const newFavourites = favourites.filter(fav => fav.id !== gameId);
        set({ favourites: newFavourites });
      },

      toggleFavourite: (game) => {
        if (!game || !game.id) {
          console.error('invalid game object');
          return;
        }

        const { isFavourite, addToFavourites, removeFromFavourites } = get();
        const isCurrentlyFavourite = isFavourite(game.id);

        if (isCurrentlyFavourite) {
          removeFromFavourites(game.id);
        } else {
          addToFavourites(game);
        }
      },

      reorderFavourites: (dragIndex, hoverIndex) => {
        const { favourites } = get();
        const newFavourites = [...favourites];
        const draggedItem = newFavourites[dragIndex];
        
        newFavourites.splice(dragIndex, 1);
        newFavourites.splice(hoverIndex, 0, draggedItem);
        
        const reordered = newFavourites.map((item, index) => ({
          ...item,
          customOrder: index
        }));

        set({ favourites: reordered });
      },

      moveToPosition: (gameId, newPosition) => {
        const { favourites } = get();
        const currentIndex = favourites.findIndex(fav => fav.id === gameId);
        if (currentIndex === -1) return;
        
        const newFavourites = [...favourites];
        const item = newFavourites.splice(currentIndex, 1)[0];
        newFavourites.splice(newPosition, 0, item);
        
        const reordered = newFavourites.map((item, index) => ({
          ...item,
          customOrder: index
        }));

        set({ favourites: reordered });
      },

      exportFavourites: () => {
        try {
          const { favourites } = get();

          const gameIds = favourites.map(fav => parseInt(fav.id));
          const jsonString = JSON.stringify(gameIds);
          const base64String = btoa(jsonString);
          
          return {
            success: true,
            data: base64String,
            count: gameIds.length
          };
        } catch (error) {
          console.error('Error exporting favourites:', error);
          return {
            success: false,
            error: error.message
          };
        }
      },

      decodeShared: (base64String) => {
        try {
          const jsonString = atob(base64String);          
          const gameIds = JSON.parse(jsonString);

          if (!Array.isArray(gameIds)) {
            throw new Error('invalid data format: expected an array');
          }
          
          return {
            success: true,
            data: gameIds,
            count: gameIds.length
          };
        } catch (error) {
          console.error('error importing favourites:', error);
          return {
            success: false,
            error: error.message
          };
        }
      },

      clearFavourites: () => {
        set({ favourites: [] });
      },

      getFavouritesSorted: (sortBy = 'custom') => {
        const { favourites } = get();
        const favs = [...favourites];
        
        switch (sortBy) {
          case 'custom':
            return favs.sort((a, b) => (a.customOrder || 0) - (b.customOrder || 0));
          case 'recent':
            return favs.sort((a, b) => new Date(b.favouritedAt) - new Date(a.favouritedAt));
          case 'name':
            return favs.sort((a, b) => a.name.localeCompare(b.name));
          case 'rating':
            return favs.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          case 'release':
            return favs.sort((a, b) => (b.first_release_date || 0) - (a.first_release_date || 0));
          default:
            return favs;
        }
      },
    }),
    {
      name: FAVOURITES_STORAGE_KEY,
      storage: {
        getItem: (name) => {
          try {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error('error loading from storage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('error saving to storage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('error removing from storage:', error);
          }
        },
      },
      partialize: (state) => ({ 
        favourites: state.favourites,
        selectedCategories: state.selectedCategories
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded(true);
        }
      },
    }
  )
);

export const useFavourites = () => {
  const store = useFavouritesStore();
  return {
    favourites: store.favourites,
    favouritesCount: store.favourites.length,
    isFavourite: store.isFavourite,
    addToFavourites: store.addToFavourites,
    removeFromFavourites: store.removeFromFavourites,
    toggleFavourite: store.toggleFavourite,
    reorderFavourites: store.reorderFavourites,
    moveToPosition: store.moveToPosition,
    clearFavourites: store.clearFavourites,
    getFavouritesSorted: store.getFavouritesSorted,
    exportFavourites: store.exportFavourites,
    decodeShared: store.decodeShared,
    isLoaded: store.isLoaded,
    selectedCategories: store.selectedCategories,
    setSelectedCategories: store.setSelectedCategories
  };
};

export default useFavourites;