import { Component, State, Listen, Host, h } from '@stencil/core';

@Component({
  tag: 'my-table',
  styleUrl: 'my-table.css'
})
export class MyTable {
  
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

  @State() shuffledCards = [];

  @Listen('showEvent')
  showEventHandler(event: CustomEvent) {
    const color = event.detail;
  }

  shuffleCards() {
    let cards = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11];
    let shuffledCards = [];
    for (let i = 0; i < 24; i++) {
      const size = 24 - i;
      const randomNumber = Math.floor(Math.random() * size);
      cards.splice(randomNumber,1);
      shuffledCards.push(randomNumber);
    }
    this.shuffledCards = shuffledCards;
  }

  connectedCallback() {
    this.shuffleCards();
  }

  render() {
    return (
      <Host class="my-table">
        {this.shuffledCards.map(item => <my-card color={this.colors[item]}></my-card>)}
      </Host>
    );
  }
}
