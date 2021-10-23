import { create } from 'tailwind-rn';
import styles from './styles.json';

const { tailwind, getColor } = create(styles);

function tw(...args) {
  if (args.flat) {
    args = args.flat()
  }

  if (args.join) {
    args = args.join(" ")
  }

  return tailwind(args);
};

export { tailwind, getColor, tw };
