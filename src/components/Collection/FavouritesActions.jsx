import React, {useEffect, useState} from 'react';

import { useFavourites } from '../../stores/FavouritesStore';

import Typography from '../ui/Typography';
import Input from '../ui/Input';
import Button from '../ui/Button';

const FavouritesActions = () => {
  const [shareCode, setShareCode] = useState('');
  const [shareCodeLoading, setShareCodeLoading] = useState(true);

  const { 
    favourites, 
    favouritesCount,
    exportFavourites,
  } = useFavourites();

  useEffect(() => {
    setShareCodeLoading(true);
    const result = exportFavourites();
    if (result.success) {
      setShareCode(result.data);
    } else {
      console.error('export failed:', result.error);
    }
    setShareCodeLoading(false);
  }, [favourites]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Input 
        label="Share Link"
        value={`https://gamecab.net/collection?share=${shareCode}`}
        loading={shareCodeLoading}
        readOnly
        isCopy
      />
    </div>
  );
};

export default FavouritesActions;