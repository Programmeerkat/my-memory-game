import { Component, Prop, Event, EventEmitter, Host, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css'
})
export class MyCard {

  @Prop() card: {cardId: number, isShown: boolean, isSolved: boolean, color: string};

  @Prop() try: number = 0;

  @Event() showEvent: EventEmitter;

  clickHandler() {
    if (!this.card.isSolved) {
      this.showEvent.emit(this.card);
    }
  }

  render() {
    return (
      <Host
        class={`my-card ${this.card.isSolved ? 'solved' : this.card.isShown ? this.card.color : ''}`}
        onClick={this.clickHandler.bind(this)}
      >
      </Host>
    );
  }
}
