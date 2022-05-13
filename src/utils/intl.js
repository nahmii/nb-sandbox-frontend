/**
 * Function that retrieves the language preference for an agent/user.
 * It forces a Norwegian locale IF at least one of them is detected in the agents/users language preference list.
 * @returns Returns the agents preferred language.
 */
export const getLang = () => {
    if (navigator.languages !== undefined) {
        if (navigator.languages.includes('nb') ||
            navigator.languages.includes('nn') ||
            navigator.languages.includes('nb-NO') ||
            navigator.languages.includes('nn-NO') ||
            navigator.languages.includes('se-NO')) {
                return 'nb'
            }
        return navigator.languages[0]
    }
    return navigator.language
}