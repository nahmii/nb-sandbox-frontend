/**
 * Function that retrieves the language preference for an agent/user.
 * It forces a Norwegian locale IF the first language detected in the agents/users language preference list is Norwegian/Sami.
 * @returns Returns the agents preferred language.
 */
export const getLang = () => {
    if (navigator.languages !== undefined) {
        if (navigator.languages[0].includes('nb') ||
            navigator.languages[0].includes('nn') ||
            navigator.languages[0].includes('se') ||
            navigator.languages[0].includes('nb-NO') ||
            navigator.languages[0].includes('nn-NO') ||
            navigator.languages[0].includes('se-NO') ||
            navigator.languages[0].includes('nb-SJ')) {
            return 'nb'
        }
        return navigator.languages[0]
    }
    return navigator.language
}