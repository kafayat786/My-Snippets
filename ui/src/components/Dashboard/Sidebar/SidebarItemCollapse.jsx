import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SidebarItemCollapse = ({ item, selectedItemId, handleSideBarClick }) => {
    const [show, setShow] = useState(false);

    const resetDropdown = () => {
        setShow(false);
    };

    useEffect(() => {
        //when an item from sidebar is selected collapse other dropdowns
        resetDropdown();
        //if child item is selected uncollapse dropdown on page refresh
        dropIfChildSelected(item.child, selectedItemId);
    }, [selectedItemId]);

    const dropIfChildSelected = (childList, selectedItemId) => {
        const foundSelectChild = childList.filter((child) => child.id === selectedItemId);
        if (foundSelectChild.length) setShow(true);
    };

    return (
        <div className="nested-nav-container">
            {/* <button type="button" onClick={toggleDropdown} className="nested-item-toggler">
                <span className="nested-toggler-left">
                    <img src={item.iconLight} className="side-nav-icon" alt="nav-icon" />
                    {item.name}
                </span>
                <FontAwesomeIcon icon={faAngleDown} className={`side-nav-ddn ${show ? 'angle-up' : ''}`} />
            </button> */}
            <div className={`nested-nav-items ${show ? 'collapse-ddn' : ''}`}>
                {item.child.map((childItem) => (
                    <Link key={childItem.id} className={childItem.id === selectedItemId ? 'active-item-nested' : ''} to={childItem.linkTo} onClick={() => handleSideBarClick(childItem.id)}>
                        <img src={childItem.iconLight} className="side-nav-icon" alt="nav-iconss" />
                        {childItem.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default SidebarItemCollapse;