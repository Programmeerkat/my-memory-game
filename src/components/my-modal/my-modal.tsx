import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'my-modal',
  styleUrl: 'my-modal.css'
})
export class MyModal {

  @Prop() text: string;

  @Event() startOver: EventEmitter;

  clickHandler() {
    this.startOver.emit();
  }

  render() {
    return (
      <Host class="my-modal">
        <p>{this.text}</p>
        <button onClick={this.clickHandler.bind(this)}>{`Start over`}</button>
      </Host>
    );
  }
}
