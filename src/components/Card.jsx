import React from "react";
import { Icon } from "@iconify/react";

const Card = ({ actor, handleAddToCart, handleSelectedActors }) => {
    const { role, name, salary, image, age, country, fbUrl, twitter } = actor;

    return (
        <div className="card w-80 bg-base-100 shadow-xl mb-5">
            <figure>
                <img
                    className="rounded-full w-28"
                    src={image}
                    alt="Profile Picture"
                />
            </figure>
            <div className="card-body text-center">
                <h2 className="card-title mx-auto">{name}</h2>
                <small>{role}</small>
                <div className="flex justify-between my-5">
                    <h3>
                        Age: <span className="age">{age}</span>
                    </h3>
                    <h3>
                        Country: <span className="county">{country}</span>
                    </h3>
                </div>
                <div className="justify-center my-5">
                    <h2 className="mx-auto text-2xl">
                        $<span className="salary">{salary}</span>
                    </h2>
                </div>
                <div className="social-icons flex justify-center mt-5">
                    <a href={fbUrl}>
                        <Icon className="text-2xl mr-2" icon="logos:facebook" />
                    </a>
                    <a href={twitter}>
                        <Icon
                            className="text-2xl ml-2"
                            icon="devicon:twitter"
                        />
                    </a>
                </div>
                <div className="card-actions justify-center mt-5">
                    <button
                        onClick={() => handleAddToCart(actor)}
                        className="btn btn-primary"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
