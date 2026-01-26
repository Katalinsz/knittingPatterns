import './Header.css';
import CommunityIcon from '../../assets/Logos/CommunityIcon.svg?react';
import LibraryIcon from '../../assets/Logos/LibraryIcon.svg?react';
import StudioIcon from '../../assets/Logos/StudioIcon.svg?react';
import knittedForYouLogo from '../../assets/Logos/KnittedForYouLogo.png';
// Updated to use the correct SVG file as requested
import AccountIcon from '../../assets/Logos/AccountIcon.svg?react';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={knittedForYouLogo} alt="Logo" />
            </div>
            <div className="header-nav">
                <div className="nav-item">
                    <span>Community</span>
                    <CommunityIcon className="nav-icon" />
                </div>
                <div className="nav-item">
                    <span>Library</span>
                    <LibraryIcon className="nav-icon" />
                </div>
                <div className="nav-item">
                    <span>My Studio</span>
                    <StudioIcon className="nav-icon" />
                </div>
                <div className="user-icon">
                    <AccountIcon className="account-icon" />
                </div>
            </div>
        </header>
    );
};

export default Header;
