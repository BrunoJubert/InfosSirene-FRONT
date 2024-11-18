import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../core/services/details.service'; 
import { AuthService } from '../../core/services/auth.service'; 

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  company: any; 
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const siren = this.route.snapshot.paramMap.get('siren');

    if (siren) {
      this.getCompanyDetails(siren);
    } else {
      console.error('SIREN is null or undefined');
    }

    // Souscrire à l'état de connexion
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user; // Mettre à jour l'état de connexion en fonction de la présence d'un utilisateur
    });
  }

  getCompanyDetails(siren: string): void {
    this.detailsService
      .getCompanyDetails(`denominationUniteLegale:${siren}`)
      .subscribe((data) => {
        this.company = data.unitesLegales[0]; 
      });
  }

  saveSearch(): void {
    console.log('Recherche enregistrée');
  }

  printDetails(): void {
    window.print();
  }
}
