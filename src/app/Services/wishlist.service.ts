import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from './course.service';
import { CartService } from './cart.service';
import { Course } from './../Models/course';



@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistCourses: Course[] = [];

  private wishlistSubject = new BehaviorSubject<Course[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private courseService: CourseService, private cartService: CartService) { }

  /*
  addToWishlist(course: Course): void {
    const currentWishlist = this.wishlistSubject.value;
    this.wishlistSubject.next([...currentWishlist, course]);
  }

  removeFromWishlist(courseId: number): void {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter((course) => course.id !== courseId);
    this.wishlistSubject.next(updatedWishlist);
  }

  */

  addToWishlist(course: Course): void {
    if (!this.wishlistCourses.includes(course)) {
      this.wishlistCourses.push(course);
      course.isInWishlist = true;
    }
  }

  addToWishlistById(courseId: number): void {
    // Fetch the course by courseId from the CourseService
    this.courseService.getCourseById(courseId).subscribe(
      (course: Course) => {
        if (course && !this.wishlistCourses.includes(course)) {
          this.wishlistCourses.push(course);
          course.isInWishlist = true;
        }
      },
      error => {
        console.error('Error fetching course by ID', error);
      }
    );
  }

  removeFromWishlist(course: Course): void {
    const index = this.wishlistCourses.indexOf(course);
    if (index > -1) {
      this.wishlistCourses.splice(index, 1);
      course.isInWishlist = false;
    }
  }

  moveFromWishlistToCart(course: Course): void {
    const index = this.wishlistCourses.findIndex((item) => item.id === course.id);

    if (index !== -1) {
      // Remove from wishlist
      this.wishlistCourses.splice(index, 1);
      this.wishlistSubject.next([...this.wishlistCourses]);

      // Add to cart
      this.cartService.addToCart(course, 1);
    }
  }

  isCourseInWishlist(course: Course): boolean {
    return this.wishlistCourses.includes(course);
  }
}