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
export class CourseDetailComponent implements OnInit, OnDestroy{

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

  ngOnInit(){
    // this.courseId = this.activeRoute.snapshot.params['id'];
    //this.courseId = +this.activeRoute.snapshot.paramMap.get('id');
    // this.activeRoute.params.subscribe((data) => {
    //   this.courseId = +data['id'];
    //   this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId);
    // })

    this.paramMapObs = this.activeRoute.paramMap.subscribe((data) => {
      this.courseId = +data.get('id');
      this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId);
    })

  
    // this.calculateTimeRemaining(this.selectedCourse);
    // Update the timer every second

    if(this.selectedCourse.discountPercentage > 0){
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
    // return this.selectedCourse.reduce((total, course) => {
      let price = (this.selectedCourse.discountPercentage / 100 ) * this.selectedCourse.actualPrice;
       this.courseDiscountPrice = this.selectedCourse.actualPrice - price;
       console.log(this.selectedCourse)
      //  return total + discountedPrice;
    // }, 0);
  }

  addToCart(course: Course, quantity: number) {
    const index = this.cartService.getCart().findIndex(item => item.id === course.id);
    if (index !== -1) {
      // this.modalMessage = `The course "${course.courseName}" is already in your cart. Do you want to add this course again?`;
      this.modalMessage = `The course "${course.courseName}" is already in your cart!`;
       // Set showModal for the specific course
       this.courseModals.set(course.id, true);
    } else {
      // this.modalMessage = `Are you sure you want to add "${course.courseName}" course to your cart?`;
      this.cartService.showSuccessMessage(`Product "${course.courseName}" added to the cart.`);
      this.cartService.addToCart(course, quantity);
      // Set showModal for the specific course
      // this.courseModals.set(course.id, true);
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

  ngOnDestroy(){
    this.paramMapObs.unsubscribe();
    clearInterval(this.timerInterval);
  }

}
