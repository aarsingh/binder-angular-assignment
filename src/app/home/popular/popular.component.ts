import { Component, inject, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  courseService = inject(CourseService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  popularCourses: Course[] = [];
  wishlistCourses: any[] = [];
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  sortBy = 'default';

  showModal = false;
  modalMessage = '';

  courses: Course[] = [];
  searchTerm = '';

  pageSize = 4;
  currentPage = 1;

  // Use a Map to store showModal state for each course
  courseModals: Map<number, boolean> = new Map<number, boolean>();

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(): void {
    this.popularCourses = this.courseService.courses;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.popularCourses = this.popularCourses.slice(startIndex, endIndex);
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCourses();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCourses();
    }
  }

  navigateToCourses() {
    this.router.navigateByUrl('Courses');
  }

  addToCart(course: Course, quantity: number) {
    const index = this.cartService.getCart().findIndex(item => item.id === course.id);
    if (index !== -1) {
      this.modalMessage = `The course "${course.courseName}" is already in your cart!`;
      this.courseModals.set(course.id, true);
    } else {
      this.cartService.showSuccessMessage(`Product "${course.courseName}" added to the cart.`);
      this.cartService.addToCart(course, quantity);
    }
  }

  confirmAction(shouldAddToCart: boolean, course: Course, quantity: number) {
    // Close the modal for the specific course
    this.courseModals.set(course.id, false);

    if (shouldAddToCart) {
      this.cartService.addToCart(course, quantity);
    }
  }


  sortCourses() {
    if (this.sortBy === 'lowest') {
      this.popularCourses.sort((a, b) => a.actualPrice - b.actualPrice);
    } else if (this.sortBy === 'highest') {
      this.popularCourses.sort((a, b) => b.actualPrice - a.actualPrice);
    } else {
      this.popularCourses.sort((a, b) => a.id - b.id);
    }
  }

  searchCourses(): void {
    console.log(this.searchTerm);
    this.courseService.searchCourses(this.searchTerm).subscribe(courses => this.popularCourses = courses);
  }

  addToWishlist(course: Course): void {
    this.cartService.showSuccessMessage(`Product "${course.courseName}" added to the wishlist.`);
    this.wishlistService.addToWishlist(course);
  }

  isCourseInWishlist(course: Course): boolean {
    return this.wishlistService.isCourseInWishlist(course);
  }

}

