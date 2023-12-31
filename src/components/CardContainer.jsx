import Card from "./Card";

const CardContainer = ({ searchResults, handleAddToCart }) => {
    return (
        <section className="grid grid-cols-3 gap-1 w-3/4">
            {searchResults.length > 0 ? (
                searchResults.map((actor) => {
                    return (
                        <Card
                            key={actor.id}
                            actor={actor}
                            handleAddToCart={handleAddToCart}
                        />
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default CardContainer;
