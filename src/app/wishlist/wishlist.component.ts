import { Component, OnInit } from '@angular/core';
import { WishlistService } from './../Services/wishlist.service';
import { Course } from './../Models/course';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistCourses: Course[] = [];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistCourses = this.wishlistService.wishlistCourses;
  }

  removeFromWishlist(course: Course): void {
    this.wishlistService.removeFromWishlist(course);
  }

  moveToCart(course: Course): void {
    this.wishlistService.moveFromWishlistToCart(course);
  }
}