import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Course } from 'src/app/Models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { WishlistService } from '../Services/wishlist.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Course[] = [];
  totalQuantity: number = 0;
  totalDiscount: number = 0;

  showModal = false;
  modalMessage = '';

  courseModals: boolean = false;

  // private cart = new BehaviorSubject<Course[]>([]);
  // cartItems$ = this.cart.asObservable();

  constructor(private cartService: CartService, private wishlistService: WishlistService, private router: Router) { }

  ngOnInit() {
    // this.cart = this.cartService.getCart();

    this.cart = this.cartService.getCart();
    console.log(this.cart);
    this.totalQuantity = this.cartService.getTotalQuantity();

  }

  calculateTotal(): void {
    // this.total = this.cart.reduce((acc, item) => acc + item.actualPrice * item.quantity, 0);
    this.totalQuantity = this.cart.reduce((acc, item) => acc + item.actualPrice * 1, 0);
  }

  getPrice() {
    return this.cart.reduce((total, course) => {
       const discountedPrice = course.actualPrice;
       return total + discountedPrice;
    }, 0);
  }

  getTotalQuantity() {
    return this.cart.reduce((total, course) => {
       return total + course.quantity;
    }, 0);
  }

  getGrandTotal() {
    return this.cart.reduce((total, course) => {
      const discountedPrice = course.actualPrice;
      return total + discountedPrice * course.quantity;
   }, 0);
  }

  // getGrandTotal1() {
  //   return this.cart.reduce((total, course) => {
  //     const discountedPrice = course.actualPrice - ((course.discountPercentage / 100) * course.actualPrice);
  //     return discountedPrice * course.quantity;
  //  }, 0);
  // }

  getGrandTotal1() {
    return this.cart.reduce((total, course) => {
       const discountedPrice = course.actualPrice * (1 - course.discountPercentage / 100);
       return total + discountedPrice * course.quantity;
    }, 0);
  }

  getTotalDiscount() {
    
    const totalDiscount: number = this.cart.reduce((total, course) => total + course.discountPercentage, 0);
    console.log(totalDiscount);
    return this.cart.reduce((totalDiscount, course) => {
      let discount = course.discountPercentage;
       return totalDiscount += discount;
    }, 0);

  }

  getFinalPrice() {
    return this.getGrandTotal() - this.getTotalDiscount();
  }

  YouSaved(){
    console.log(this.getPrice());
    console.log(this.getGrandTotal1());
    console.log(this.getPrice() - this.getGrandTotal1());
    return this.getPrice() - this.getGrandTotal1();
  }

  removeFromCart(item: Course): void {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.calculateTotal();
    }
  }

  removeCourse(course: any) {
    if (course.quantity > 1) {
      course.quantity--;
    } else {
       this.cart = this.cart.filter((c: any) => c.id !== course.id);
    }
  }

  moveToWishlist(courseId: number): void {
    const course = this.cartService.getCartItem(courseId);
    console.log(course)
    if (course) {
      this.cartService.removeFromCart(courseId);
      this.wishlistService.addToWishlistById(courseId);
      // Get updated cart value
      this.cart = this.cartService.getCart();
    }
  }

  checkout(): void {
    console.log('Checkout clicked');
    this.modalMessage = `Your order is placed successfuly!`;
    this.courseModals = true;
    // this.router.navigateByUrl('/Checkout');
  }

  clearCart() {
    // Clear the cart items array
    const emptyCart: Course[] = [];
    // this.cart.next(emptyCart);
    // this.cart = [];
  }

  confirmAction(shouldAddToCart: boolean) {
    // Close the modal for the specific course
    // this.courseModals.set(course.id, false);
    // this.cart = []; // Clear the entire cart array
    // this.calculateTotal();

    // alert(shouldAddToCart)

    if (!shouldAddToCart) {
      this.cartService.clearCart();
      // this.cart = []; // Clear the entire cart array
      this.calculateTotal();
      this.cart = this.cartService.getCart();
    }
  }
}




