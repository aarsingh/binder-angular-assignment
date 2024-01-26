
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Course } from '../Models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css'],
})
export class CartWidgetComponent implements OnInit, OnDestroy {
  cartItems: Course[] = [];

  isCartWidgetVisible: boolean;
  private cartVisibilitySubscription: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
      });
      
    this.cartVisibilitySubscription = this.cartService.cartWidgetVisibility$.subscribe(
      (isVisible) => {
        document.getElementById('cartWidget').classList.add('visible');
        this.isCartWidgetVisible = isVisible;
      }
    );
  } 

  ngOnDestroy(): void {
    this.cartVisibilitySubscription.unsubscribe();
  }

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + item.actualPrice, 0);
  }

  goToCheckout(){
    this.router.navigateByUrl('Cart');
    document.getElementById('cartWidget').classList.remove('visible');
  }

  closeCartWidget(): void {
    this.cartService.closeCartWidget();
    document.getElementById('cartWidget').classList.remove('visible');
  }
}
