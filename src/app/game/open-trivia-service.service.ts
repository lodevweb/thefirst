import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor(private http: HttpClient) { }

  async getQuestions(nb: number, difficult:string){
    //je fais ma requete -> promise la converti -> je peux la résoudre => ensuite je l'implemente dans le home page
    const result = await this.http.get("https://opentdb.com/api.php?amount=" + nb + "&difficulty=" + difficult).toPromise();
    if (result && result['results']){
      return result['results'];
    } else {
      throw Error("erreur : impossible de récuperer les questions. Veuillez vérifier votre connexion");
    }
  }
}
 /**  async getQuestions(nb: number, difficult: string) {
    return [ 
      {
        category: "Entertainment: Japanese Anime & Manga",
        type: "multiple",
        difficult: "easy",
        question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
        correct_answer: "The Salamander",
        incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] 
      }, {
        category: "Entertainment: Video Games",
        type: "boolean",
        difficult: "medium",
        question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.",
        correct_answer: "False",
        incorrect_answers: ["True"]
      }
    ];
  }*/

