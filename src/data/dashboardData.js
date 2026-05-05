export const initialFoods = [
  {
    id: "food1",
    name: "Chicken Tehari",
    category: "Rice",
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    description: "Aromatic rice cooked with tender chicken and warm spices.",
    price: 12,
    ordersToday: 18,
    stock: 24,
    status: "Live",
  },
  {
    id: "food5",
    name: "Paratha and Egg Bhuna",
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
    description: "Flaky paratha served with spicy scrambled egg bhuna.",
    price: 8,
    ordersToday: 11,
    stock: 16,
    status: "Low stock",
  },
  {
    id: "food6",
    name: "Lunch Box Special",
    category: "Lunch",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    description:
      "Rice, dal, chicken curry, and salad packed for a balanced lunch.",
    price: 13,
    ordersToday: 22,
    stock: 30,
    status: "Live",
  },
  {
    id: "food9",
    name: "Shemai Delight",
    category: "Desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=900&q=80",
    description: "Creamy roasted vermicelli dessert finished with nuts.",
    price: 7,
    ordersToday: 9,
    stock: 12,
    status: "Live",
  },
];

export const initialCustomRequests = [
  {
    id: "req1",
    foodName: "Low-oil chicken pulao",
    customerName: "Nadia Rahman",
    description: "Lightly spiced and less oily, with extra raisins.",
    spiceLevel: "Mild",
    quantity: 3,
    deliveryDateTime: "2026-05-06T21:00:00",
    status: "Pending",
  },
  {
    id: "req2",
    foodName: "Vegetarian breakfast platter",
    customerName: "Tania Ahmed",
    description: "Paratha, mixed vegetables, and chutney.",
    spiceLevel: "Medium",
    quantity: 2,
    deliveryDateTime: "2026-05-07T10:00:00",
    status: "Accepted",
  },
  {
    id: "req3",
    foodName: "Kids mild khichuri set",
    customerName: "Rafi Islam",
    description: "Soft rice and lentils with no green chili.",
    spiceLevel: "Mild",
    quantity: 1,
    deliveryDateTime: "2026-05-06T19:00:00",
    status: "Pending",
  },
];

export const initialOrders = [
  {
    id: "order1",
    customerName: "Farhana Akter",
    itemsCount: 3,
    total: 29,
    status: "cooking",
    estimatedDeliveryTime: "2026-05-05T21:10:00",
  },
  {
    id: "order2",
    customerName: "Sabbir Hossain",
    itemsCount: 2,
    total: 18,
    status: "placed",
    estimatedDeliveryTime: "2026-05-05T21:40:00",
  },
  {
    id: "order3",
    customerName: "Maliha Noor",
    itemsCount: 1,
    total: 12,
    status: "picked up",
    estimatedDeliveryTime: "2026-05-05T20:55:00",
  },
  {
    id: "order4",
    customerName: "Jahid Hasan",
    itemsCount: 4,
    total: 37,
    status: "accepted",
    estimatedDeliveryTime: "2026-05-05T21:25:00",
  },
];

export const customers = [
  {
    id: "cus1",
    name: "Nadia Rahman",
    segment: "Frequent buyer",
    location: "Banani, Dhaka",
    orders: 24,
    favorite: "Chicken Tehari",
  },
  {
    id: "cus2",
    name: "Tania Ahmed",
    segment: "Custom request",
    location: "Gulshan, Dhaka",
    orders: 9,
    favorite: "Breakfast platter",
  },
  {
    id: "cus3",
    name: "Rafi Islam",
    segment: "Family meals",
    location: "Dhanmondi, Dhaka",
    orders: 15,
    favorite: "Lunch Box Special",
  },
];

export const cooks = [
  {
    id: "cook1",
    name: "Sharmeen Kitchen",
    area: "Banani",
    rating: 4.9,
    liveItems: 4,
    status: "Open",
  },
  {
    id: "cook2",
    name: "Aunty Runa",
    area: "Gulshan",
    rating: 4.8,
    liveItems: 6,
    status: "Busy",
  },
  {
    id: "cook3",
    name: "Village Spice Home",
    area: "Dhanmondi",
    rating: 4.7,
    liveItems: 5,
    status: "Open",
  },
];

export const activityFeed = [
  "Order #order4 moved to accepted status.",
  "Custom request req3 arrived from Rafi Islam.",
  "Lunch Box Special sold 22 portions today.",
  "Paratha and Egg Bhuna is running low on stock.",
];
