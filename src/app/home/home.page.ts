import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../open-trivia-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo:string ='';
  difficult:string = "easy"
  sauvegarder:boolean = false;
  error:boolean = false;
  questions =[];
  currentQuestion;
  numeroQuestion=0;
  points:number =0;
  beginGame:boolean =false;
  nextQuestion: boolean = false;
  endGame:boolean = false;

  constructor(private toastCtrl: ToastController, private openTriviaService: OpenTriviaService) {}

  async start(){
    console.log(this.pseudo, this.difficult, this.sauvegarder);
    if(this.pseudo === "" || this.pseudo.length < 3 || this.difficult === ""){
      const toast = await this.toastCtrl.create({
        message: "Veuillez saisir un pseudo ET une difficulté",
        duration: 3000,
        position:'bottom'
      });
      toast.present();
      } else {
     this.loadQuestions();
     this.beginGame = true;
     }
  }

  async loadQuestions(){
    this.questions = await this.openTriviaService.getQuestions(2, this.difficult);
    this.getCurrentQuestion();
  }

  getCurrentQuestion(){
    this.currentQuestion = this.questions[this.numeroQuestion];
    this.currentQuestion.responses = [];
    this.currentQuestion.responses.push(this.currentQuestion.correct_response);
    for (let response of this.currentQuestion.incorrect_responses) {
      this.currentQuestion.responses.push(response);
    }
    this.currentQuestion.responses = this.shuffleArray(this.currentQuestion.responses);
  }


  shuffleArray(array) {
   for(var i = array.length-1;i>0;i--){
    var j= Math.floor(Math.random()*(i+1));
    var temp=array[i];
    array[i]=array[j];
    array[j]=temp;
  }
  return array;
}


  checkResponse(response: string) {
  this.nextQuestion = true;
  if (response === this.currentQuestion.correct_response) {
    this.points++;
    console.log(this.points);
  }
  if (this.numeroQuestion >= this.questions.length - 1) {
    this.endGame = true;
  }
}

  goToNextQuestion() {
    this.numeroQuestion++;
    this.nextQuestion = false;
    this.getCurrentQuestion();
  }
}