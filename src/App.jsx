import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import "./App.css";

import Navbar from "./components/Navbar";
import CardContainer from "./components/CardContainer";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

const App = () => {
    // All State Variables
    const [allActors, setAllActors] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedActors, setSelectedActors] = useState([]);

    // All Functions
    const fetchHollywoodMovieData = async () => {
        const response = await fetch("./hollywoodMovieData.json");
        const data = await response.json();
        setAllActors(data);
    };

    useEffect(() => {
        fetchHollywoodMovieData();
    }, []);

    useEffect(() => {
        const filteredResults = allActors.filter(
            (actor) =>
                actor.name.toLowerCase().includes(search.toLowerCase()) ||
                actor.role.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(filteredResults.reverse());
    }, [allActors, search]);

    useEffect(() => {
        // Retrieve saved cart items from local storage
        const savedSelectedActors =
            JSON.parse(localStorage.getItem("selectedActors")) || [];
        setSelectedActors(savedSelectedActors);
    }, []);

    const handleSelectedActors = (actor) => {
        const isExist = selectedActors.find((item) => item.id === actor.id);
        if (isExist) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Actor already selected!",
            });
            return;
        }
        setSelectedActors([...selectedActors, actor]);
    };

    const totalSelectedActors = selectedActors.length;
    const totalBudget = 30_000;
    const totalCost = selectedActors.reduce(
        (total, actor) => total + actor.salary,
        0
    );
    const totalRemaining = totalBudget - totalCost;

    const handleCheckout = () => {
        if (totalSelectedActors === 0) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have not selected any actor!",
            });
            return;
        }
        MySwal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "Your order has been placed successfully!",
        });
        return;
    };

    const handleClear = async () => {
        const result = await MySwal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You want to clear your cart?",
            showCancelButton: true,
            confirmButtonText: "Yes, clear it!",
            cancelButtonText: "No, keep it",
        });

        if (result.isConfirmed) {
            setSelectedActors([]);
            localStorage.removeItem("selectedActors"); // Clear local storage
            MySwal.fire("Cleared!", "Your cart has been cleared.", "success");
        }
    };

    const handleAddToCart = (actor) => {
        const isExist = selectedActors.find((item) => item.id === actor.id);

        if (isExist) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Actor already selected!",
            });
            return;
        }

        if (totalCost + actor.salary > totalBudget) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have exceeded your budget!",
                footer: '<a href="">Why do I have this issue?</a>',
            });
            return;
        }

        // Save to local storage
        const updatedSelectedActors = [...selectedActors, actor];
        localStorage.setItem(
            "selectedActors",
            JSON.stringify(updatedSelectedActors)
        );

        setSelectedActors(updatedSelectedActors);
        MySwal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "Item successfully added to cart!",
        });
    };

    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="my-10 flex pl-10">
                <CardContainer
                    searchResults={searchResults}
                    handleSelectedActors={handleSelectedActors}
                    handleAddToCart={handleAddToCart}
                />
                <Cart
                    selectedActors={selectedActors}
                    setSelectedActors={setSelectedActors}
                    totalSelectedActors={totalSelectedActors}
                    totalBudget={totalBudget}
                    totalCost={totalCost}
                    totalRemaining={totalRemaining}
                    handleCheckout={handleCheckout}
                    handleClear={handleClear}
                />
            </main>
            <Footer />
        </>
    );
};

export default App;
