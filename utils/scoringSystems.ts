
import { Sport, ScoringSystem } from '@/types';

export const SCORING_SYSTEMS: Record<Sport, ScoringSystem> = {
  calcio: {
    sport: 'calcio',
    winPoints: 3,
    drawPoints: 1,
    lossPoints: 0,
    bonusPoints: []
  },
  basket: {
    sport: 'basket',
    winPoints: 2,
    drawPoints: 0,
    lossPoints: 0,
    bonusPoints: []
  },
  volley: {
    sport: 'volley',
    winPoints: 3,
    drawPoints: 0,
    lossPoints: 0,
    bonusPoints: [
      { type: '3-0 o 3-1', points: 3 },
      { type: '3-2', points: 2 },
      { type: 'Sconfitta 2-3', points: 1 }
    ]
  },
  padel: {
    sport: 'padel',
    winPoints: 1,
    drawPoints: 0,
    lossPoints: 0,
    bonusPoints: []
  }
};

export function calculateMatchPoints(
  sport: Sport,
  won: boolean,
  drawn: boolean,
  setScore?: { home: number; away: number }
): number {
  const system = SCORING_SYSTEMS[sport];
  
  if (won) {
    if (sport === 'volley' && setScore) {
      const totalSets = setScore.home + setScore.away;
      if (setScore.home === 3 && setScore.away <= 1) {
        return 3;
      } else if (setScore.home === 3 && setScore.away === 2) {
        return 2;
      }
    }
    return system.winPoints;
  }
  
  if (drawn) {
    return system.drawPoints;
  }
  
  if (sport === 'volley' && setScore && setScore.away === 3 && setScore.home === 2) {
    return 1;
  }
  
  return system.lossPoints;
}

export function getScoringSystemDescription(sport: Sport): string {
  const system = SCORING_SYSTEMS[sport];
  
  let description = `Vittoria: ${system.winPoints} punt${system.winPoints === 1 ? 'o' : 'i'}`;
  
  if (system.drawPoints > 0) {
    description += `, Pareggio: ${system.drawPoints} punt${system.drawPoints === 1 ? 'o' : 'i'}`;
  }
  
  if (system.bonusPoints && system.bonusPoints.length > 0) {
    description += '\n\nBonus:';
    system.bonusPoints.forEach(bonus => {
      description += `\n- ${bonus.type}: ${bonus.points} punt${bonus.points === 1 ? 'o' : 'i'}`;
    });
  }
  
  return description;
}
