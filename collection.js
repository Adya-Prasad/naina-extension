document.addEventListener("DOMContentLoaded", async () => {

  // DOM Elements
  const container = document.getElementById("notes-collection");
  const modal = document.getElementById("modal");
  const noteTitle = document.getElementById("note-title");
  const noteBody = document.getElementById("note-body");
  const closeButton = document.querySelector(".close-button");

  // Create confirmation modal dynamically
  const confirmModal = document.createElement("div");
  confirmModal.id = "confirm-modal";
  confirmModal.className = "modal";
  confirmModal.innerHTML = `
    <div class="confirm-box">
      <h3>Delete Confirmation</h3>
      <p>Are you sure you want to delete this note?</p>
      <div class="confirm-btns">
        <button id="confirm-delete" class="confirm-delete">Delete</button>
        <button id="cancel-delete" class="cancel-delete">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(confirmModal);

  // References inside confirm modal
  const confirmDeleteBtn = confirmModal.querySelector("#confirm-delete");
  const cancelDeleteBtn = confirmModal.querySelector("#cancel-delete");

  // Track which note is being deleted
  let pendingDeleteNoteId = null;

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
          <div>${renderMarkdown(note.output)}</div>
        `;
        modal.classList.add("active");
      });

      // --- Delete button: show confirm modal ---
      card.querySelector(".delete-btn").addEventListener("click", () => {
        pendingDeleteNoteId = note.id;
        confirmModal.classList.add("active");
      });

      container.appendChild(card);
    });
  }

  // --- Confirm delete logic ---
  confirmDeleteBtn.addEventListener("click", async () => {
    if (pendingDeleteNoteId) {
      const { notes } = await chrome.storage.local.get("notes");
      const updated = notes.filter((n) => n.id !== pendingDeleteNoteId);
      await chrome.storage.local.set({ notes: updated });
      pendingDeleteNoteId = null;
      confirmModal.classList.remove("active");
      loadNotes();
    }
  });

  // --- Cancel delete ---
  cancelDeleteBtn.addEventListener("click", () => {
    pendingDeleteNoteId = null;
    confirmModal.classList.remove("active");
  });

  // --- Close modals ---
  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close any modal if clicked outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
    if (e.target === confirmModal) confirmModal.classList.remove("active");
  });

  // Initial load
  loadNotes();
});
