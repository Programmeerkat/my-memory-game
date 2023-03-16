import { Component, State, Listen, Host, h } from '@stencil/core';

@Component({
  tag: 'my-table',
  styleUrl: 'my-table.css'
})
export class MyTable {
  
  @State() counter = 0;
  
  @State() shuffledCards = [];
  
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

  @Listen('showEvent')
  showEventHandler(event: CustomEvent) {
    if (this.locked) {
      return
    }
    const card = event.detail;
    const oldIsShown = this.shuffledCards[card.cardId].isShown;
    if (!oldIsShown) {
      this.shuffledCards[card.cardId].isShown= !this.shuffledCards[card.cardId].isShown;
    }
    this.openedCards.push(card);
    if (this.openedCards.length === 2) {
      this.locked = true;
      setTimeout(() => {
        if (this.openedCards[0].color == this.openedCards[1].color) {
          this.shuffledCards[this.openedCards[0].cardId].isSolved = true;
          this.shuffledCards[this.openedCards[1].cardId].isSolved = true;
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
        {this.shuffledCards.map(card => (<my-card key={card.cardId} card={card} try={this.counter}></my-card>))}
      </Host>
    );
  }
}
