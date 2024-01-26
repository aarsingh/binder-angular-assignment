import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  @Input() course: Course;

  selectedCourse: Course;
  courseId: number;

  courseService: CourseService = inject(CourseService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  cartService: CartService = inject(CartService);
  wishlistService: WishlistService = inject(WishlistService);
  paramMapObs;

  courseDiscount = '';
  courseDiscountPrice = 0;
  timeRemaining: string;
  private timerInterval: any;
  modalMessage: string;
  courseModals: Map<number, boolean> = new Map<number, boolean>();

  ngOnInit() {

    this.paramMapObs = this.activeRoute.paramMap.subscribe((data) => {
      this.courseId = +data.get('id');
      this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId);
    })

    if (this.selectedCourse.discountPercentage > 0) {
      this.timerInterval = setInterval(() => {
        this.calculateTimeRemaining(this.selectedCourse);
      }, 1000);
    }

    this.getDiscount();
  }

  private calculateTimeRemaining(course) {
    const now = new Date().getTime();
    const offerEnd = new Date(course.offerEndDate).getTime();

    const timeDifference = offerEnd - now;

    if (timeDifference > 0) {
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      this.timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
    } else {
      this.timeRemaining = 'Offer expired';
    }
  }

  getDiscount() {
    let price = (this.selectedCourse.discountPercentage / 100) * this.selectedCourse.actualPrice;
    this.courseDiscountPrice = this.selectedCourse.actualPrice - price;
  }

  addToCart(course: Course, quantity: number) {
    const index = this.cartService.getCart().findIndex(item => item.id === course.id);
    if (index !== -1) {
      this.modalMessage = `The course "${course.courseName}" is already in your cart!`;
      // Set showModal for the specific course
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

  addToWishlist(course: Course): void {
    this.cartService.showSuccessMessage(`Product "${course.courseName}" added to the Wishlist.`);
    this.wishlistService.addToWishlist(course);
  }

  ngOnDestroy() {
    this.paramMapObs.unsubscribe();
    clearInterval(this.timerInterval);
  }

}
