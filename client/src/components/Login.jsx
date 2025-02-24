import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    const addUserData = async (e) => {
        e.preventDefault();

        // Validation check
        if (!name || !file) {
            alert("Please enter your name and select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("name", name);

        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            };

            const res = await axios.post('http://localhost:4000/api/login', formData, config);
            console.log("Response:", res.data);
            alert("File uploaded successfully!");

        } catch (error) {
            console.error("Upload error:", error);
            alert("File upload failed!");
        }
    };

    return (
        <form onSubmit={addUserData}>
            <div>
                <label className='font-bold text-blue-500 m-2'>Name</label>
                <input 
                    type='text' 
                    placeholder='Enter Name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div className='mt-2'>
                <label className='text-blue-500 font-bold m-2'>Photo:</label>
                <input 
                    type='file' 
                    onChange={(e) => setFile(e.target.files[0])}  
                />
            </div>
            <button className='bg-blue-500 rounded-md p-2 m-3' type="submit">
                UPLOAD
            </button>
        </form>
    );
};

export default Login;
