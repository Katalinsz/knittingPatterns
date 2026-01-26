import './Header.css';
import communityIcon from '../../assets/Logos/CommunityIcon.svg';
import libraryIcon from '../../assets/Logos/LibraryIcon.svg';
import studioIcon from '../../assets/Logos/StudioIcon.svg';
import knittedForYouLogo from '../../assets/Logos/KnittedForYouLogo.png';
// Updated to use the correct SVG file as requested
import accountIcon from '../../assets/Logos/AccountIcon.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo-container">
                   <img src={knittedForYouLogo} alt="Logo" />
                </div>
            </div>
            <div className="header-nav">
                <div className="nav-item">
                    <span>Community</span>
                    <img src={communityIcon} alt="contact" className="nav-icon" />
                </div>
                <div className="nav-item">
                    <span>Library</span>
                    <img src={libraryIcon} alt="home" className="nav-icon" />
                </div>
                <div className="nav-item">
                    <span>My Studio</span>
                    <img src={studioIcon} alt="maker" className="nav-icon" />
                </div>
                <div className="user-icon">
                    <img src={accountIcon} alt="account" className="account-icon" />
                </div>
            </div>
        </header>
    );
};

export default Header;
