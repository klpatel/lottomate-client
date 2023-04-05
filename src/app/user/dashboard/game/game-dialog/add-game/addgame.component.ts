import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GameMaster } from 'src/app/model/GameMaster';

@Component({
    selector: 'app-addgame',
    templateUrl: './addgame.component.html',
    styleUrls: ['./addgame.component.scss'],

})
export class AddgameComponent implements OnInit {
    addGameForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddgameComponent>) {
        this.addGameForm = new FormGroup({
            "id": new FormControl(0),
            "storeId": new FormControl(),
            "gameNumber": new FormControl('', Validators.required),
            "name": new FormControl('', Validators.required),
            "price": new FormControl('', Validators.required),
            "bookTotal": new FormControl('', Validators.required),
            "isActive": new FormControl(),
        });
    }
    ngOnInit(): void {
    }
    save(): void {
        console.log(this.addGameForm.value);
        this.dialogRef.close(Object.assign(new GameMaster(), this.addGameForm.value));
        console.log(this.addGameForm.value);
    }


}