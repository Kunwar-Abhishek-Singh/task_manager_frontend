

// import { useState } from "react";

// export default function TaskForm({ initialData = {}, onSubmit }) {
//   const [formData, setFormData] = useState({
//     title: initialData.title || "",
//     description: initialData.description || "",
//     dueDate: initialData.dueDate || "",
//     priority: initialData.priority || "Low",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow">
//         <div className="card-header bg-primary text-white">
//           <h3 className="mb-0">{!initialData.title ? "Create Task" : "Edit Task"}</h3>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             {/* Title Input */}
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter task title"
//                 className="form-control"
//               />
//             </div>

//             {/* Description Input */}
//             <div className="mb-3">
//               <label htmlFor="description" className="form-label">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Enter task description"
//                 rows="4"
//                 className="form-control"
//               ></textarea>
//             </div>

//             {/* Due Date Input */}
//             <div className="mb-3">
//               <label htmlFor="dueDate" className="form-label">
//                 Due Date
//               </label>
//               <input
//                 type="date"
//                 id="dueDate"
//                 name="dueDate"
//                 value={formData.dueDate}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>

//             {/* Priority Selector */}
//             <div className="mb-3">
//               <label htmlFor="priority" className="form-label">
//                 Priority
//               </label>
//               <select
//                 id="priority"
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 className="form-select"
//               >
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="btn btn-primary w-100"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";

export default function TaskForm({ initialData = {}, onSubmit }) {
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate || "",
        priority: initialData.priority || "Low",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const validateForm = () => {
        let isValid = true;
        let validationErrors = {
            title: "",
            description: "",
            dueDate: "",
        };

        // Title Validation
        if (!formData.title) {
            validationErrors.title = "Title is required";
            isValid = false;
        }

        // Description Validation
        if (!formData.description) {
            validationErrors.description = "Description is required";
            isValid = false;
        }

        // Due Date Validation
        if (!formData.dueDate) {
            validationErrors.dueDate = "Due Date is required";
            isValid = false;
        } else if (new Date(formData.dueDate) < new Date()) {
            validationErrors.dueDate = "Due Date cannot be in the past";
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">{!initialData.title ? "Create Task" : "Edit Task"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="form-control"
                            />
                            {errors.title && <div className="text-danger">{errors.title}</div>}
                        </div>

                        {/* Description Input */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                rows="4"
                                className="form-control"
                            ></textarea>
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </div>

                        {/* Due Date Input */}
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label">
                                Due Date
                            </label>

                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData && formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.dueDate && <div className="text-danger">{errors.dueDate}</div>}
                        </div>

                        {/* Priority Selector */}
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
