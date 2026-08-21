export function formatMoney(amountCents) {
  if (amountCents < 0) {
    amountCents = amountCents * -1; // Convert negative to positive
    return `-$${(amountCents / 100).toFixed(2)}`;
  }
  return `$${(amountCents / 100).toFixed(2)}`;
}
