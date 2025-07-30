import { useState } from 'react';
import styles from "./AdminSideBar.module.scss";

import {mainMenuItems,preferencesItems} from './constants/menuItems.jsx';


const AdminSideBar = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeIconIndex, setActiveIconIndex] = useState(0);

    const handleToggleActive = (index,hasExtraIcons) => {
        if (hasExtraIcons) return;
        if (activeIndex === index) return;
        setActiveIndex(index); 
    };

    const handleIconClick = (index) => {
        if (activeIconIndex === index) return;
        setActiveIconIndex(prevIndex => (prevIndex === index ? -1 : index));
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebarMainMenu}>
                <div className={styles.mainMenuHeader}>
                    <h6>MAIN MENU</h6>
                </div>
                <div className={styles.mainMenuContent}>
                    {mainMenuItems.map((menu, index) => (
                        <div 
                            key={index} 
                            className={`${styles.content} ${activeIndex === index ? styles.active : ''}`} 
                            onClick={() => handleToggleActive(index, menu.extraIcons && menu.extraIcons.length > 0)}
                        >
                            {menu.icon}
                            <h6>{menu.title}</h6>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.sidebarPreferences}>
                <div className={styles.preferencesHeader}>
                    <h6>PREFERENCES</h6>
                </div>
                <div className={styles.preferencesContent}>
                    {preferencesItems.map((menu, index) => (
                        <div 
                            key={index} 
                            className={`${styles.content} ${activeIndex === index + 6 ? styles.active : ''}`} 
                            onClick={() => handleToggleActive(index + 6, menu.extraIcons && menu.extraIcons.length > 0)}
                        >
                            {menu.icon}
                            <h6>{menu.title}</h6>
                            {menu.extraIcons && menu.extraIcons.length > 0 && (
                                <div className={styles.extraIconsContainer}>
                                    {menu.extraIcons.map((icon, extraIndex) => (
                                        <div 
                                        key={extraIndex} 
                                        className={`${styles.extraIcon} ${activeIconIndex === extraIndex ? styles.activeBlue : ''}`}
                                        onClick={() => handleIconClick(extraIndex)}
                                    >
                                        {icon}
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.sidebarLogout}>
                <div className={styles.contentLogOut}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.8999 7.56C9.2099 3.96 11.0599 2.49 15.1099 2.49H15.2399C19.7099 2.49 21.4999 4.28 21.4999 8.75V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.0001 12H3.62012" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.85 8.65L2.5 12L5.85 15.35" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h6>Log Out</h6>
                </div>
            </div>
        </div>
    );
}

export default AdminSideBar;
