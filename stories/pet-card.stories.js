import { html } from 'lit';
import '../src/pet-card.js';

export default {
  title: 'PetCard',
  component: 'pet-card',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <pet-card
      style="--pet-card-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </pet-card>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
