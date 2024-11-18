import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private apiUrl = 'https://api.insee.fr/entreprises/sirene/V3.11/siret'; // Remplacez par l'URL de l'API

  constructor(private http: HttpClient) {}

  getCompanyDetails(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('nombre', pageSize.toString()) // Nombre d'unités à afficher
      .set('debut', ((page - 1) * pageSize).toString()) // Rang du premier établissement
      .set('tri', 'true'); // Activer le tri si nécessaire

    return this.http.get(this.apiUrl, { params });
  }
}
