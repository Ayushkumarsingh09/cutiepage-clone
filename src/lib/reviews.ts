export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  template?: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "PS",
    rating: 5,
    text: "Made a birthday page for my best friend and she literally cried happy tears. The templates are so cute and easy to customise!",
    template: "Birthday Wish 01",
    date: "March 2026",
  },
  {
    id: "2",
    name: "Rahul Mehta",
    avatar: "RM",
    rating: 5,
    text: "Used the apology template after a silly fight with my girlfriend. She loved it so much she forgave me instantly. Worth every second spent.",
    template: "Cute Apology",
    date: "February 2026",
  },
  {
    id: "3",
    name: "Ananya Patel",
    avatar: "AP",
    rating: 5,
    text: "The Mother's Day template was perfect. My mom shared it with all her friends on WhatsApp. So proud of what I created!",
    template: "Mother's Day Special",
    date: "May 2026",
  },
  {
    id: "4",
    name: "Vikram Singh",
    avatar: "VS",
    rating: 5,
    text: "Created an anniversary page in under 10 minutes. The QR code feature is genius — we framed it and hung it on our wall.",
    template: "Anniversary Special",
    date: "January 2026",
  },
  {
    id: "5",
    name: "Sneha Reddy",
    avatar: "SR",
    rating: 5,
    text: "I've tried other gift page builders but nothing comes close to the design quality here. Every template feels premium and heartfelt.",
    date: "April 2026",
  },
  {
    id: "6",
    name: "Arjun Kapoor",
    avatar: "AK",
    rating: 5,
    text: "Made a wedding surprise page for my sister. The animations and personal touches made it feel like a real mini-website made with love.",
    template: "Wedding Special",
    date: "March 2026",
  },
];
