import { ConfettiSettings } from '../types/settings.js';

export function setConfettiSettings(settings: ConfettiSettings) {
  Object.assign(confettiSettings, settings);
}

export const confettiSettings: ConfettiSettings = {};
