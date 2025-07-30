import styles from "./Footer.module.scss";
const Footer = () => {
    return (
        <footer>
            <div className={styles.footerTop}>
                <div className={styles.logo}>
                    <h1>MORENT</h1>
                    <p>Our vision is to provide convenience and help increase your sales business.</p>
                </div>
                <div className={styles.footerMenu}>
                    <div className={styles.About}>
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">How it works</a></li>
                            <li><a href="#">Featured</a></li>
                            <li><a href="#">Partnership</a></li>
                            <li><a href="#">Bussiness Relation</a></li>
                        </ul>
                    </div>
                    <div className={styles.community}>
                        <h3>Community</h3>
                        <ul>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Podcast</a></li>
                            <li><a href="#">Invite a Friend</a></li>
                        </ul>
                    </div>
                    <div className={styles.Socials}>
                        <h3>Socials</h3>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Youtube</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
                <div className={styles.footerBottom}>
                    <span>
                        <p>©2022 MORENT. All rights reserved</p>
                    </span>
                    <div className={styles.privacy}>
                        <a href="#">Privac & Policy</a>
                        <a href="#">Terms & Condition</a>
                    </div>
                </div>
        </footer>
    )
}    
export default Footer;