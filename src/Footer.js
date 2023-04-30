import { Link } from "react-router-dom";
import footerLogoDark from "./assets/footer_logo_dark_theme.svg";
import footerLogoLight from "./assets/footer_logo_light_theme.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function Footer(props) {
  return (
    <div className="footer--container">
      <img
        src={props.isDarkMode ? footerLogoDark : footerLogoLight}
        alt="website footer logo"
        className="footer--logo"
      />
      <div className="footer--content-container">
        <div className="footer--social-media-links">
          <a target="_blank" href="https://www.facebook.com" aria-label="facebook link"><FacebookIcon /></a>
          <a target="_blank" href="https://www.twitter.com" aria-label="twitter link"><TwitterIcon /></a>
          <a target="_blank" href="https://www.instagram.com" aria-label="instagram link"><InstagramIcon /></a>
          <a target="_blank" href="https://www.pinterest.com" aria-label="pinterest link"><PinterestIcon /></a>
          <a target="_blank" href="https://www.telegram.org" aria-label="telegram link"><TelegramIcon /></a>
        </div>
        <div>
          <ul className="footer--communications-links">
            <li>
              <Link to="/poems/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/poems/newsletter">Newsletter</Link>
            </li>
            <li>
              <Link to="/poems/press">Press</Link>
            </li>
            <li>
              <Link to="/poems/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/poems/useterms">Terms of Use</Link>
            </li>
            <li>
              <Link to="/poems/mobileapp">Poems Mobile App</Link>
            </li>
          </ul>
        </div>
        <div className="footer--copyright">
          <p>54 Ocean View Street, Summerville, Aus, 9768</p>
          <p>© 2023 The Poetry Place</p>
        </div>
        <div>
          <a
            className="footer--problem-contact-anchor"
            href="mailto:feedbackmanager@thepoetryplace.com?subject = Feedback&body = Message"
          >
            See a problem on this page?
          </a>
        </div>
      </div>
    </div>
  );
}
