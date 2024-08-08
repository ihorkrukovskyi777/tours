import Socials from "@/shared/ui/socials/socials";
import FooterMenus from "@/shared/ui/layouts/footer/footer-menus";
import { fetchFooterMenu } from "@/shared/api";
import {ComponentClearCancelBookingCookies} from "@/shared/component-clear-cancel-booking-cookies";
import styles from "@/shared/ui/layouts/footer/style.module.css";

export default async function Footer({ locale, resetCookies = true }) {
  const menuItems = await fetchFooterMenu(locale);
  if(!Array.isArray(menuItems)) {
    return null;
  }
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <ul className={styles.footer_menu}>
            <FooterMenus menuItems={menuItems} />
          </ul>
          <Socials />
          <ComponentClearCancelBookingCookies resetCookies={resetCookies}/>
        </div>
      </div>
    </footer>
  );
}
