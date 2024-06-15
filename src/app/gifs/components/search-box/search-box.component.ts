import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})

export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  public searchTag(): void{
    const tag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(tag);
    this.tagInput.nativeElement.value = "";
  }
}
