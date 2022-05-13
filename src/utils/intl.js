/**
 * Function that retrieves the language preference for an agent/user.
 * It forces a Norwegian locale IF the first language detected in the agents/users language preference list is Norwegian/Sami.
 * @returns Returns the agents preferred language.
 */
export const getLang = () => {
    const NORWEGIAN_CODES = ['nb', 'nn', 'se', 'nb-NO', 'nn-NO', 'se-NO', 'nb-SJ']

    if (navigator.languages !== undefined) {
        if (NORWEGIAN_CODES.some(code => code === navigator.languages[0])) {
            return 'nb'
        }
        return navigator.languages[0]
    }
    return navigator.language
}