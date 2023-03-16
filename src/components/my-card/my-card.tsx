import { Component, Prop, State, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css'
})
export class MyCard {

  @Prop() color: string;

  @State() isShown = false;

  @Event() showEvent: EventEmitter;

  clickHandler() {
    this.isShown = !this.isShown;
    this.showEvent.emit(this.color);
  }

  render() {
    console.log(this.color)
    return (
      <Host
        class={`my-card ${!this.isShown ? this.color : ''}`}
        onClick={this.clickHandler.bind(this)}
      >
      </Host>
    );
  }
}
