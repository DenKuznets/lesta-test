import { Ship } from "@/types";


const ShipCard = ({ ship }: { ship: Ship }) => {
    return ship ? (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                {ship.icons && (
                    <img
                        // width={400}
                        // height={300}
                        src={ship.icons.large}
                        alt="Ship image"
                    />
                )}
            </figure>

            <div className="card-body flex-none">
                <h2 className="card-title">{`Название: ${ship.title}`}</h2>
                <p>{`Уровень: ${ship.level}`}</p>
                <p className="capitalize">{`Страна: ${ship.nation.name}`}</p>
                <p className="capitalize">{`Тип: ${ship.type.name}`}</p>
                <p>{ship.description}</p>
            </div>
        </div>
    ) : (
        <span className="loading loading-ring loading-lg"></span>
    );
};

export default ShipCard