import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = document.documentElement.scrollTop || document.body.scrollTop;

    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    console.log(pos, max);

    if (pos > pos - 1) {
      this.peliculasService.getCartelera().subscribe((resp) => {
        this.movies.push(...resp.results);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) {}
  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe((resp) => {
      console.log(resp);
      this.movies = resp.results;
      this.moviesSlideshow = resp.results;
    });
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }
}
