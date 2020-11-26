import { ShoppingCard } from 'src/app/shared/models/shopping-card';

export class Order {
 
    datePlaced: string;
    items: any[] = [];
    total: number;
    key: string;

    constructor(public userId: string,  public shipping: any, shoppingCard: ShoppingCard) {

    this.datePlaced = new Date().toDateString();

    this.items = shoppingCard.newCard.map( i => {
        return {
            product: {
              title: i.product.title,
              imageUrl: i.product.imageUrl,
              price: i.product.price,
            },
              quantity: i.quantity,
              totalPrice: i.totalPrice
          };
    });

    this.total = shoppingCard.totalPrice;

  }

    //get totalPrice() {
    //   let sum = 0; 
    //   this.items.map(item => {
    //   sum += item.totalPrice;
    // });
    //   return sum;
   //};
   
    get newCard() {
     return this.items;
   }

}
