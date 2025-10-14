document.addEventListener('DOMContentLoaded', () => {
    const notesCollection = document.getElementById('notes-collection');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    const notes = Object.keys(localStorage)
        .filter(key => key.startsWith('note_'))
        .map(key => JSON.parse(localStorage.getItem(key)));

    if (notes.length === 0) {
        notesCollection.innerHTML = '<p>You have no saved notes.</p>';
        return;
    }

    notes.sort((a, b) => b.timestamp - a.timestamp);

    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.dataset.noteId = note.id;

        const title = note.input.substring(0, 20) + (note.input.length > 20 ? '...' : '');
        const snippet = note.output.substring(0, 50) + (note.output.length > 50 ? '...' : '');

        card.innerHTML = `
            <h3>${title}</h3>
            <p>${snippet}</p>
        `;

        card.addEventListener('click', () => {
            modalTitle.textContent = note.input;
            modalBody.textContent = note.output;
            modal.style.display = 'block';
        });

        notesCollection.appendChild(card);
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
