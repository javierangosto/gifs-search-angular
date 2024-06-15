import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_URL: string = "https://api.giphy.com/v1/gifs";
const GIPHY_APP_KEY: string = "Gk1kxaTUFVJuZuHkZUK56KaZ4zF1Gghr";
const LOCAL_STORAGE_KEY: string = "History";

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient){
    this.loadLocalStorage();
  }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void{
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(( oldTag => oldTag !== tag));
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  public async searchTag(tag: string): Promise<void>{
    if (tag.length == 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set("api_key", GIPHY_APP_KEY)
      .set("q", tag)
      .set("limit", "10");

    this.http.get<SearchResponse>(`${GIPHY_URL}/search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data
      });
  }

  private saveLocalStorage(): void{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if (! localStorage.getItem(LOCAL_STORAGE_KEY)) return;

    this._tagsHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    if (this._tagsHistory){
      this.searchTag(this._tagsHistory[0]);
    }
  }
}
