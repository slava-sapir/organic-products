export class Product {

constructor(  public title: string = '',
              public price: number = null,
              public category: string = '',
              public imageUrl: string = '',
              public key: string = '') {
              this.title = title,
              this.price = price,
              this.category = category,
              this.imageUrl = imageUrl,
              this.key = key; }
}
