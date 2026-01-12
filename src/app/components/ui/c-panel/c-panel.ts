import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'panel',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './c-panel.html',
  styleUrl: './c-panel.scss',
})
export class CPanel {
  @Input() titulo!: string;
  @Input() numero?: number;
  @Input() info?: string;
  @Input() routerLinkVer?: string;
  @Input() queryParamsAdd?: any;
}
