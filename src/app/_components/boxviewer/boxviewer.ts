import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoxService} from '../../_services/box';

@Component({
  selector: 'app-boxviewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxviewer.html',
  styleUrl: './boxviewer.css',
})
export class Boxviewer {
  public boxService = inject(BoxService);
}
