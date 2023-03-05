import { LitElement, html, css } from 'lit';
import { MemeMaker } from '@lrnwebcomponents/meme-maker';

const customImage = new URL(
  '../assets/스크린샷 2023-03-03 122605.png',
  import.meta.url
).href;
class PetCard extends LitElement {
  static properties = {
    header: { type: String },
    accent: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host([accent]) #cards {
      background-color: blue;
    }
    meme-maker {
      --meme-maker-font-size: 25px;
      --meme-maker-font-size-medium: 20px;
      --meme-maker-font-size-small: 16px;
      width: 200px;
    }
    .card {
      border: 400px;
      background-color: gray;
    }
    .heading {
      border: 2px solid black;
    }
    .description {
      border: 2px solid black;
    }
    .image {
      border: 2px solid black;
    }
  `;

  constructor() {
    super();
    this.header = 'My app';
    this.accent = false;
  }

  connectedCallback() {
    super.connectedCallback();

    // Add event listeners to buttons
    this.shadowRoot.querySelector('#Bgcolor').addEventListener('click', () => {
      this.accent = !this.accent;
    });

    this.shadowRoot
      .querySelector('#change-title')
      .addEventListener('click', () => {
        this.shadowRoot.querySelector('.heading h1').textContent = 'New Title';
      });

    this.shadowRoot
      .querySelector('#delete-card')
      .addEventListener('click', () => {
        this.remove();
      });

    this.shadowRoot
      .querySelector('#duplicate')
      .addEventListener('click', () => {
        const clone = this.cloneNode(true);
        this.parentElement.appendChild(clone);
      });

    this.shadowRoot.querySelector('#detail').addEventListener('click', () => {
      const details = this.shadowRoot.querySelector('details');
      details.open = !details.open;
    });
  }

  toggleAccent() {
    this.accent = !this.accent;
  }

  changeTitle() {
    const heading = this.shadowRoot.querySelector('.heading h1');
    heading.textContent = 'New Title';
  }

  deleteCard() {
    if (this.parentElement.childElementCount > 1) {
      this.parentElement.removeChild(this);
    }
  }

  duplicateCard() {
    const clone = document.createElement('pet-card');
    clone.header = this.header;
    clone.accent = this.accent;
    this.parentElement.appendChild(clone);
  }

  toggleDetail() {
    const details = this.shadowRoot.querySelector('details');
    details.toggleAttribute('open');
  }

  render() {
    return html`
      <button id="Bgcolor">Background Color</button>
      <button id="change-title">Change Title</button>
      <button id="delete-card">Delete Card</button>
      <button id="duplicate">Duplicate</button>
      <button id="detail">Detail</button>

      <div id="cards" class="card">
        <div class="heading">
          <div>
            <h1>Coffee Dog</h1>
          </div>

          <div class="description">
            <p>"Good morning I like coffeeeeeeeeeeeeeee" Wat Dog</p>
          </div>

          <div class="image">
            <meme-maker
              image-url="${customImage}"
              top-text="Wat"
              bottom-text="Dog"
            ></meme-maker>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('pet-card', PetCard);
