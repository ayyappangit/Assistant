import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private url: string = "http://localhost:3007/api/todo/";
  constructor(private http: Http) {}
}
