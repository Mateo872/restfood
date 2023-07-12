import React from "react";
import comida from "../../assets/comida-quienes-somos.png";
import salon from "../../assets/salon-quienes-somos.png";

const QuienesSomos = () => {
    return (
        <section className="container my-4">
            <h1 className="display-1 text-center">Nuestra Historia</h1>
            <hr />

            <article className="row d-flex flex-sm-row-reverse my-4">
                <aside className="d-flex col-12 col-md-6 mb-3 mb-lg-0">
                    <img className="d-block w-100" src={salon} alt="First slide" />
                </aside>
                <aside className="col-12 col-md-6">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
                        quis quibusdam? Odit natus voluptatem exercitationem magni
                        accusamus? Reprehenderit maxime, et quibusdam magni earum facilis
                        deserunt enim molestias aliquid voluptate facere aperiam officiis
                        assumenda sint excepturi. Veritatis, ad placeat saepe culpa natus
                        eveniet officia, dicta explicabo voluptate ea praesentium? Aliquam
                        deserunt consequatur dolor architecto et nostrum quasi quibusdam
                        corporis esse atque. Corrupti laudantium est quasi error ab
                        voluptatum, quibusdam, tempore consequatur, sed eaque dignissimos
                        aperiam non repudiandae unde ad! Sapiente corrupti quis, error,
                        mollitia dolorem ea dolor, impedit eos possimus architecto laborum
                        eum doloremque accusantium aliquam facere inventore saepe delectus
                        cum!
                    </p>
                </aside>
            </article>
            <article className="row my-0 my-lg-5">
                <aside className="d-flex col-12 col-md-6 mb-3 mb-lg-0">
                    {/* <img
                        src={comida}
                        alt="historia"
                        width="100%"
                        style="border-radius: 25px; object-fit: cover"
                    /> */}
                </aside>
                <aside className="col-12 col-md-6">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
                        quis quibusdam? Odit natus voluptatem exercitationem magni
                        accusamus? Reprehenderit maxime, et quibusdam magni earum facilis
                        deserunt enim molestias aliquid voluptate facere aperiam officiis
                        assumenda sint excepturi. Veritatis, ad placeat saepe culpa natus
                        eveniet officia, dicta explicabo voluptate ea praesentium? Aliquam
                        deserunt consequatur dolor architecto et nostrum quasi quibusdam
                        corporis esse atque. Corrupti laudantium est quasi error ab
                        voluptatum, quibusdam, tempore consequatur, sed eaque dignissimos
                        aperiam non repudiandae unde ad! Sapiente corrupti quis, error,
                        mollitia dolorem ea dolor, impedit eos possimus architecto laborum
                        eum doloremque accusantium aliquam facere inventore saepe delectus
                        cum!
                    </p>
                </aside>
            </article>
        </section>
    );
};

export default QuienesSomos;
