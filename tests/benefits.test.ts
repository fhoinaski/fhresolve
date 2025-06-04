import { describe, it, expect } from 'vitest';
import { calculateDistance } from '../src/utils/calculateDistance';

describe('calculateDistance', () => {
  it('returns ~111.2 km for 1 degree longitude difference at equator', () => {
    const dist = calculateDistance(0, 0, 0, 1);
    expect(dist).toBeCloseTo(111.2, 1);
  });

  it('returns ~111.2 km for 1 degree latitude difference', () => {
    const dist = calculateDistance(0, 0, 1, 0);
    expect(dist).toBeCloseTo(111.2, 1);
  });

  it('returns ~12.7 km between Ratones and Florianópolis center', () => {
    const dist = calculateDistance(-27.5132, -48.4618, -27.5969, -48.5495);
    expect(dist).toBeCloseTo(12.7, 1);
  });
});
