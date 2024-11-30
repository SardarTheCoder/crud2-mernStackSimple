import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [createform, setCreateform] = useState({
    title: "",
    body: "",
  });

  const [updateform, setUpdateform] = useState({
    _id: null,
    title: "",
    body: "",
  });

  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch notes on component mount
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/notes");
      setNotes(res.data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setCreateform({ ...createform, [name]: value });
  };

  // Handle new note creation
  const createNote = async (e) => {
    e.preventDefault();
    if (!createform.title.trim()) {
      alert("Title is required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/notes", createform);
      setNotes([...notes, res.data.note]);
      setCreateform({ title: "", body: "" }); // Reset form after submit
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Handle note deletion
  const deleteNote = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${_id}`);
      setNotes(notes.filter((note) => note._id !== _id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Toggle update form to show existing note data
  const toggleUpdate = (note) => {
    setUpdateform({ _id: note._id, title: note.title, body: note.body });
    setShowModal(true); // Open modal
  };

  // Handle update form changes
  const handleUpdateFormChange = (e) => {
    const { value, name } = e.target;
    setUpdateform({
      ...updateform,
      [name]: value,
    });
  };

  // Handle note update
  const updateNote = async (e) => {
    e.preventDefault();

    if (!updateform.title.trim()) {
      console.error("Title is required.");
      return;
    }

    try {
      const { title, body, _id } = updateform;
      await axios.put(`http://localhost:4000/notes/${_id}`, { title, body });

      await fetchNotes(); // Re-fetch the notes after update
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
      {/* Create Form */}
      <div className="flex flex-col gap-5 p-10 items-center content-center w-full">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Better Data
          </span>{" "}
          Please enter...
        </h1>

        <form onSubmit={createNote}>
          <input
            type="text"
            name="title"
            placeholder="Please enter title"
            onChange={updateFormField}
            value={createform.title}
            className="bg-gray-200 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
          <textarea
            name="body"
            placeholder="Summary..."
            onChange={updateFormField}
            value={createform.body}
            className="block ml-2 p-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300"
          />
          <button className="mt-4 ml-7 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
        </form>
      </div>

      {/* Notes Table */}
      <table className="table-auto mt-5 border-collapse border p-10 rounded-3xl border-gray-300 w-full text-center">
        <thead>
          <tr className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Body</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <tr
                key={note._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="border px-4 py-2 text-gray-800 font-medium">
                  {note.title}
                </td>
                <td className="border px-4 py-2 text-gray-600">{note.body}</td>
                <td className="border px-4 py-2 flex items-center justify-center gap-2 text-red-600">
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="rounded-xl"
                  >
                    <RiDeleteBin2Fill size={30} />
                  </button>
                  <button
                    onClick={() => toggleUpdate(note)}
                    className="rounded-xl"
                  >
                    <GrUpdate size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No notes available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-1/3 border-4 border-gradient-to-br from-purple-500 to-pink-500">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Update Note
        </span>
      </h1>
      <form onSubmit={updateNote}>
        <input
          type="text"
          name="title"
          placeholder="Please enter title"
          onChange={handleUpdateFormChange}
          value={updateform.title}
          className="bg-gray-200 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <textarea
          name="body"
          placeholder="Summary..."
          onChange={handleUpdateFormChange}
          value={updateform.body}
          className="block w-full p-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300"
        />
        <div className="flex justify-between items-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-5 py-2.5 bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900 font-medium rounded-lg hover:bg-gradient-to-br hover:from-gray-400 hover:to-gray-500 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-br from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
};

export default Index;
