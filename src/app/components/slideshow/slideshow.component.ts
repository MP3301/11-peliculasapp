import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];

  constructor() {}

  public mySwiper: Swiper;

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
    });
    this.mySwiper.slideNext();
  }

  onSlideNext() {
    this.mySwiper.slidePrev();
  }

  onSlidePrevious() {
    this.mySwiper.slideNext();
  }

  ngOnInit(): void {
    console.log(this.movies);
  }
}
