module.exports = {

	/**
	 * Create a general form of an Error message
	 *
	 * @param {Integer} status code of the error
	 * @param {String} the error's message
	 * @return {Object} status and message as keys
	 */
	createErrorMessage(status, message) {
		return {
			status, message,
		}
	}
}