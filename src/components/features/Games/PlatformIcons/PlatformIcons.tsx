// src/components/features/Games/PlatformIcons/PlatformIcons.tsx
import React from 'react';
import CIcon from '@coreui/icons-react';
import { 
  cibNintendo, 
  cibXbox, 
  cibPlaystation, 
  cibWindows
} from '@coreui/icons';
import styles from './PlatformIcons.module.css';

interface PlatformIconsProps {
  platforms: Array<{
    platform: {
      name: string;
      id: number;
    }
  }>;
}

export const PlatformIcons: React.FC<PlatformIconsProps> = ({ platforms }) => {
  const getPlatformDetails = (platformName: string) => {
    const name = platformName.toLowerCase();
    
    if (name.includes('playstation')) {
      return {
        icon: cibPlaystation,
        color: '#006FCD', // PlayStation Blue
      };
    }
    if (name.includes('xbox')) {
      return {
        icon: cibXbox,
        color: '#107C10', // Xbox Green
      };
    }
    if (name.includes('pc') || name.includes('windows')) {
      return {
        icon: cibWindows,
        color: '#00A4EF', // Windows Blue
      };
    }
    if (name.includes('nintendo')) {
      return {
        icon: cibNintendo,
        color: '#E60012', // Nintendo Red
      };
    }
    return null;
  };

  const uniquePlatforms = platforms.reduce((acc, { platform }) => {
    const details = getPlatformDetails(platform.name);
    if (details) {
      const key = platform.name.toLowerCase().split(' ')[0];
      if (!acc.has(key)) {
        acc.set(key, details);
      }
    }
    return acc;
  }, new Map());

  return (
    <div className={styles.platforms}>
      {Array.from(uniquePlatforms.entries()).map(([key, details]) => (
        <div key={key} className={styles.platformIcon}>
          <CIcon 
            icon={details.icon}
            width={24}
            height={24}
            customClassName={styles.icon}
            style={{
              color: details.color,
              fill: details.color
            }}
          />
        </div>
      ))}
    </div>
  );
};