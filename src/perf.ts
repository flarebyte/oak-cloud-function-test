import { hrtime } from 'process';

export const measureTime = () => {
  const started = hrtime.bigint();
  return () => {
    const finished = hrtime.bigint();
    const delta = finished - started;
    return delta.toString();
  };
};
