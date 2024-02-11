export default async function recaptcha(action) {
    return window?.grecaptcha?.execute(process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY, {action})
}