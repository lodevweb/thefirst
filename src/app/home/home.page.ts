import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pseudo: string = "";
  difficulty: string = "easy";
  sauvegarder: boolean = false;

  constructor(private toastCtrl: ToastController, private router: Router, private storage: Storage) {}

  async ngOnInit () {
    await this.storage.create();
    this.storage.get('pseudo').then((data: string) => {
      this.pseudo = data;
    })
    this.storage.get('difficulty').then((data: string) => {
      this.difficulty= data;
    })
  }

  async start() {
    if (this.pseudo === "" || this.pseudo.length < 3 || this.difficulty === "") {
      const toast = await this.toastCtrl.create({
        message: "Veuillez saisir un pseudo ET une difficulté",
        duration: 3000
      });
      toast.present();
    } else {
      if (this.sauvegarder) {
        this.storage.set('pseudo', this.pseudo);
        this.storage.set('difficulty', this.difficulty);
      }
      this.router.navigate(['/game', this.pseudo, this.difficulty]);
    }
  }


}
