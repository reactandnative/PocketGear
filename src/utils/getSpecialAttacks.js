/* @flow */

import store from '../store';
import type {
  PokemonID,
} from '../typeDefinitions';

export default function getSpecialAttacks(id: PokemonID) {
  const specialAttacks = store.getSpecialAttacks();

  return specialAttacks.filter(attack =>
    attack.known_by.includes(id)
  ).sort((a, b) => (b.damage / b.duration) - (a.damage / a.duration));
}
