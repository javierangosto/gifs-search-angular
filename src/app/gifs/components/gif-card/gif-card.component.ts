import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-gif-card',
  templateUrl: './gif-card.component.html'
})
export class GifCardComponent implements OnInit {
  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required.');
  }

  @Input()
  public gif!: Gif;

}
