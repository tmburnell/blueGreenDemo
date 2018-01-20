import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

class Color {
  color: string;
}

enum Version {
  v1 = "v1",
  v2 = "v2"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public current_version:string = "v2";

  public box1_color: string;
  public box2_color: string;

  fetureFlags:Object = {
    "v1": true,
    "v2": false
  };

  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.getFeatureFlags();
  }

  getFeatureFlags() {
    this.getFeatures().subscribe((res) => {
      this.fetureFlags = res;

      this.setBoxOneColor();
      this.setBoxTwoColor();
    });
  }

  setBoxOneColor() {
    this.getColor(this.current_version).subscribe((res: Color)=>{
      this.box1_color = res.color;
    });
  }

  setBoxTwoColor() {
    let version = this.getLastAvailableFeatureFlag(this.current_version, this.fetureFlags);

    this.getColor(version).subscribe((res: Color)=>{
      this.box2_color = res.color;
    });
  }

  getLastAvailableFeatureFlag(current_version: string, featureFlags: Object): string {
    let version_number: number;

    do {
      if(featureFlags[current_version]){
        break;
      }
      version_number = +current_version.substring(1) - 1;
      current_version = `v${version_number}`;
    } while (version_number > 0)

    return current_version;
  }

  getColor(version: string): Observable<Object> {
    let version_url = `api/${version}/color`

    return this.http.get(version_url);
  }

  getFeatures(): Observable<Object> {
    return this.http.get('api/v1/features');
  }
}
