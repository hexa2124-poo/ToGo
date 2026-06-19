import type { Category, Product } from '@/types'

export const CATEGORIES: Category[] = [
  { id: 'cat-1',  name: 'Black Coffee',      slug: 'black-coffee',      icon: '☕',  sortOrder: 1,  isActive: true, description: 'Pure espresso-based classics' },
  { id: 'cat-2',  name: 'Hot Brew',          slug: 'hot-brew',          icon: '🔥',  sortOrder: 2,  isActive: true, description: 'Cappuccino, Latte & more' },
  { id: 'cat-3',  name: 'Cold Coffee',       slug: 'cold-coffee',       icon: '🧊',  sortOrder: 3,  isActive: true, description: 'Chilled coffee perfection' },
  { id: 'cat-4',  name: 'Cold Brew',         slug: 'cold-brew',         icon: '⚗️',  sortOrder: 4,  isActive: true, description: '12-hour slow steeped brew' },
  { id: 'cat-5',  name: 'Iced Coffee',       slug: 'iced-coffee',       icon: '🥤',  sortOrder: 5,  isActive: true, description: 'Creative iced specialties' },
  { id: 'cat-6',  name: 'Coffee Tonic',      slug: 'coffee-tonic',      icon: '🫧',  sortOrder: 6,  isActive: true, description: 'Coffee meets sparkling tonic' },
  { id: 'cat-7',  name: 'Frappe',            slug: 'frappe',            icon: '🥛',  sortOrder: 7,  isActive: true, description: 'Blended frozen indulgences' },
  { id: 'cat-8',  name: 'Matcha',            slug: 'matcha',            icon: '🍵',  sortOrder: 8,  isActive: true, description: 'Premium Japanese matcha' },
  { id: 'cat-9',  name: 'Mocktails',         slug: 'mocktails',         icon: '🍹',  sortOrder: 9,  isActive: true, description: 'Non-alcoholic cocktails' },
  { id: 'cat-10', name: 'Non-Coffee',        slug: 'non-coffee',        icon: '🍫',  sortOrder: 10, isActive: true, description: 'Chocolate, shakes & smoothies' },
  { id: 'cat-11', name: 'Brownies',          slug: 'brownies',          icon: '🍰',  sortOrder: 11, isActive: true, description: 'Freshly baked brownies' },
  { id: 'cat-12', name: 'Add Ons',           slug: 'add-ons',           icon: '➕',  sortOrder: 12, isActive: true, description: 'Extra shots & syrups' },
]

