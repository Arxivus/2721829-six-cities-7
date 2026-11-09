import { useState } from "react"

type FilterVariantsProps = {
    variants: string[],
    filterBy: (variant: string) => void
}

const FilterVariants = ({ variants, filterBy }: FilterVariantsProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [currentVariant, setCurrentVariant] = useState<string>(variants[0])


    return (
        <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption" style={{ paddingRight: '10px' }}>Sort by</span>
            <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(isOpen ? false : true)}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                </svg>
            </span>
            {isOpen &&
                <ul className="places__options places__options--custom places__options--opened">
                    {
                        variants?.map((variant, index) => (
                            <li
                                key={index}
                                className={`places__option ${currentVariant == variant? 'places__option--active' : ''}`}
                                tabIndex={0}
                                onClick={() => {
                                    filterBy(variant)
                                    setCurrentVariant(variant)
                                }}
                            >
                                {variant}
                            </li>
                        ))
                    }
                </ul>}
        </form>
    ) /* places__option--active */
}

export {
    FilterVariants
}
