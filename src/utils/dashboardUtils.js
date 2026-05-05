const orderFlow = ["placed", "accepted", "cooking", "picked up", "delivered"];

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function nextOrderStatus(status) {
  const currentIndex = orderFlow.indexOf(status);
  if (currentIndex === -1 || currentIndex === orderFlow.length - 1) {
    return status;
  }

  return orderFlow[currentIndex + 1];
}

export function statusClass(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