export const PRODUCTS: Product[] = [
  // ── BLACK COFFEE ──────────────────────────────────────────────────────────
  {
    id: 'p-001', name: 'Espresso', description: 'Rich concentrated shot, bold and intense.',
    price: 110, hotPrice: 100, coldPrice: 110,
    category: 'Black Coffee', categorySlug: 'black-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
  },
  {
    id: 'p-002', name: 'Americano', description: 'Espresso diluted with hot water, smooth and full-bodied.',
    price: 120, hotPrice: 110, coldPrice: 120,
    category: 'Black Coffee', categorySlug: 'black-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
  },
  {
    id: 'p-003', name: 'V60 Pour Over', description: 'Manual pour-over method, clean and nuanced cup.',
    price: 200, hotPrice: 180, coldPrice: 200,
    category: 'Black Coffee', categorySlug: 'black-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 3,
  },
  {
    id: 'p-004', name: 'Aeropress', description: 'Pressure-brewed for a rich, smooth espresso-style cup.',
    price: 200, hotPrice: 180, coldPrice: 200,
    category: 'Black Coffee', categorySlug: 'black-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 4,
  },

  // ── HOT BREW ──────────────────────────────────────────────────────────────
  {
    id: 'p-005', name: 'Cappuccino', description: 'Italian style strong hot coffee with velvety milk foam.',
    price: 120, hotPrice: 120,
    category: 'Hot Brew', categorySlug: 'hot-brew',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
  },
  {
    id: 'p-006', name: 'Latte', description: 'Coffee with steamed milk and less foam. Silky smooth.',
    price: 140, hotPrice: 120, coldPrice: 140,
    category: 'Hot Brew', categorySlug: 'hot-brew',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 2,
  },
  {
    id: 'p-007', name: 'Spanish Latte', description: 'Coffee with condensed milk, subtly sweet in taste.',
    price: 160, hotPrice: 140, coldPrice: 160,
    category: 'Hot Brew', categorySlug: 'hot-brew',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 3,
  },
  {
    id: 'p-008', name: 'Mocha', description: 'Coffee, cocoa powder, milk. Dark in taste and rich in flavor.',
    price: 160, hotPrice: 140, coldPrice: 160,
    category: 'Hot Brew', categorySlug: 'hot-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 4,
  },
  {
    id: 'p-009', name: 'Honey Cinnamon Latte', description: 'Coffee, honey, cinnamon, milk — warm and comforting.',
    price: 170, hotPrice: 150, coldPrice: 170,
    category: 'Hot Brew', categorySlug: 'hot-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 5,
  },
  {
    id: 'p-010', name: 'Flavored Latte', description: 'Your choice of Irish, Hazelnut or Caramel syrup with latte.',
    price: 170, hotPrice: 150, coldPrice: 170,
    category: 'Hot Brew', categorySlug: 'hot-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 6,
    customizations: ['Irish', 'Hazelnut', 'Caramel'],
  },

  // ── COLD COFFEE ───────────────────────────────────────────────────────────
  {
    id: 'p-011', name: 'Classic Cold Coffee', description: 'Chilled coffee blended smooth. A timeless classic.',
    price: 170,
    category: 'Cold Coffee', categorySlug: 'cold-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
  },
  {
    id: 'p-012', name: 'Flavoured Cold Coffee', description: 'Cold coffee with Irish, Hazelnut, Caramel or Mocha.',
    price: 200,
    category: 'Cold Coffee', categorySlug: 'cold-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
    customizations: ['Irish', 'Hazelnut', 'Caramel', 'Mocha'],
  },
  {
    id: 'p-013', name: 'Nutella Cold Coffee', description: 'Creamy cold coffee blended with rich Nutella.',
    price: 270,
    category: 'Cold Coffee', categorySlug: 'cold-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 3,
  },
  {
    id: 'p-014', name: 'Biscoff Cold Coffee', description: 'Cold coffee meets the iconic Biscoff cookie butter.',
    price: 270,
    category: 'Cold Coffee', categorySlug: 'cold-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 4,
  },

  // ── COLD BREW ─────────────────────────────────────────────────────────────
  {
    id: 'p-015', name: 'Cold Brew Black', description: 'Slow-steeped for 12 hours. Smooth, bold, zero bitterness.',
    price: 140,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 1,
  },
  {
    id: 'p-016', name: 'Cold Brew Latte', description: 'Cold brew concentrate with fresh milk over ice.',
    price: 150,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 2,
  },
  {
    id: 'p-017', name: 'Vietnamese Cold Brew', description: 'Cold brew with sweetened condensed milk — Sài Gòn style.',
    price: 160,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 3,
  },
  {
    id: 'p-018', name: 'Pineapple Cold Brew', description: 'Tropical pineapple meets bold cold brew over ice.',
    price: 160,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 4,
  },
  {
    id: 'p-019', name: 'Orange Cold Brew', description: 'Fresh orange juice meets smooth cold brew concentrate.',
    price: 160,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 5,
  },
  {
    id: 'p-020', name: 'Cold Brew Mojito', description: 'Cold brew, mint, lime, sparkling water. Refreshingly unique.',
    price: 200,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 6,
  },
  {
    id: 'p-021', name: 'Limelite', description: 'Cold brew with fresh lime and soda water. Bright and zesty.',
    price: 200,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 7,
  },
  {
    id: 'p-022', name: 'Mazagran', description: 'Portuguese cold coffee with lemon and sugar syrup over ice.',
    price: 200,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 8,
  },
  {
    id: 'p-023', name: 'The Parisian Frolic', description: 'Cold Brew with French Vanilla syrup, topped with cold foam.',
    price: 250,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 9, isNew: true,
  },
  {
    id: 'p-024', name: 'Winty Irish Cold Brew', description: 'Cold Brew, Irish Syrup, topped with luxurious cold foam.',
    price: 250,
    category: 'Cold Brew', categorySlug: 'cold-brew',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 10, isNew: true,
  },

  // ── ICED COFFEE ───────────────────────────────────────────────────────────
  {
    id: 'p-025', name: 'Iced Cinnapple Americano', description: 'Espresso with cinnamon and apple notes over ice.',
    price: 170,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 1,
  },
  {
    id: 'p-026', name: 'Iced Litchi Pineapple Americano', description: 'A tropical twist on your classic Americano.',
    price: 170,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
  },
  {
    id: 'p-027', name: 'Iced Orange Americano', description: 'Espresso over ice with fresh orange juice.',
    price: 170,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 3,
  },
  {
    id: 'p-028', name: 'Honey Lemon Americano', description: 'Espresso with honey and fresh lemon over ice.',
    price: 170,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 4,
  },
  {
    id: 'p-029', name: 'Sour Espresso', description: 'Espresso pulled sour with citrus notes. Bold yet bright.',
    price: 170,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 5,
  },
  {
    id: 'p-030', name: 'Iced Strawberry Mocha Latte', description: 'Espresso, chocolate, strawberry and milk over ice.',
    price: 190,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 6,
  },
  {
    id: 'p-031', name: 'Iced Mango Litchi Latte', description: 'Espresso, mango, litchi and milk over ice.',
    price: 190,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 7,
  },
  {
    id: 'p-032', name: 'Iced Blueberry Mocha Latte', description: 'Espresso, dark chocolate, blueberry and milk over ice.',
    price: 190,
    category: 'Iced Coffee', categorySlug: 'iced-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 8,
  },

  // ── COFFEE TONIC ──────────────────────────────────────────────────────────
  {
    id: 'p-033', name: 'Espresso Tonic', description: 'Espresso over sparkling tonic water. Crisp and bold.',
    price: 200,
    category: 'Coffee Tonic', categorySlug: 'coffee-tonic',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
  },
  {
    id: 'p-034', name: 'Cold Brew Tonic', description: 'Smooth cold brew meets effervescent tonic water.',
    price: 200,
    category: 'Coffee Tonic', categorySlug: 'coffee-tonic',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
  },
  {
    id: 'p-035', name: 'Cranberry Lime Coffee', description: 'Cranberry juice, litchi, tonic water & coffee.',
    price: 220,
    category: 'Coffee Tonic', categorySlug: 'coffee-tonic',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 3,
  },
  {
    id: 'p-036', name: 'Passion Paloma', description: 'Grapefruit, passion fruit, orange juice, tonic & coffee.',
    price: 240,
    category: 'Coffee Tonic', categorySlug: 'coffee-tonic',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 4,
  },
  {
    id: 'p-037', name: 'Energy Drink', description: 'Pineapple juice, espresso and Red Bull. For the bold.',
    price: 260,
    category: 'Coffee Tonic', categorySlug: 'coffee-tonic',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 5,
  },
  {
    id: 'p-038', name: 'The Dragon Breath', description: 'Spicy orange with espresso and carbonated beverage.',
    price: 270,
    category: 'Coffee Tonic', categorySlug: 'coffee-tonic',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 6, isNew: true,
  },

  // ── FRAPPE ────────────────────────────────────────────────────────────────
  {
    id: 'p-039', name: 'Classic Frappe', description: 'Blended coffee with ice cream and milk. Timeless.',
    price: 170,
    category: 'Frappe', categorySlug: 'frappe',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
  },
  {
    id: 'p-040', name: 'Flavoured Frappe', description: 'Classic frappe with Hazelnut, Caramel, Irish or Mocha.',
    price: 200,
    category: 'Frappe', categorySlug: 'frappe',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
    customizations: ['Hazelnut', 'Caramel', 'Irish', 'Mocha'],
  },
  {
    id: 'p-041', name: 'Biscoff Frappe', description: 'Blended frappe loaded with Belgian Biscoff cookie butter.',
    price: 270,
    category: 'Frappe', categorySlug: 'frappe',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 3,
  },
  {
    id: 'p-042', name: 'Nutella Frappe', description: 'A creamy frappe swirled with rich hazelnut Nutella.',
    price: 270,
    category: 'Frappe', categorySlug: 'frappe',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 4,
  },

  // ── MATCHA ────────────────────────────────────────────────────────────────
  {
    id: 'p-043', name: 'Matcha Latte', description: 'Premium ceremonial matcha whisked with steamed milk.',
    price: 160,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
  },
  {
    id: 'p-044', name: 'Iced Matcha Latte', description: 'Chilled matcha blended smooth over ice with milk.',
    price: 190,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 2,
  },
  {
    id: 'p-045', name: 'Iced Salted Caramel Matcha Latte', description: 'Matcha, milk, salted caramel drizzle over ice.',
    price: 230,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 3,
  },
  {
    id: 'p-046', name: 'Iced Blueberry Matcha Cloud', description: 'Matcha with blueberry puree and cloud milk foam.',
    price: 250,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 4, isNew: true,
  },
  {
    id: 'p-047', name: 'Iced Strawberry Matcha Cloud', description: 'Matcha layered with strawberry and cloud foam.',
    price: 250,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 5, isNew: true,
  },
  {
    id: 'p-048', name: 'Iced Mango Matcha Cloud', description: 'Tropical mango meets earthy matcha under cloud foam.',
    price: 250,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 6, isNew: true,
  },
  {
    id: 'p-049', name: 'Passionfruit Yuzu Matcha Tonic', description: 'Matcha, passionfruit, yuzu citrus and tonic water.',
    price: 270,
    category: 'Matcha', categorySlug: 'matcha',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 7, isNew: true,
  },

  // ── MOCKTAILS ─────────────────────────────────────────────────────────────
  {
    id: 'p-050', name: 'Lemon Iced Tea', description: 'Chilled brewed tea with fresh lemon juice over ice.',
    price: 120,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 1,
  },
  {
    id: 'p-051', name: 'Peach Iced Tea', description: 'Refreshing black tea with sweet peach essence.',
    price: 120,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
  },
  {
    id: 'p-052', name: 'Watermelon Ice Tea', description: 'Cool watermelon blended with light brewed tea.',
    price: 140,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 3,
  },
  {
    id: 'p-053', name: 'Pink Grapefruit Ice Tea', description: 'Tart grapefruit meets chilled tea. Refreshing pink.',
    price: 140,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 4,
  },
  {
    id: 'p-054', name: 'Mojito', description: 'Lime, mint, sugar syrup and sparkling water over ice.',
    price: 150,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 5,
  },
  {
    id: 'p-055', name: 'Strawberry & Mint', description: 'Strawberry, mint, carbonated beverage. Vibrant & fresh.',
    price: 160,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 6,
  },
  {
    id: 'p-056', name: 'Cinnamon Apple Fizz', description: 'Cinnamon, apple juice and sparkling water. Warm spice.',
    price: 200,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 7,
  },
  {
    id: 'p-057', name: 'Fresh Up', description: 'Hibiscus, cranberry, litchi and carbonated beverage.',
    price: 200,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 8,
  },
  {
    id: 'p-058', name: 'Cranberry Apple Spritzer', description: 'Cranberry juice, apple juice, cinnamon & sparkling water.',
    price: 200,
    category: 'Mocktails', categorySlug: 'mocktails',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 9,
  },

  // ── NON-COFFEE ────────────────────────────────────────────────────────────
  {
    id: 'p-059', name: 'Hot Chocolate', description: 'Rich Belgian cocoa steamed with fresh milk.',
    price: 70,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 1,
  },
  {
    id: 'p-060', name: 'Cold Chocolate', description: 'Chilled chocolate milk blended smooth over ice.',
    price: 150,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
  },
  {
    id: 'p-061', name: 'Smoothie', description: 'Strawberry, blueberry, mango or lychee blend.',
    price: 150,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 3,
    customizations: ['Strawberry', 'Blueberry', 'Mango', 'Lychee'],
  },
  {
    id: 'p-062', name: 'KitKat Shake', description: 'Creamy milk shake blended with chunky KitKat pieces.',
    price: 180,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 4,
  },
  {
    id: 'p-063', name: 'Oreo Shake', description: 'Classic Oreo cookies blended into a thick milkshake.',
    price: 180,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 5,
  },
  {
    id: 'p-064', name: 'Chocolate Loaded Shake', description: 'Triple chocolate overload shake. Decadent and thick.',
    price: 230,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: false, sortOrder: 6,
  },
  {
    id: 'p-065', name: 'Biscoff Shake', description: 'Creamy milkshake loaded with Belgian Biscoff cookie butter.',
    price: 250,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 7,
  },
  {
    id: 'p-066', name: 'Nutella Shake', description: 'Rich Nutella milkshake. Thick, creamy, indulgent.',
    price: 250,
    category: 'Non-Coffee', categorySlug: 'non-coffee',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 8,
  },

  // ── BROWNIES ──────────────────────────────────────────────────────────────
  {
    id: 'p-067', name: 'Brownie', description: 'Classic fudgy brownie, warm or iced.',
    price: 140, hotPrice: 120, coldPrice: 140,
    category: 'Brownies', categorySlug: 'brownies',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 1,
  },
  {
    id: 'p-068', name: 'Nutella Brownie', description: 'Fudgy brownie swirled with rich Nutella inside.',
    price: 170, hotPrice: 150, coldPrice: 170,
    category: 'Brownies', categorySlug: 'brownies',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 2,
  },
  {
    id: 'p-069', name: 'Biscoff Brownie', description: 'Brownie loaded with Belgian Biscoff cookie spread.',
    price: 170, hotPrice: 150, coldPrice: 170,
    category: 'Brownies', categorySlug: 'brownies',
    isAvailable: true, isFeatured: true, isBestSeller: true, sortOrder: 3,
  },

  // ── ADD ONS ───────────────────────────────────────────────────────────────
  {
    id: 'p-070', name: 'Extra Espresso Shot', description: 'Add an extra shot of espresso to any drink.',
    price: 40,
    category: 'Add Ons', categorySlug: 'add-ons',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 1,
  },
  {
    id: 'p-071', name: 'Flavoured Syrup', description: 'Hazelnut, Caramel, Irish, Cranberry, Orange or Passionfruit.',
    price: 30,
    category: 'Add Ons', categorySlug: 'add-ons',
    isAvailable: true, isFeatured: false, isBestSeller: false, sortOrder: 2,
    customizations: ['Hazelnut', 'Caramel', 'Irish', 'Cranberry', 'Orange', 'Passionfruit'],
  },
]

export const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.isFeatured)
export const BESTSELLER_PRODUCTS = PRODUCTS.filter(p => p.isBestSeller)
export const NEW_PRODUCTS = PRODUCTS.filter(p => p.isNew)

export const getProductsByCategory = (slug: string) =>
  PRODUCTS.filter(p => p.categorySlug === slug && p.isAvailable)

export const getProductById = (id: string) =>
  PRODUCTS.find(p => p.id === id)
