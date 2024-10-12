import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import FirebaseContext from '../../store/FirebaseContext';
import { AuthContext } from '../../store/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection,Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({}); 
    const [image, setImage] = useState(null); 
    const { db, storage } = useContext(FirebaseContext); 
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);


    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!category) newErrors.category = 'Category is required';
        if (!price || price <= 0) newErrors.price = 'Price must be a positive number';
        if (!image) newErrors.image = 'Image is required';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        try {
            if (image && user) {
                const imageRef = ref(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(snapshot.ref);

                await addDoc(collection(db, 'products'), {
                    name,
                    category,
                    price,
                    imageUrl,
                    createdBy: user.uid,
                    createdAt:  Timestamp.fromDate(new Date()) 
                });

               navigate('/')

            
            } else {
                alert('Please upload an image');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <Fragment>
            <Header />
            <div className="centerDiv">
                <label htmlFor="name">Name</label>
                <br />
                <input
                    className="input"
                    type="text"
                    id="name"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                  {errors.name && <span className="error">{errors.name}</span>}
                  
                <br />
                <label htmlFor="category">Category</label>
                <br />
                <input
                    className="input"
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="Category"
                />
                 {errors.category && <span className="error">{errors.category}</span>}
                <br />
                <label htmlFor="price">Price</label>
                <br />
                <input
                    className="input"
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="Price"
                />
                 {errors.price && <span className="error">{errors.price}</span>}
                <br />
                {image && (
                    <img
                        alt="Preview"
                        width="200px"
                        height="200px"
                        src={URL.createObjectURL(image)}
                    />
                )}
                <br />
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />
                 {errors.image && <span className="error">{errors.image}</span>}
                <br />
                <button onClick={handleSubmit} className="uploadBtn">
                    Upload and Submit
                </button>
            </div>
        </Fragment>
    );
};

export default Create;
