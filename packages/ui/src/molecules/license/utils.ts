export function checkSrLicense(value: number) {
  if (value >= 9.5) {
    return 'S';
  } else if (value >= 9) {
    return 'A1';
  } else if (value >= 8.5) {
    return 'A2';
  } else if (value >= 8) {
    return 'A3';
  } else if (value >= 7.5) {
    return 'B1';
  } else if (value >= 7) {
    return 'B2';
  } else if (value >= 6.5) {
    return 'B3';
  } else if (value >= 6) {
    return 'C1';
  } else if (value >= 5.5) {
    return 'C2';
  } else if (value >= 5) {
    return 'C3';
  } else if (value >= 4.5) {
    return 'D1';
  } else if (value >= 4) {
    return 'D2';
  } else if (value >= 3.5) {
    return 'D3';
  } else if (value >= 3) {
    return 'E1';
  } else if (value >= 2.5) {
    return 'E2';
  } else if (value >= 2) {
    return 'E3';
  }

  return 'F';
}
