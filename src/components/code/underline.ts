export type UnderlineMarkerType = 'none' | 'warning' | 'error';


export const errorMarkers = [
  '/*~*/', '(*~*)',
  '/*~err~*/', '(*~err~*)',
];


export const warningMarkers = [
  '/*~warn~*/', '(*~warn~*)',
];


export function underlineMarkerType(marker: string): UnderlineMarkerType {
  if (errorMarkers.includes(marker)) {
    return 'error';
  } else if (warningMarkers.includes(marker)) {
    return 'warning';
  } else {
    return 'none';
  }
}
