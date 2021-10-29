import { create } from 'tailwind-rn';
import styles from './styles.json';

const { tailwind, getColor } = create(styles);

function tw(...args) {
  if (args.flat) {
    args = args.flat()
  }

  const inlineStyles = args.filter((arg) => {
    return typeof arg == 'object';
  });

  args = args.filter((arg) => {
    return typeof arg != 'object' && arg.length > 0;
  });


  if (args.join) {
    args = args.join(" ")
  }

  return [...inlineStyles, tailwind(args)].reduce((styleSheet, style) => {
    return { ...styleSheet, ...style };
  }, {});
};

export { tailwind, getColor, tw };
