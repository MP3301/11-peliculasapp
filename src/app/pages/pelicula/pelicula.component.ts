import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieDetails;
  public cast: Cast[] = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.activatedroute.snapshot.params.id;

    console.log(id);
    this.peliculasService.getPeliculaDetalle(id).subscribe((movie) => {
      this.pelicula = movie;
      console.log(movie);
    });
    this.peliculasService.getCast(id).subscribe((cast) => {
      console.log(cast);
      this.cast = cast;
    });
  }

  onRegresar() {
    this.location.back();
  }
}
