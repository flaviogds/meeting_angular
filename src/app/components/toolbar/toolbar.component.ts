import { Component } from '@angular/core';
import { Icons } from '../../shared/fontawesome';

@Component({
  selector: 'meeting-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  icons = Icons;
}
