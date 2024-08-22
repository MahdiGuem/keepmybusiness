const contentCards = [
    {
      cardId: 1,
      cardType: 'TextCard',
      id: 'about-section',
      titles: [
        { size: 'head_text', color: 'green_gradient', text: 'Keep My Business', alignment: 'center' },
        { size: 'head_text', color: 'text-black', text: 'ERP Landing site creator', alignment: 'center' },
        { size: 'desc', color: 'text-black', text: 'Discover today test test test', alignment: 'center' },
      ],
      background: 'bg-gray-100',
    },
    {
      cardId: 2,
      cardType: 'TextCard',
      id: 'skip0',
      titles: [
        { size: 'head_text', color: 'green_gradient', text: 'Our Services', alignment: 'left' },
        { size: 'desc', color: 'text-black', text: 'We offer a wide range of services.', alignment: 'left' },
      ],
      background: 'bg-white',
    },
    {
      cardId: 3,
      cardType: 'VideoCard',
      id: 'preview-section',
      videoID: 'c9HfNg4a_Og?si=Knmerx93u7xEINAB',
      background: 'bg-white',
    },
    {
      cardID: 4,
      cardType: 'ProductsCard',
      id: 'products-section',
      products:[
        { productName: "Product 1", productIcon: "/icons/product1.svg", cardColor: "blue-200" },
        { productName: "Product 2", productIcon: "/icons/product2.svg", cardColor: "red-200" },
        { productName: "Product 3", productIcon: "/icons/product3.svg", cardColor: "green-200" },
        { productName: "Product 4", productIcon: "/icons/product4.svg", cardColor: "yellow-200" },
        { productName: "Product 5", productIcon: "/icons/product4.svg", cardColor: "yellow-200" },
        { productName: "Product 6", productIcon: "/icons/product1.svg", cardColor: "blue-200" },
        { productName: "Product 7", productIcon: "/icons/product2.svg", cardColor: "red-200" },
      ],
    },
  ];
  
  export default contentCards;
  