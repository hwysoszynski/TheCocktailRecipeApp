export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Cocktail {
  id: string;
  name: string;
  baseSpirit: string;
  ingredients: Ingredient[];
  flavourProfile: string[];
  description: string;
  instructions: string[];
  imageUrl: string;
  rating?: number;
  hasHad?: boolean;
  isFavourite?: boolean;
}

export const MOCK_COCKTAILS: Cocktail[] = [
  {
    id: '1',
    name: 'Negroni',
    baseSpirit: 'Gin',
    ingredients: [
      { name: 'Gin', amount: '30', unit: 'ml' },
      { name: 'Campari', amount: '30', unit: 'ml' },
      { name: 'Sweet Vermouth', amount: '30', unit: 'ml' },
    ],
    flavourProfile: ['Bitter', 'Herbal', 'Complex'],
    description: 'A classic Italian cocktail known for its perfect balance of bitter and sweet.',
    instructions: ['Add all ingredients to a mixing glass with ice', 'Stir until well-chilled', 'Strain into a rocks glass over fresh ice', 'Garnish with an orange peel'],
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
  },
  {
    id: '2',
    name: 'Margarita',
    baseSpirit: 'Tequila',
    ingredients: [
      { name: 'Tequila', amount: '50', unit: 'ml' },
      { name: 'Lime Juice', amount: '25', unit: 'ml' },
      { name: 'Triple Sec', amount: '20', unit: 'ml' },
      { name: 'Salt', amount: '1', unit: 'pinch' },
    ],
    flavourProfile: ['Citrus', 'Tangy', 'Refreshing'],
    description: 'The quintessential tequila cocktail with a perfect balance of sweet, sour, and salty.',
    instructions: ['Rim glass with salt', 'Shake all ingredients with ice', 'Strain into glass', 'Garnish with lime wheel'],
    imageUrl: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400',
  },
  {
    id: '3',
    name: 'Old Fashioned',
    baseSpirit: 'Whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '60', unit: 'ml' },
      { name: 'Sugar', amount: '1', unit: 'cube' },
      { name: 'Angostura Bitters', amount: '2', unit: 'dashes' },
      { name: 'Orange Peel', amount: '1', unit: 'piece' },
    ],
    flavourProfile: ['Strong', 'Sweet', 'Aromatic'],
    description: 'A timeless whiskey cocktail that showcases the spirit with just a touch of sweetness.',
    instructions: ['Muddle sugar and bitters in glass', 'Add bourbon and ice', 'Stir gently', 'Garnish with orange peel'],
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400',
  },
  {
    id: '4',
    name: 'Mojito',
    baseSpirit: 'Rum',
    ingredients: [
      { name: 'White Rum', amount: '50', unit: 'ml' },
      { name: 'Lime Juice', amount: '25', unit: 'ml' },
      { name: 'Mint', amount: '8', unit: 'leaves' },
      { name: 'Sugar', amount: '2', unit: 'tsp' },
      { name: 'Soda Water', amount: '60', unit: 'ml' },
    ],
    flavourProfile: ['Fresh', 'Minty', 'Refreshing'],
    description: 'A refreshing Cuban classic with bright mint and lime flavours.',
    instructions: ['Muddle mint and sugar', 'Add lime juice and rum', 'Fill with ice and soda water', 'Garnish with mint sprig'],
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
  },
  {
    id: '5',
    name: 'Espresso Martini',
    baseSpirit: 'Vodka',
    ingredients: [
      { name: 'Vodka', amount: '50', unit: 'ml' },
      { name: 'Coffee Liqueur', amount: '30', unit: 'ml' },
      { name: 'Espresso', amount: '30', unit: 'ml' },
      { name: 'Sugar Syrup', amount: '10', unit: 'ml' },
    ],
    flavourProfile: ['Rich', 'Coffee', 'Smooth'],
    description: 'A sophisticated blend of vodka and espresso with a velvety foam top.',
    instructions: ['Shake all ingredients vigorously with ice', 'Double strain into a martini glass', 'Garnish with coffee beans'],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
  },
  {
    id: '6',
    name: 'Aperol Spritz',
    baseSpirit: 'Aperol',
    ingredients: [
      { name: 'Aperol', amount: '60', unit: 'ml' },
      { name: 'Prosecco', amount: '90', unit: 'ml' },
      { name: 'Soda Water', amount: '30', unit: 'ml' },
      { name: 'Orange Slice', amount: '1', unit: 'piece' },
    ],
    flavourProfile: ['Bitter', 'Sweet', 'Bubbly'],
    description: 'An Italian aperitif that\'s light, refreshing, and perfectly balanced.',
    instructions: ['Fill glass with ice', 'Add Aperol and Prosecco', 'Top with soda water', 'Garnish with orange slice'],
    imageUrl: 'https://images.unsplash.com/photo-1584225064537-c0c8f5d0ad1b?w=400',
  },
  {
    id: '7',
    name: 'Whiskey Sour',
    baseSpirit: 'Whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '60', unit: 'ml' },
      { name: 'Lemon Juice', amount: '30', unit: 'ml' },
      { name: 'Sugar Syrup', amount: '15', unit: 'ml' },
      { name: 'Egg White', amount: '1', unit: 'piece' },
    ],
    flavourProfile: ['Sour', 'Smooth', 'Balanced'],
    description: 'A classic sour cocktail with a silky texture from the egg white foam.',
    instructions: ['Dry shake with egg white', 'Add ice and shake again', 'Strain into glass', 'Garnish with cherry and lemon'],
    imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400',
  },
  {
    id: '8',
    name: 'Cosmopolitan',
    baseSpirit: 'Vodka',
    ingredients: [
      { name: 'Vodka', amount: '40', unit: 'ml' },
      { name: 'Triple Sec', amount: '15', unit: 'ml' },
      { name: 'Cranberry Juice', amount: '30', unit: 'ml' },
      { name: 'Lime Juice', amount: '15', unit: 'ml' },
    ],
    flavourProfile: ['Fruity', 'Tart', 'Elegant'],
    description: 'A glamorous pink cocktail made famous in the 90s.',
    instructions: ['Shake all ingredients with ice', 'Strain into a martini glass', 'Garnish with lime wheel'],
    imageUrl: 'https://images.unsplash.com/photo-1575467678930-c7ed374c1ab4?w=400',
  },
  {
    id: '9',
    name: 'Daiquiri',
    baseSpirit: 'Rum',
    ingredients: [
      { name: 'White Rum', amount: '60', unit: 'ml' },
      { name: 'Lime Juice', amount: '25', unit: 'ml' },
      { name: 'Sugar Syrup', amount: '15', unit: 'ml' },
    ],
    flavourProfile: ['Citrus', 'Clean', 'Simple'],
    description: 'A simple yet sophisticated rum cocktail that highlights quality ingredients.',
    instructions: ['Shake all ingredients with ice', 'Strain into a coupe glass', 'Garnish with lime wheel'],
    imageUrl: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=400',
  },
  {
    id: '10',
    name: 'Manhattan',
    baseSpirit: 'Whiskey',
    ingredients: [
      { name: 'Rye Whiskey', amount: '60', unit: 'ml' },
      { name: 'Sweet Vermouth', amount: '30', unit: 'ml' },
      { name: 'Angostura Bitters', amount: '2', unit: 'dashes' },
    ],
    flavourProfile: ['Strong', 'Herbal', 'Sophisticated'],
    description: 'A classic stirred cocktail with a perfect balance of whiskey and vermouth.',
    instructions: ['Stir all ingredients with ice', 'Strain into a coupe glass', 'Garnish with cherry'],
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
  },
  {
    id: '11',
    name: 'Piña Colada',
    baseSpirit: 'Rum',
    ingredients: [
      { name: 'White Rum', amount: '50', unit: 'ml' },
      { name: 'Coconut Cream', amount: '30', unit: 'ml' },
      { name: 'Pineapple Juice', amount: '90', unit: 'ml' },
    ],
    flavourProfile: ['Tropical', 'Creamy', 'Sweet'],
    description: 'A tropical vacation in a glass with coconut and pineapple.',
    instructions: ['Blend all ingredients with ice', 'Pour into a hurricane glass', 'Garnish with pineapple and cherry'],
    imageUrl: 'https://images.unsplash.com/photo-1568631311207-8db6b5ecb8bc?w=400',
  },
  {
    id: '12',
    name: 'Gin & Tonic',
    baseSpirit: 'Gin',
    ingredients: [
      { name: 'Gin', amount: '50', unit: 'ml' },
      { name: 'Tonic Water', amount: '150', unit: 'ml' },
      { name: 'Lime', amount: '1', unit: 'wedge' },
    ],
    flavourProfile: ['Botanical', 'Crisp', 'Refreshing'],
    description: 'A simple and refreshing classic that showcases quality gin.',
    instructions: ['Fill glass with ice', 'Add gin', 'Top with tonic water', 'Garnish with lime'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
  },
];
