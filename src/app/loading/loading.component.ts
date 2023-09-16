import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  secondsToRetry = 3;
  interval: number | undefined;
  /**
   *
   */
  constructor(private router: Router, private studentService: PersonService) {}
  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.secondsToRetry > 0) {
        this.secondsToRetry--;
      } else {
        this.secondsToRetry = 10;
        this.studentService.greeting().subscribe((result) => {
          // console.log(result.content == 'Hello, World!');
          if (result.content == 'Hello, World!') {
            clearInterval(this.interval);
            console.log('result: ', result);
            this.router.navigateByUrl('/');
          }
        });
      }
    }, 1000);
  }
  // this.router.navigateByUrl('/loading');
}
