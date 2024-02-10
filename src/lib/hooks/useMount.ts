import { EffectCallback, useEffect } from 'react';

export function useMount(effect: EffectCallback) {
  useEffect(effect, []);
}
