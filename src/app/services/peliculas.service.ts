import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { map, tap } from 'rxjs/operators';
import { MovieDetails } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: 'fca082300d09c5c8e16294541ccc0690',
      language: 'en-US',
      page: this.carteleraPage.toString(),
    };
  }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        tap(() => {
          this.carteleraPage += 1;
        })
      );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((resp) => resp.results));
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: this.params,
    });
  }

  getCast(id: string) {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(map((resp) => resp.cast));
  }
}
