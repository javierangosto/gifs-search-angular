import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  private _hasLoaded: boolean = false;

  get hasLoaded(): boolean{
    return this._hasLoaded;
  }

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required.');
  }

  @Input()
  public url!: string;

  @Input()
  public alt: string = "";

  public onLoad(): void{
    this._hasLoaded = true;
  }
}
