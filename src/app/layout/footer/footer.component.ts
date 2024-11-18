import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent  implements OnInit {
  currentYear: number= 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}