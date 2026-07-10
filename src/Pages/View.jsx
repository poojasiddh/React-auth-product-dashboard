import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function View() {
    const { id } = useParams();
    const [views, setViews] = useState({});

    useEffect(() => {
        getProduct();
    }, []);
    async function getProduct() {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setViews(res.data);
    }
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
                <img src={views.image} alt={views.title} className="w-full h-96 object-contain" />
                <div>
                    <h1 className="text-3xl font-bold">{views.title}</h1>
                    <p className="text-green-600 text-2xl font-bold mt-5">₹ {views.price}</p>
                    <p className="text-gray-500 mt-3 capitalize">{views.category}</p>
                    <p className="mt-6 leading-7">{views.description}</p>
                    <div className="mt-10 flex justify-between items-center border-t pt-6">
                        <h2 className="text-2xl font-bold">Total: ₹ {views.price}</h2>
                        <button className="bg-emerald-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer">
                            PLACE ORDER
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default View;