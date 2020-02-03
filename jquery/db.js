exports.reviews = [
  {
    id: 1,
    hotelId: 1,
    rate: 8
  },
  {
    id: 2,
    hotelId: 1,
    rate: 9
  },
  {
    id: 3,
    hotelId: 1,
    rate: 8
  },
  {
    id: 4,
    hotelId: 1,
    rate: 10
  },
  {
    id: 5,
    hotelId: 2,
    rate: 8
  },
  {
    id: 6,
    hotelId: 2,
    rate: 9
  },
  {
    id: 7,
    hotelId: 2,
    rate: 10
  },
  {
    id: 8,
    hotelId: 2,
    rate: 10
  },
  {
    id: 9,
    hotelId: 3,
    rate: 10
  },
  {
    id: 10,
    hotelId: 3,
    rate: 7
  }
];
exports.properties = [
  {
    type: 'stars',
    options: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
    points: 7
  },
  {
    type: 'utilities',
    options: [
      {
        id: 1,
        name: 'Kitchen',
        points: 10
      },
      {
        id: 2,
        name: 'Parking',
        points: 8.5
      },
      {
        id: 3,
        name: 'Conditioner',
        points: 9
      },
      {
        id: 4,
        name: 'Bath',
        points: 6
      },
      {
        id: 5,
        name: 'Balcony',
        points: 5
      }
    ]
  },
  {
    type: 'reviews',
    options: [
      {
        name: 'Impossible',
        value: 10
      },
      {
        name: 'Incredible',
        value: 9
      },
      {
        name: 'Amazing',
        value: 8
      },
    ],
    points: 10
  }
];
exports.hotels = [
  {
    id: 1,
    name: 'Morino',
    stars: 3,
    utilities: [3, 1]
  },
  {
    id: 2,
    name: 'Radisson',
    stars: 4,
    utilities: [4, 5]
  },
  {
    id: 3,
    name: 'Antalia',
    stars: 3,
    utilities: [2, 3]
  }
];