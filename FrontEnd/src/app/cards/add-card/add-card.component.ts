import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "add-card",
  templateUrl: "./add-card.component.html",
  styleUrls: ["./add-card.component.css"]
})
export class AddCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Output() cardCreated = new EventEmitter<{ title: string }>();

  onCreateCard(formData: NgForm) {
    this.cardCreated.emit({ title: formData.value.title });
    formData.reset();
  }
}
