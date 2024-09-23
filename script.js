document.addEventListener('DOMContentLoaded', loadNotes);

document.getElementById('saveBtn').addEventListener('click', function() {
    const noteText = document.getElementById('note').value;
    if (noteText.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    addNoteToDOM(noteText);
    saveNoteToLocalStorage(noteText);
    document.getElementById('note').value = '';
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNoteToDOM(note));
}

function addNoteToDOM(noteText) {
    const notesList = document.getElementById('notesList');
    const listItem = document.createElement('li');
    listItem.className = 'note';
    listItem.textContent = noteText;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.onclick = function() {
        notesList.removeChild(listItem);
        deleteNoteFromLocalStorage(noteText);
    };

    listItem.appendChild(deleteBtn);
    notesList.appendChild(listItem);
}

function saveNoteToLocalStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNoteFromLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}
