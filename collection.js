document.addEventListener("DOMContentLoaded", async () => {

  // DOM Elements
  const container = document.getElementById("notes-collection");
  const modal = document.getElementById("modal");
  const noteTitle = document.getElementById("note-title");
  const noteBody = document.getElementById("note-body");
  const closeButton = document.querySelector(".close-button");

  // --- Load Notes Function ---
  async function loadNotes() {
    const { notes = [] } = await chrome.storage.local.get("notes");
    container.innerHTML = "";

    if (!notes.length) {
      container.innerHTML = `
        <p>Sorry! No saved notes found. Please chat with Naina first...</p>
      `;
      return;
    }

    // Show most recent first
    [...notes].reverse().forEach((note) => {
      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `
        <h2><i>Q:</i> ${note.input.slice(0, 50)}...</h2>
        <p class="label">${new Date(note.timestamp).toLocaleString()}</p>
        <div class="btns">
          <button class="view-btn">View</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      // --- View button: open modal ---
      card.querySelector(".view-btn").addEventListener("click", () => {
        noteTitle.textContent = `Input: ${note.input}`;
        noteBody.innerHTML = `
          <p class="label"><b>Saved on:</b> ${note.timestamp}</p>
          <p>${note.output}</p>
        `;
        modal.classList.add("active");
      });

      // --- Delete button: remove note ---
      card.querySelector(".delete-btn").addEventListener("click", async () => {
        const { notes } = await chrome.storage.local.get("notes");
        const updated = notes.filter((n) => n.id !== note.id);
        await chrome.storage.local.set({ notes: updated });
        loadNotes(); // Refresh display
      });

      container.appendChild(card);
    });
  }

  // --- Close modal ---
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close modal if clicked outside note-page
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Initial load
  loadNotes();
});
  // // --- Open Chat Popup Window ---
  // const openChatBtn = document.getElementById("open-chat");
  // if (openChatBtn) {
  //   openChatBtn.addEventListener("click", () => {
  //     const popupUrl = chrome.runtime.getURL("overlay.html");
  //     chrome.windows.create({
  //       url: popupUrl,
  //       type: "popup",
  //       width: 420,
  //       height: 600
  //     });
  //   });
  // }
