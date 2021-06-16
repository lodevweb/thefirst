import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor() { }

  async getQuestions(nb: number, difficult: string) {
    return [ 
      {
        category: "Entertainment: Japanese Anime & Manga",
        type: "multiple",
        difficult: "easy",
        question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?",
        correct_response: "The Salamander",
        incorrect_responses: ["The Dragon Slayer", "The Dragon", "The Demon"] 
      }, {
        category: "Entertainment: Video Games",
        type: "boolean",
        difficult: "medium",
        question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.",
        correct_response: "False",
        incorrect_responses: ["True"]
      }
    ];
  }
}
