import slugify from 'slugify';

export const CATEGORIES = [
  {
    description: 'Tech Essentials',
    imageUrl: 'image/categories/tech-essentials.jpg',
    children: [
      {
        description: 'Keyboards & Mice',
        imageUrl: 'image/categories/keyboards-mice.jpg',
      },
      {
        description: 'Gaming Headsets',
        imageUrl: 'image/categories/gaming-headsets.jpg',
      },
      {
        description: 'Gaming Chairs',
        imageUrl: 'image/categories/gaming-chairs.jpg',
      },
      {
        description: 'VR & Accessories',
        imageUrl: 'image/categories/vr-accessories.jpg',
      },
    ],
  },
  {
    description: 'Interior Design',
    imageUrl: 'image/categories/interior-design.jpg',
    children: [
      {
        description: 'Decorative Accents',
        imageUrl: 'image/categories/decorative-accents.jpg',
      },
      {
        description: 'Textiles & Rugs',
        imageUrl: 'image/categories/textiles-rugs.jpg',
      },
      {
        description: 'Lighting Solutions',
        imageUrl: 'image/categories/lighting-solutions.jpg',
      },
      {
        description: 'Wall Art & Mirrors',
        imageUrl: 'image/categories/wall-art-mirrors.jpg',
      },
    ],
  },
  {
    description: 'Fashion & Style',
    imageUrl: 'image/categories/fashion-style.jpg',
    children: [
      {
        description: 'Outerwear & Jackets',
        imageUrl: 'image/categories/outerwear-jackets.jpg',
      },
      {
        description: 'Tops & Tees',
        imageUrl: 'image/categories/tops-tees.jpg',
      },
      {
        description: 'Bottoms & Jeans',
        imageUrl: 'image/categories/bottoms-jeans.jpg',
      },
      {
        description: 'Shoes & Footwear',
        imageUrl: 'image/categories/shoes-footwear.jpg',
      },
    ],
  },
  {
    description: 'Creative Supplies',
    imageUrl: 'image/categories/creative-supplies.jpg',
    children: [
      {
        description: 'Painting & Drawing',
        imageUrl: 'image/categories/painting-drawing.jpg',
      },
      {
        description: 'Crafting Materials',
        imageUrl: 'image/categories/crafting-materials.jpg',
      },
      {
        description: 'Sculpting & Pottery',
        imageUrl: 'image/categories/sculpting-pottery.jpg',
      },
      {
        description: 'Paper Crafts & Stationery',
        imageUrl: 'image/categories/paper-craft.jpg',
      },
    ],
  },
  {
    description: 'Home Appliances',
    imageUrl: 'image/categories/home-appliances.jpg',
    children: [
      {
        description: 'Kitchen Appliances',
        imageUrl: 'image/categories/kitchen-appliances.jpg',
      },
      {
        description: 'Laundry & Cleaning',
        imageUrl: 'image/categories/laundry-cleaning.jpg',
      },
      {
        description: 'Heating & Cooling',
        imageUrl: 'image/categories/heating-cooling.jpg',
      },
      {
        description: 'Small Appliances',
        imageUrl: 'image/categories/small-appliances.jpg',
      },
    ],
  },
  {
    description: 'Books & Media',
    imageUrl: 'image/categories/books-media.jpg',
    children: [
      {
        description: 'Books',
        imageUrl: 'image/categories/books.jpg',
      },
      {
        description: 'Vinyls & Music',
        imageUrl: 'image/categories/vinyls-music.jpg',
      },
      {
        description: 'Movies & TV',
        imageUrl: 'image/categories/movies-tv.jpg',
      },
      {
        description: 'Magazines',
        imageUrl: 'image/categories/magazines.jpg',
      },
    ],
  },
  {
    description: 'Health & Beauty',
    imageUrl: 'image/categories/health-beauty.jpg',
    children: [
      {
        description: 'Skincare',
        imageUrl: 'image/categories/skincare.jpg',
      },
      {
        description: 'Makeup',
        imageUrl: 'image/categories/makeup.jpg',
      },
      {
        description: 'Hair Care',
        imageUrl: 'image/categories/hair-care.jpg',
      },
      {
        description: 'Personal Care',
        imageUrl: 'image/categories/personal-care.jpg',
      },
    ],
  },
  {
    description: 'Sports & Outdoors',
    imageUrl: 'image/categories/.jpg',
    children: [
      {
        description: 'Fitness & Exercise',
        imageUrl: 'image/categories/fitness-excercise.jpg',
      },
      {
        description: 'Sports',
        imageUrl: 'image/categories/sports.jpg',
      },
      {
        description: 'Outdoor Recreation',
        imageUrl: 'image/categories/outdoor-recreation.jpg',
      },
    ],
  },
];

function addSlugs(categories: any[]) {
  categories.forEach((category) => {
    category.slug = slugify(category.description, { lower: true });
    if (category.children?.length) {
      addSlugs(category.children);
    }
  });
}

addSlugs(CATEGORIES);
