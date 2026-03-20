// All payment numbers pulled from environment variables
// Add to your .env
// NEXT_PUBLIC_BKASH_NUMBER=01XXXXXXXXX
// NEXT_PUBLIC_NAGAD_NUMBER=01XXXXXXXXX
// NEXT_PUBLIC_UPAY_NUMBER=01XXXXXXXXX

export const PAYMENT_METHODS = [
  {
    id: "bkash",
    name: "bKash",
    color: "#E2136E",
    lightBg: "#fdf2f8",
    darkBg: "rgba(226,19,110,0.12)",
    number: process.env.NEXT_PUBLIC_BKASH_NUMBER || "N/A",
    logo: "https://i.ibb.co/MyKb6zmr/image.png",
    instruction:
      "Send money → Personal → Enter number → Add reference 'Salami'",
  },
  {
    id: "nagad",
    name: "Nagad",
    color: "#F37020",
    lightBg: "#fff7ed",
    darkBg: "rgba(243,112,32,0.12)",
    number: process.env.NEXT_PUBLIC_NAGAD_NUMBER || "N/A",
    logo: "https://i.ibb.co/5hTHrQvw/1679248787-Nagad-Logo.png",
    instruction: "Send Money → Enter number → Add note 'Eid Salami'",
  },
  {
    id: "upay",
    name: "Upay",
    color: "#6C3BAA",
    lightBg: "#f5f3ff",
    darkBg: "rgba(108,59,170,0.12)",
    number: process.env.NEXT_PUBLIC_UPAY_NUMBER || "N/A",
    logo: "https://i.ibb.co/TMVsTCNQ/vecteezy-upay-logo-mobile-banking-app-icon-transparent-background-68764291.png",
    instruction: "Transfer → Enter number → Add message 'Salami'",
  },
];

export const PRESET_AMOUNTS = [50, 100, 200, 500, 1000];
