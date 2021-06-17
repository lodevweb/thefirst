import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = "";
  difficulty: string = "easy";

  constructor(private toastCtrl: ToastController, private router: Router) {}

  async start() {
    if (this.pseudo === "" || this.pseudo.length < 3 || this.difficulty === "") {
      const toast = await this.toastCtrl.create({
        message: "Veuillez saisir un pseudo ET une difficulté",
        duration: 3000
      });
      toast.present();
    } else {
      this.router.navigate(['/game', this.pseudo, this.difficulty]);
    }
  }
}
