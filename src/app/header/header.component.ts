import { Component, inject, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  courseService = inject(CourseService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  cartItemCount: number = 0;
  showCartWidget: boolean = false;

  ngOnInit(){
    // this.cartItems = this.cartService.getCart().length;
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  toggleCartWidget(): void {
    // Implement logic to toggle the cart widget visibility
    this.showCartWidget = !this.showCartWidget;
  }

  navigateToCourses(){
    this.router.navigateByUrl('Courses');
  }

  navigateToWishlist(){
    this.router.navigateByUrl('Wishlist');
  }

  navigateToCart(){
    this.router.navigateByUrl('Cart');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Login');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      return user.role === 'Admin';
    }
    return false;
  }

  // getCartItems() {
  //   this.cartItems = this.cartService.getCart().length;
  // }
}
