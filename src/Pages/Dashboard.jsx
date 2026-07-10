import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import jewelry from "../assets/logo1.png";
import { BaggageClaim, ChevronDown, LogOut, Search, UserRound } from "lucide-react";


function Dashboard() {
    const { loggedInUser, setLoggedInUser, cart, setCart } = useContext(UserContext);
    const [profile, setProfile] = useState(false);
    const [result, setResult] = useState([]);
    const [search, setSearch] = useState("");


    const profileRef = useRef(null);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        navigate("/login", { replace: true });
        //  isUserLogin(false);
    }

    useEffect(() => {
        if (profile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [profile]);

    useEffect(() => {
        function handleClick(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfile(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    })

    async function getFetchData() {
        const url = 'https://fakestoreapi.com/products';
        let response = await fetch(url);
        response = await response.json()
        setResult(response);
        // console.log(response);
    }

    const filteredProducts = result.filter((item) => item.category.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        getFetchData();
    }, []);

    function handleAddToCart(product) {
        console.log(product.id);

        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            };
            return [...prev, { ...product, quantity: 1 }];
        })
        // setCart((prevcart) => [...prevcart, product])
        // console.log(product);
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-emerald-400">
            <header className="flex items-center justify-between bg-white shadow-md h-16 px-8 md:px-16">
                <a href="#"><img src={jewelry} alt="Jewelry Logo" className="w-36 h-auto hover:scale-105 transition-all duration-300" /></a>
                <ul className="hidden xl:flex gap-10 font-semibold text-base flex-1 justify-center">
                    <li className="cursor-pointer hover:text-sky-500 transition">MEN</li>
                    <li className="cursor-pointer hover:text-sky-500 transition">WOMEN</li>
                    <li className="cursor-pointer hover:text-sky-500 transition">JEWELLERY</li>
                    <li className="cursor-pointer hover:text-sky-500 transition">ELECTRONICS</li>
                </ul>


                <div className="relative hidden md:block pr-10 py-10">
                    <Search className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-64 pl-10 pr-4 py-2 border-2 border-sky-400 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                {/* <div className="flex items-center gap-3 ml-6 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <UserRound className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold">{loggedInUser?.name}</h4>
                        <p className="text-xs text-gray-500">{loggedInUser?.admin_email}</p>
                    </div>
                    
                </div> */}

                <div ref={profileRef} className="relative ml-6">
                    <div
                        onClick={(e) => setProfile(!profile)}
                        className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center">
                            <UserRound className="w-5 h-5" /></div>

                        <div>
                            <h4 className="text-sm font-semibold">{loggedInUser?.name}</h4>
                            <p className="text-xs text-gray-500">{loggedInUser?.admin_email}</p>
                        </div>

                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${profile ? "rotate-180" : ""}`} />
                    </div>

                    {profile && (
                        <div className="absolute mt-3 w-64 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

                            {/* User Info */}
                            <div className="p-4 border-b">
                                <h3 className="font-semibold text-gray-800">{loggedInUser?.name}</h3>
                                <p className="text-sm text-gray-500">{loggedInUser?.admin_email}</p>
                            </div>

                            {/* <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 transition">
        <Settings className="w-5 h-5 text-gray-500" />
        <span>Settings</span>
      </button> */}

                            {/* Logout */}
                            <button onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition cursor-pointer">
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="relative ml-6">
                    <Link to="/cart">
                        <BaggageClaim className="w-7 h-7 text-sky-600 cursor-pointer hover:text-sky-800" />
                    </Link>

                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </div>
            </header>


            {/* cart structure */}
           
            <div className="p-9">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((item, id) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col transition-all duration-300
                                       hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                                         <Link to={`/view/${item.id}`}>
                            <img src={item.image} alt={item.title} className="w-full h-56 object-contain transition-transform duration-300 hover:scale-105" />
                            </Link>
                            <h2 className="font-semibold mt-3 text-sm h-15 overflow-hidden">{item.title}</h2>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-green-600 font-bold text-lg">
                                    ₹ {item.price}
                                </p>
                                <p className="text-sm text-emerald-500 font-bold max-w-[120px] truncate">
                                    {item.category}
                                </p>
                            </div>
                            <button className="w-full mt-3 bg-sky-500 text-white py-2 rounded cursor-pointer" onClick={() => handleAddToCart(item)}>Add To Cart</button>
                        </div>
                    ))}
                </div>
            </div>
            {/* end */}

        </div>
    );
}

export default Dashboard;