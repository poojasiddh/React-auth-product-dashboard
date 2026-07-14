import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


function Addproduct() {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!product.title.trim()) {
            newErrors.title = "Product title is required";
        }
        if (!product.price) {
            newErrors.price = "Price is required";
        } else if (Number(product.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }
        // if (!product.description.trim()) {
        //     newErrors.description = "Description is required";
        // }
        if (!product.category.trim()) {
            newErrors.category = "Category is required";
        }
        if (!product.image.trim()) {
            newErrors.image = "Image URL is required";
        } else if (
            !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(product.image)
        ) {
            newErrors.image = "Enter a valid image URL";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await axios.post("https://fakestoreapi.com/products", {
                title: product.title,
                price: Number(product.price),
                description: product.description,
                category: product.category,
                image: product.image,
            });
            toast.success("Product Added Successfully");
            setProduct({
                title: "",
                price: "",
                description: "",
                category: "",
                image: "",
            });

            setErrors({});
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-400 to-emerald-400 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-sky-600 mb-8">Add New Product</h1>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Product Title</label>
                        <input type="text" name="title" value={product.title} onChange={handleChange}
                            placeholder="Enter Product Title" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        {errors.title && (<p className="text-red-500 text-sm mt-1">{errors.title}</p>)}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Price</label>
                        <input type="number" name="price" value={product.price} onChange={handleChange}
                            placeholder="Enter Price" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        {errors.price && (<p className="text-red-500 text-sm mt-1">{errors.price}</p>)}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Category</label>
                        <input type="text" name="category" value={product.category} onChange={handleChange}
                            placeholder="electronics / men's clothing / jewellery" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                    {errors.category && (<p className="text-red-500 text-sm mt-1">{errors.category}</p>)}
                    </div>

                <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input type="text" name="image" value={product.image} onChange={handleChange}
            placeholder="https://example.com/image.png" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            {errors.image && (<p className="text-red-500 text-sm mt-1">{errors.image}</p>)}
            </div>

          <div>
         <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea rows="4" name="description" value={product.description} onChange={handleChange}
        placeholder="Enter Product Description" className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
     </div>
    <button type="submit"className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer">
     Save Product</button>
                </form>
            </div>
        </div>
    );
}

export default Addproduct;