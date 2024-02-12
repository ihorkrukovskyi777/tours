import ContactUs from "@/shared/ui/flexible-content/contact-us/contact-us";
import i18n from "@/i18n/server-locales/index"
import {fetchLocaleIdContactForm} from "@/shared/api/contact-form";
export default async function SrrContactUs ({ locale }) {
    await i18n.getFetchDefault();

    const idForm = await fetchLocaleIdContactForm(212, locale);
    return (
        <ContactUs
            idForm={idForm}
            i18n={{
            ...i18n.getFormErrors(),
            contact_us: i18n.t('Contact Us'),
            write_your_message_here: i18n.t('Write your message here!'),
            send_messages: i18n.t('Send Message'),
            name: i18n.t('Name'),
            email: i18n.t('Email'),
            subject: i18n.t('Subject'),
            message: i18n.t('Message'),
        }}/>
    )
}