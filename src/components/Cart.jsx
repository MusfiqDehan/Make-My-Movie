import React from "react";

const Cart = ({
    selectedActors,
    setSelectedActors,
    totalSelectedActors,
    totalBudget,
    totalCost,
    totalRemaining,
    handleCheckout,
    handleClear,
}) => {
    return (
        <aside className="w-1/5 ml-4 shadow-xl p-10">
            <h1 className="text-center text-xl font-bold">
                Movie Budget Calculation
            </h1>
            <div className="flex justify-between items-center my-5">
                <h2 className="text-lg font-medium">Total Actors:</h2>
                <h2 className="text-lg font-medium">{totalSelectedActors}</h2>
            </div>

            <hr />

            <div className="flex justify-between items-center my-5">
                <h2 className="text-lg font-medium">Total Budget:</h2>
                <h2 className="text-lg font-medium">${totalBudget}</h2>
            </div>

            <div className="flex justify-between items-center my-5">
                <h2 className="text-lg font-medium">Total Cost:</h2>
                <h2 className="text-lg font-medium">${totalCost}</h2>
            </div>

            <hr />

            <div className="flex justify-between items-center my-5">
                <h2 className="text-lg font-medium">Total Remaining:</h2>
                <h2 className="text-lg font-medium">${totalRemaining}</h2>
            </div>

            <hr />

            {selectedActors.length === 0 ? (
                <div className="flex justify-center my-5">
                    <h2 className="text-lg font-medium">
                        No actors selected yet!
                    </h2>
                </div>
            ) : (
                <div>
                    <div>
                        <h2 className="text-xl font-bold text-center pt-10">
                            Actors List
                        </h2>
                        <ul className="list-disc">
                            {selectedActors.map((actor, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center my-5"
                                >
                                    <h2 className="text-lg font-medium">
                                        {index + 1}. {actor.name}
                                    </h2>
                                    <h2 className="text-lg font-medium">
                                        ${actor.salary}
                                    </h2>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-center mt-5">
                        <button
                            onClick={handleCheckout}
                            className="btn btn-primary"
                        >
                            Checkout
                        </button>
                    </div>

                    <div className="flex justify-center my-5">
                        <button
                            onClick={handleClear}
                            className="btn btn-secondary"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Cart;
