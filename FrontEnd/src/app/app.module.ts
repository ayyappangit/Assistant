import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragandDropMaterialModule } from "../material-module";
import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from "@angular/material/dialog";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { MatTabsModule } from "@angular/material/tabs";
import {
  HomeLoadComponent,
  DialogCreateTeam,
  DialogCreateBoard,
  DialogCreateList,
  DialogAddUserToTeam,
  DialogCardUpdate,
  DialogPieChart
} from "../app/home-load/home-load.component";
import { AddCardComponent } from "./cards/add-card/add-card.component";

@NgModule({
  declarations: [
    HomeLoadComponent,
    DialogCreateTeam,
    DialogCreateBoard,
    DialogCreateList,
    DialogAddUserToTeam,
    AddCardComponent,
    DialogCardUpdate,
    DialogPieChart
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DragandDropMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    MatDialogModule,
    ChartsModule,
    MatTabsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }) // ToastrModule added
  ],
  providers: [],
  entryComponents: [
    DialogCreateTeam,
    DialogCreateBoard,
    DialogCreateList,
    DialogAddUserToTeam,
    DialogCardUpdate,
    DialogPieChart
  ],
  bootstrap: [HomeLoadComponent]
})
export class AppModule { }
