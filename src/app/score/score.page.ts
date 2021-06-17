import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  score: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.score = this.activatedRoute.snapshot.params.score;
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}