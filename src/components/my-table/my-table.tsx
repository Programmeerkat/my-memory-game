import { Component, State, Listen, Host, h } from '@stencil/core';

@Component({
  tag: 'my-table',
  styleUrl: 'my-table.css'
})
export class MyTable {

  @State() gameHasEnded = false;
  
  @State() counter = 0;
  
  @State() shuffledCards = [];

  private numberOfMoves = 0;
  
  private openedCards = [];
  
  private locked = false;
  
  private colors = [
    "red",
    "lime",
    "blue",
    "maroon",
    "green",
    "navy",
    "yellow",
    "magenta",
    "cyan",
    "olive",
    "purple",
    "teal"
  ]

  @Listen('startOver')
  startOverHandler() {
    this.gameHasEnded = false;
    this.shuffleCards();
    this.counter++;
  }

  @Listen('showEvent')
  showEventHandler(event: CustomEvent) {
    if (this.locked) {
      return;
    }
    const card = event.detail;
    const oldIsShown = this.shuffledCards[card.cardId].isShown;
    if (!oldIsShown) {
      this.shuffledCards[card.cardId].isShown= !this.shuffledCards[card.cardId].isShown;
    } 
    if (this.openedCards.length === 1 && this.openedCards[0].cardId === card.cardId) {
      return;
    }
    this.openedCards.push(card);
    if (this.openedCards.length === 2) {
      this.numberOfMoves++;
      this.locked = true;
      setTimeout(() => {
        if (this.openedCards[0].color == this.openedCards[1].color) {
          this.shuffledCards[this.openedCards[0].cardId].solved = true;
          this.shuffledCards[this.openedCards[1].cardId].solved = true;
          if (this.shuffledCards.filter(card => !card.solved).length === 0 ) {
            this.gameHasEnded = true;
          }
        }
        this.openedCards = [];
        for (let i = 0; i < 24; i++) {
          this.shuffledCards[i].isShown = false;
        }
        this.counter++;
        this.locked = false;
      }, 500);
    }
    this.counter++;
  }

  shuffleCards() {
    let shuffledCards = [];
    for (let i = 0; i < 24; i++) {
      const card = {
        cardId: undefined,
        isShown: false,
        solved: false,
        color: this.colors[i % 12]
      }
      const randomNumber = Math.floor(Math.random() * i);
      shuffledCards.splice(randomNumber, 0, card);
    }
    for (let i = 0; i < 24; i++) {
      shuffledCards[i].cardId = i;
    }
    this.shuffledCards = shuffledCards;
  }

  connectedCallback() {
    this.shuffleCards();
  }

  render() {
    return (
      <Host class="my-table">
        {this.gameHasEnded && <my-modal text={`Congratulations, you have won the game in ${this.numberOfMoves} moves!`}></my-modal>}
        {this.shuffledCards.map(card => (<my-card key={card.cardId} card={card} try={this.counter}></my-card>))}
      </Host>
    );
  }
}
