import ContactUs from "@/shared/ui/flexible-content/contact-us/contact-us";
import i18n from "@/i18n/server-locales/index"
export default async function SrrContactUs () {
    await i18n.getFetchDefault();
    return (
        <ContactUs i18n={{
            is_field_required: i18n.t('The field is required'),
            email_error: i18n.t('email_error'),
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