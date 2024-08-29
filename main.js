import { getChatBoxHtml } from "./chat-box.js";

const dataAttributes = /** @type {const} */ [
  "data-button-color",
  "data-button-text-color",
];

const css = `
#button {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  bottom: 1rem;
  right: 1rem;

  width: 3.5rem;
  height: 3.5rem;

  border-radius: 9999px;
  border: none;
  cursor: pointer;
  z-index: 999999999999;
}

#chat-box {
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  width: 300px;
  max-width: 90vw;
  min-height: 400px;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e4e4e7;
  border-radius: 1rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
  z-index: 50;
  overflow: hidden;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  background-color: #18181b;
  color: #fafafa;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem 0.75rem 0 0;
}

.chat-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.message.received {
  justify-content: flex-start;
}

.message.sent {
  justify-content: flex-end;
}

.avatar {
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  background-color: #f4f4f5;
  border-radius: 0.5rem;
  padding: 0.75rem;
  max-width: 70%;
}

.message.sent .message-content {
  background-color: #18181b;
  color: #fafafa;
}

.chat-input {
  background-color: #f4f4f5;
  padding: 0.75rem 1rem;
  border-radius: 0 0 0.75rem 0.75rem;
}

.input-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-form input {
  flex: 1;
  height: 2.5rem;
  border-radius: 0.375rem;
  border: 1px solid #e4e4e7;
  background-color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: black;
}

.input-form button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.375rem;
  background-color: #18181b;
  color: #fafafa;
  transition: background-color 0.2s;
}

.input-form button:hover {
  background-color: rgba(24, 24, 27, .9);
}

.input-form button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
`;

class WiseDeskChat extends HTMLElement {
  constructor() {
    super();

    const dataset = this.dataset;
    const buttonColor = dataset["buttonColor"];
    const buttonTextColor = dataset["buttonTextColor"];

    const button = document.createElement("button");
    button.id = "button";
    button.innerHTML = `<svg data-id="5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>`;
    button.style.backgroundColor = buttonColor ?? "#18181b";
    button.style.color = buttonTextColor ?? "#fafafa";

    button.addEventListener("click", () => {
      chatBox.style.display =
        chatBox.style.display === "none" ? "block" : "none";
    });
    button.addEventListener("keydown", (e) => {
      if (e.key === "Escape") chatBox.style.display = "none";
    });

    const chatBox = document.createElement("div");
    chatBox.id = "chat-box";
    chatBox.style.display = "none";
    chatBox.innerHTML = getChatBoxHtml();

    const style = document.createElement("style");
    style.innerHTML = css;

    this.attachShadow({ mode: "open" });
    this.assertHasShadowRoot();
    this.shadowRoot.append(button, chatBox);

    this.shadowRoot.appendChild(style);
  }

  assertHasShadowRoot() {
    if (!this.shadowRoot) {
      throw new Error("No shadow root");
    }
  }

  static get observedAttributes() {
    return dataAttributes;
  }

  /**
   * Handles attribute changes on the custom element.
   *
   * @param {string} name - The name of the changed attribute.
   * @param {string|null} oldValue - The previous value of the attribute.
   * @param {string|null} newValue - The new value of the attribute.
   *
   * @throws {Error} If the required button elements are not found in the shadow DOM.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    const buttonEl = this.shadowRoot?.querySelector("#button");
    const buttonWrapperEl = this.shadowRoot?.querySelector("button");
    const buttonIconEl = this.shadowRoot?.querySelector("#button-icon");

    if (!buttonEl) {
      throw new Error("#button not found");
    }
    if (!buttonWrapperEl) {
      throw new Error("button element not found");
    }
    if (!buttonIconEl) {
      throw new Error("#button-icon not found");
    }

    if (name === "data-button-color") {
      buttonWrapperEl.style.backgroundColor = newValue;
    } else if (name === "data-button-text-color") {
      buttonWrapperEl.style.color = newValue;
    } else {
      console.log("Unknown attribute changed", name, oldValue, newValue);
    }
  }
}

customElements.define("wise-desk-chat", WiseDeskChat);
