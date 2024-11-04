document.addEventListener("DOMContentLoaded", loadNotes);
window.addEventListener("beforeunload", saveDraft);

// Save drafts to session storage
function saveDraft() {
    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;
    sessionStorage.setItem("draftTitle", title);
    sessionStorage.setItem("draftContent", content);
}

// Load draft notes from session storage on page load
function loadDraft() {
    const title = sessionStorage.getItem("draftTitle");
    const content = sessionStorage.getItem("draftContent");
    if (title || content) {
        document.getElementById("note-title").value = title;
        document.getElementById("note-content").value = content;
    }
}
loadDraft();

// Save a new note
function saveNote() {
    const title = document.getElementById("note-title").value.trim();
    const content = document.getElementById("note-content").value.trim();
    if (!title || !content) {
        alert("Please fill out both the title and content.");
        return;
    }

    const note = {
        title,
        content,
        timestamp: new Date().toLocaleString()
    };

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    // Clear fields and session draft
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
    sessionStorage.removeItem("draftTitle");
    sessionStorage.removeItem("draftContent");

    loadNotes();
}

// Load and display all saved notes
function loadNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-item");
        listItem.dataset.index = index;

        listItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="timestamp">Saved on: ${note.timestamp}</div>
            <div class="actions">
                <button class="edit-button" onclick="editNote(${index})">Edit</button>
                <button class="delete-button" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;

        notesList.appendChild(listItem);
    });
}

// Edit a specific note
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const note = notes[index];

    document.getElementById("note-title").value = note.title;
    document.getElementById("note-content").value = note.content;

    // Remove the note being edited
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// Delete a specific note
function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        const notes = JSON.parse(localStorage.getItem("notes"));
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
}
