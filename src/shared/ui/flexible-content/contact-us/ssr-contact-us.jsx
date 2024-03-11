import ContactUs from "@/shared/ui/flexible-content/contact-us/contact-us";
import {fetchLocaleIdContactForm} from "@/shared/api/contact-form";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
export default async function SrrContactUs ({ locale }) {
    const i18n = await useDefaultI18n(locale)

    const idForm = await fetchLocaleIdContactForm(212, locale);
    return (
        <ContactUs
            idForm={idForm}
            i18n={{
            ...i18n.getFormErrors(),
            contact_us: i18n.t('Contact Us'),
            send_messages: i18n.t('Send Message'),
            name: i18n.t('Name'),
            email: i18n.t('Email'),
            subject: i18n.t('Subject'),
            message: i18n.t('Message'),
            placeholder_name: i18n.t('John Doe'),
            placeholder_email: i18n.t('johndoe@mail.com'),
            placeholder_subject: i18n.t('Subject'),
            placeholder_message: i18n.t('Write your message here!'),
        }}/>
    )
}