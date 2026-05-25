import tee1 from "@/assets/tees/1.png";
import tee2 from "@/assets/tees/2.png";
import tee3 from "@/assets/tees/3.png";
import tee4 from "@/assets/tees/4.png";
import tee5 from "@/assets/tees/5.png";
import tee6 from "@/assets/tees/6.png";
import tee7 from "@/assets/tees/7.png";
import tee8 from "@/assets/tees/8.png";
import tee9 from "@/assets/tees/9.png";
import tee10 from "@/assets/tees/10.png";
import tee11 from "@/assets/tees/11.png";
import tee12 from "@/assets/tees/12.png";
import tee13 from "@/assets/tees/13.png";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; // PKR
  image: string;
  description: string;
};

export const products: Product[] = [
  { id: "just-a-girl", name: "I Am Just A Girl Tee", category: "Graphic Tee", price: 2800, image: tee1,
    description: "Black tee with chrome bubble lettering. A nod to soft rebellion." },
  { id: "face-speaks", name: "A Face Speaks Louder Tee", category: "Graphic Tee", price: 2800, image: tee2,
    description: "Six expressive faces, one loud statement." },
  { id: "keep-secret", name: "I Can Keep A Secret Tee", category: "Minimal Tee", price: 2600, image: tee3,
    description: "Crisp white minimal tee with a quiet wink." },
  { id: "coffee-pour", name: "Coffee Pour Tee", category: "Graphic Tee", price: 2800, image: tee4,
    description: "Hand-drawn coffee ritual on warm sand-tone cotton." },
  { id: "need-chai", name: "Need Chai Tee", category: "Graphic Tee", price: 2800, image: tee5,
    description: "For the low-battery mornings. Chai required." },
  { id: "black-red-ringer", name: "Black & Red Ringer Tee", category: "Ringer Tee", price: 3200, image: tee6,
    description: "Retro ringer silhouette in noir & poppy red." },
  { id: "saturn-signature", name: "Saturn Signature Tee", category: "Signature", price: 3500, image: tee7,
    description: "Our signature planet, gold-trimmed ringer." },
  { id: "classic-red-ringer", name: "Classic Red Ringer Tee", category: "Ringer Tee", price: 3200, image: tee8,
    description: "Vermillion red, contrast black trim. Pure classic." },
  { id: "boyish-clothes", name: "Boyish Clothes Tee", category: "Graphic Tee", price: 2800, image: tee9,
    description: "Hand-painted character art with a manifesto." },
  { id: "essential-black", name: "Essential Black Tee", category: "Basics", price: 2400, image: tee10,
    description: "The everyday foundation. Heavyweight cotton." },
  { id: "golden-chikankari-kurta", name: "Golden Chikankari Kurta", category: "Kurta", price: 6500, image: tee11,
    description: "Sand-gold chikankari kurta with intricate white embroidery and tassel hem." },
  { id: "rose-embroidered-suit", name: "Rose Embroidered Suit", category: "Suit", price: 7200, image: tee12,
    description: "Dusty rose kurta with paisley embroidery, paired with shalwar and printed dupatta." },
  { id: "ivory-grace-suit", name: "Ivory Grace Suit", category: "Suit", price: 7800, image: tee13,
    description: "Sleeveless ivory kurta with scalloped hem, palazzo, and floral chiffon dupatta." },
];

export const formatPKR = (n: number) =>
  `Rs. ${n.toLocaleString("en-PK")}`;
