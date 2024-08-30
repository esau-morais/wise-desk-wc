export const getChatBoxHtml = () => `
<div class="chat-container">
  <div class="chat-header">
    <h3>Pergunte ao Wise</h3>
  </div>
  <div class="chat-messages">
    <div class="message received">
      <span class="avatar">
        <img alt="Wise Avatar" src="https://ui-avatars.com/api/?name=Wise" />
      </span>
      <div class="message-content">
        <p>Olá, Eu sou o Wise! Como posso lhe ajudar?</p>
      </div>
    </div>
  </div>
  <div class="chat-input">
    <form class="input-form">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
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
