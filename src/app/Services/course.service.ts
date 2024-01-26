import { Injectable } from "@angular/core";
import { Course } from "../Models/course";
import { Observable, of } from "rxjs";

@Injectable()
export class CourseService{
    private description: string = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                                    mollit anim id est laborum."`;



    courses: Course[] = [
        {
          id: 1,
          courseName: "Advanced Machine Learning",
          quantity: 1,
          author: "Alex Johnson",
          actualPrice: 1199,
          discountPercentage: 15,
          image: './../assets/courses/Advanced Machine Learning.png',
          tags: ["Machine Learning", "Python"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 2,
          courseName: "JavaScript Frameworks Masterclass",
          quantity: 1,
          author: "Emily White",
          actualPrice: 899,
          discountPercentage: 20,
          image: './../assets/courses/JavaScript Frameworks Masterclass.png',
          tags: ["JavaScript", "React", "Vue"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 3,
          courseName: "Full Stack Development with Django",
          quantity: 1,
          author: "Chris Turner",
          actualPrice: 1499,
          discountPercentage: 10,
          image: './../assets/courses/Full Stack Development with Django.png',
          tags: ["Python", "Django", "JavaScript"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 4,
          courseName: "Cybersecurity Essentials",
          quantity: 1,
          author: "Sophia Davis",
          actualPrice: 1299,
          discountPercentage: 25,
          image: './../assets/courses/Cybersecurity Essentials.png',
          tags: ["Cybersecurity", "Network Security"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 5,
          courseName: "Mobile App UX Design",
          quantity: 1,
          author: "Daniel Smith",
          actualPrice: 999,
          discountPercentage: 18,
          image: './../assets/courses/Mobile App UX Design.png',
          tags: ["UX Design", "Mobile App Development"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 6,
          courseName: "Node.js for Beginners",
          quantity: 1,
          author: "Ava Williams",
          actualPrice: 699,
          discountPercentage: 22,
          image: './../assets/courses/Node.js for Beginners.png',
          tags: ["Node.js", "JavaScript"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 7,
          courseName: "Artificial Intelligence in Business",
          quantity: 1,
          author: "Noah Turner",
          actualPrice: 1599,
          discountPercentage: 12,
          image: './../assets/courses/Artificial Intelligence in Business.png',
          tags: ["Artificial Intelligence", "Business"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 8,
          courseName: "Swift Programming for iOS",
          quantity: 1,
          author: "Emma Johnson",
          actualPrice: 1099,
          discountPercentage: 17,
          image: './../assets/courses/Swift Programming for iOS.png',
          tags: ["iOS", "Swift"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 9,
          courseName: "Responsive Web Design Principles",
          quantity: 1,
          author: "Liam White",
          actualPrice: 799,
          discountPercentage: 21,
          image: './../assets/courses/Responsive Web Design Principles.png',
          tags: ["Web Design", "HTML", "CSS"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 10,
          courseName: "Java Fundamentals",
          quantity: 1,
          author: "Olivia Turner",
          actualPrice: 899,
          discountPercentage: 0,
          image: './../assets/courses/Java Fundamentals.png',
          tags: ["Java"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 11,
          courseName: "Game Development with Unity",
          quantity: 1,
          author: "Lucas Davis",
          actualPrice: 1399,
          discountPercentage: 14,
          image: './../assets/courses/Game Development with Unity.png',
          tags: ["Game Development", "Unity"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 12,
          courseName: "Python for Data Science",
          quantity: 1,
          author: "Aria Smith",
          actualPrice: 1199,
          discountPercentage: 0,
          image: './../assets/courses/Python for Data Science.png',
          tags: ["Python", "Data Science"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 13,
          courseName: "Frontend Development Bootcamp",
          quantity: 1,
          author: "Mia Johnson",
          actualPrice: 999,
          discountPercentage: 18,
          image: './../assets/courses/Frontend Development Bootcamp.png',
          tags: ["HTML", "CSS", "JavaScript"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 14,
          courseName: "C# Programming Mastery",
          quantity: 1,
          author: "Jackson White",
          actualPrice: 1099,
          discountPercentage: 0,
          image: './../assets/courses/C Programming Mastery.png',
          tags: ["C#"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 15,
          courseName: "Angular Framework Deep Dive",
          quantity: 1,
          author: "Ava Turner",
          actualPrice: 1299,
          discountPercentage: 15,
          image: './../assets/courses/Angular Framework Deep Dive.png',
          tags: ["Angular"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 16,
          courseName: "Data Visualization with D3.js",
          quantity: 1,
          author: "Ethan Davis",
          actualPrice: 899,
          discountPercentage: 0,
          image: './../assets/courses/Data Visualization with D3.js.png',
          tags: ["Data Visualization", "D3.js"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 17,
          courseName: "Android App Development Basics",
          quantity: 1,
          author: "Isabella Smith",
          actualPrice: 799,
          discountPercentage: 0,
          image: './../assets/courses/Android App Development Basics.png',
          tags: ["Android", "Mobile App Development"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 18,
          courseName: "Vue.js for Frontend Development",
          quantity: 1,
          author: "Logan Johnson",
          actualPrice: 999,
          discountPercentage: 18,
          image: './../assets/courses/Vue.js for Frontend Development.png',
          tags: ["Vue.js", "JavaScript"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 19,
          courseName: "Cloud Computing Fundamentals",
          quantity: 1,
          author: "Sophie Turner",
          actualPrice: 1199,
          discountPercentage: 16,
          image: './../assets/courses/Cloud Computing Fundamentals.png',
          tags: ["Cloud Computing"],
          isInWishlist: false,
          offerEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      ]

    //  courses = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Course ${i + 1}` }));

      

    getAllcourses(){
        return new Observable<Course[]>((sub) => {
            setTimeout(() => {
                sub.next(this.courses);
            }, 5000)
        })
    }

    getCourseById(courseId: number): Observable<Course> {
      // Fetch the course based on the ID from your service or wherever you store the courses
      const course = this.courses.find((c) => c.id === courseId);
  
      // Simulating an asynchronous operation with Observable
      return of(course);
    }


    searchCourses(term: string): Observable<Course[]> {
      return of(this.courses.filter(course => course.courseName.toLowerCase().includes(term.toLowerCase()) ||
                                            course.author.toLowerCase().includes(term.toLowerCase()) ||
                                            course.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))));
    }
}