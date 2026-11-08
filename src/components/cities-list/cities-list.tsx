import { City } from "../../types/types"

type CitiesListProps = {
    cities: City[]
    currentCity?: City
    changeCurrentCity: (city: City) => void
}

const CitiesList = ({ cities, currentCity, changeCurrentCity }: CitiesListProps) => {

    return (
        <ul className="locations__list tabs__list">
            {cities.map((city, index) => (
                <li className="locations__item" key={index}>
                    <a
                        className={`locations__item-link tabs__item ${currentCity?.name == city.name ? 'tabs__item--active' : ''}`}
                        href="#"
                        onClick={() => changeCurrentCity(city)}
                    >
                        <span>{city.name}</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default CitiesList