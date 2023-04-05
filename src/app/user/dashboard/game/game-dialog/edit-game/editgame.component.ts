import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GameMaster } from 'src/app/model/GameMaster';

@Component({
  selector: 'app-editgame',
  templateUrl: './editgame.component.html',
  styleUrls: ['./editgame.component.scss'],

})

export class EditgameComponent implements OnInit {
  editGameForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditgameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameMaster
  ) {
    this.editGameForm = new FormGroup({
      "id": new FormControl(''),
      "storeId": new FormControl(),
      "gameNumber": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "price": new FormControl('', Validators.required),
      "bookTotal": new FormControl('', Validators.required),
      "isActive": new FormControl(),
    });

    this.editGameForm.setValue(data);
  }

  ngOnInit(): void {
  }
  save(): void {
    this.dialogRef.close(Object.assign(new GameMaster(), this.editGameForm.value));
  }
}
