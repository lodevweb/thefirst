import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from './open-trivia-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  pseudo:string ='';
  difficulty:string = "easy"
  sauvegarder:boolean = false;
  questions =[];
  currentQuestion;
  numeroQuestion=0;
  points:number =0;
  beginGame:boolean =false;
  nextQuestion: boolean = false;
  endGame:boolean = false;

  constructor(private toastCtrl: ToastController, private openTriviaService: OpenTriviaService,private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.pseudo = this.activatedRoute.snapshot.params.pseudo;
      this.difficulty = this.activatedRoute.snapshot.params.difficulty;
      this.loadQuestions();
    }

  ngOnInit() {}

  async loadQuestions(){
    try{
      this.questions = await this.openTriviaService.getQuestions(10, this.difficulty);
      this.getCurrentQuestion();
    } catch (error){
      const toast = await this.toastCtrl.create({
        message: error,
        duration: 10000,
      });
      toast.present();
  }
}
  getCurrentQuestion(){
    this.currentQuestion = this.questions[this.numeroQuestion];
    this.currentQuestion.answers = [];
    this.currentQuestion.answers.push(this.currentQuestion.correct_answer);
    for (let answer of this.currentQuestion.incorrect_answers) {
      this.currentQuestion.answers.push(answer);
    }
    this.currentQuestion.answers = this.shuffleArray(this.currentQuestion.answers);
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


  checkanswer(answer: string) {
  this.nextQuestion = true;
  if (answer === this.currentQuestion.correct_answer) {
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

  goToScore() {
    this.router.navigate(['score', this.points]);
  }
}