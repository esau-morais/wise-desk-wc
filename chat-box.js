export const getChatBoxHtml = () => `
<div class="chat-container">
  <div class="chat-header">
    <h3>Chat with us</h3>
  </div>
  <div class="chat-messages">
    <div class="message received">
      <span class="avatar">
        <img alt="Avatar" src="https://ui-avatars.com/api/?name=John+Doe" />
      </span>
      <div class="message-content">
        <p>Hello, how can I assist you today?</p>
      </div>
    </div>
    <div class="message sent">
      <div class="message-content">
        <p>I have a question about your product. Can you help me?</p>
      </div>
      <span class="avatar">
        <img alt="Avatar" src="https://ui-avatars.com/api/?name=John+Doe" />
      </span>
    </div>
  </div>
  <div class="chat-input">
    <form class="input-form">
      <input
        type="text"
        placeholder="Type your message..."
        autocomplete="off"
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m22 2-7 20-4-9-9-4Z"></path>
          <path d="M22 2 11 13"></path>
        </svg>
        <span class="sr-only">Send</span>
      </button>
    </form>
  </div>
</div>
`;
