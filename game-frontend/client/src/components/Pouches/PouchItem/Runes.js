import React from 'react';


const Runes = ({item_description, item_name, quantity, rarity}) => {
    return (
        <div className="pouch-item rune">
            {item_name}
            {quantity}
        </div>
    )
}

export default Runes;