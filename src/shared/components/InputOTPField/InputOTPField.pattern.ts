type IsDigitGroup<S extends string> = S extends `d${infer Rest}`
  ? Rest extends ''
    ? true
    : IsDigitGroup<Rest>
  : false;

type IsOtpPattern<S extends string> = S extends `${infer Head}*${infer Tail}`
  ? IsDigitGroup<Head> extends true
    ? IsOtpPattern<Tail>
    : false
  : IsDigitGroup<S>;

export type OtpPattern<S extends string> = IsOtpPattern<S> extends true ? S : never;

export interface ElementOTP {
  key: string,
  index: number
} 

function parseOtpPattern(pattern: string): number[] {
  if (!/^d+(\*d+)*$/.test(pattern)) {
    throw new Error(`Invalid OTP pattern: "${pattern}". Expected format like "dddd", "dd-dd", "ddd-ddd".`);
  }
  return pattern.split('*').map((group) => group.length);
}

export function getElementsByPattern(pattern: string): ElementOTP[][] {
  const groups = parseOtpPattern(pattern);
  const elements = []
  let currIndexElement = 0;

  for (const lenInGroup of groups) {
    const elementsGroup: ElementOTP[] = []

    for (let i = 0; i < lenInGroup; i++) {
      elementsGroup.push({key: `slot-${currIndexElement}`, index: currIndexElement})
      currIndexElement += 1;
    }
    elements.push(elementsGroup)
  }

  return elements;
}