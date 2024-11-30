import React from 'react'
const Update = () => {

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
      setUpdateform({ _id: null, title: "", body: "" }); // Reset the form
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };




  return (
    <div>
         {updateform._id && (
        <div className="flex flex-col gap-5 p-10 items-center content-center w-full">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Update Data
            </span>{" "}
            Please enter...
          </h1>

          <form onSubmit={updateNote}>
            <input
              type="text"
              name="title"
              placeholder="Please enter title"
              onChange={handleUpdateFormChange}
              value={updateform.title}
              className="bg-gray-200 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            <textarea
              name="body"
              placeholder="Summary..."
              onChange={handleUpdateFormChange}
              value={updateform.body}
              className="block ml-2 p-3 mt-2 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300"
            />
            <button
              type="submit"
              className="mt-4 ml-7 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Update
