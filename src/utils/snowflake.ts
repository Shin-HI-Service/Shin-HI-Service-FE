export const createSnowflake = (): (() => string) => {
  const sequenceBits = 12n;
  const sequenceMask = (1n << sequenceBits) - 1n;
  const timestampLeftShift = sequenceBits;
  const epoch: bigint = BigInt(
    new Date(import.meta.env.VITE_SNOW_FLAKE_EPOCH).getTime()
  );

  let lastTimestamp = -1n;
  let sequence = 0n;

  const currentTime = (): bigint => BigInt(new Date().getTime());

  const waitForNextMillis = (lastTimestamp: bigint): bigint => {
    let timestamp = currentTime();
    while (timestamp <= lastTimestamp) {
      timestamp = currentTime();
    }
    return timestamp;
  };

  return (): string => {
    let timestamp = currentTime();

    if (timestamp === lastTimestamp) {
      sequence = (sequence + 1n) & sequenceMask;
      if (sequence === 0n) {
        timestamp = waitForNextMillis(lastTimestamp);
      }
    } else {
      sequence = 0n;
    }

    if (timestamp < lastTimestamp) {
      throw new Error("Clock moved backwards. Refusing to generate id");
    }

    lastTimestamp = timestamp;

    const id = ((timestamp - epoch) << timestampLeftShift) | sequence;

    return `${id}`;
  };
};
