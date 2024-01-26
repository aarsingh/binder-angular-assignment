import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course } from '../Models/course';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = [];

  private successMessageSubject = new BehaviorSubject<string | null>(null);
  successMessage$: Observable<string | null> = this.successMessageSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<Course[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartWidgetVisibilitySubject = new BehaviorSubject<boolean>(false);
  cartWidgetVisibility$ = this.cartWidgetVisibilitySubject.asObservable();


  getCartItems(): Course[] {
    return this.cartItemsSubject.value;
  }

  getCartItem(CourseId): Course[] {
    return this.cart.find(item => item.id === CourseId);
  }

  showSuccessMessage(message: string) {
    this.successMessageSubject.next(message);
     // Auto-hide after 2 seconds
     timer(2000).pipe(switchMap(() => this.successMessageSubject)).subscribe(() => {
      this.successMessageSubject.next(null);
    });
  }

  addToCart(course, quantity) {
    const courseInCart = this.cart.find(item => item.id === course.id);
    if (courseInCart) {
      courseInCart.quantity += quantity;
    } else {
      this.cart.push({ ...course, quantity });
    }

    const currentCartItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentCartItems, course]);
  }

  /*
  removeFromCart(courseId) {

    const index = this.cart.indexOf(courseId);
    if (index > -1) {
      this.wishlistCourses.splice(index, 1);
      course.isInWishlist = false;
    }
    this.cart = this.cart.filter((c: any) => c.id !== courseId);
    return this.cart.filter((c: any) => c.id == courseId);
  }
  */

  removeFromCart(courseId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter((course) => course.id !== courseId);
    this.cartItemsSubject.next(updatedCart);
  }

  getCart() {
    return this.cartItemsSubject.value;
  }

  // getCartValue() {
  //   return this.cartItemsSubject.value;
  // }

  getTotalQuantity() {
    return this.cartItemsSubject.value.reduce((total, course) => total + course.quantity, 0);
  }

  clearCart() {
    // Clear the cart items array
    const emptyCart: Course[] = [];
    this.cartItemsSubject.next(emptyCart);
  }

  toggleCartWidget(isVisible: boolean): void {
    this.cartWidgetVisibilitySubject.next(isVisible);
  }

  closeCartWidget(): void {
    this.cartWidgetVisibilitySubject.next(false);
  }
}