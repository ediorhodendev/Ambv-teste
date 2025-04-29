import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importa router-outlet para funcionar

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet] // Corrigido: importa RouterOutlet
})
export class AppComponent {}
